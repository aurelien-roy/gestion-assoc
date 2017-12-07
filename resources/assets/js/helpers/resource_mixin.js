import time from '../store/time'
import actionbar from '../store/actionbar'

export default {

    data(){
        return {
            actionbar,
            elements_store: null,
            time, //bad name imo
            selection: [],
            element: null,
            editableElement: null,

            fetching: false,
            creationSignalSent: false,
            quitHandler: null
        }
    },

    methods: {
        createElement(){
            this.$router.push({name: 'new_' + this.resource_name});
        },

        duplicateElement(){
            if (!this.creating && this.selection.length === 1) {
                let copy = deepCopy(this.selection[0]);
                copy.name += " (copie)";
                copy.virtualId = null;
                copy.id = null;

                let that = this;
                this.elements_store.execute('CREATE', {
                    element: copy,
                    period: this.period
                }, () => {
                    that.$router.push({
                        name: this.resource_name,
                        params: {period: this.period, id: copy.id}
                    });
                });
            }
        },

        deleteElements(elements){
            if (elements.length === 1) {
                let that = this;
                this.elements_store.execute('DELETE',
                    {period: this.period, elements: elements}, () => {
                    });
            }
        },

        openElement(element){
            this.$router.push({
                name: this.resource_name,
                params: {period: time.state.currentPeriod, id: element.id}
            });
        },

        periodRequested(period){
            let that = this;

            let callback = () => {
                if (callback === that.fetching) {
                    that.fetching = false;
                    that.loadModule()
                }
            }

            this.fetching = callback;
            this.elements_store.fetch('BY_PERIOD', this.period, callback);
        },

        updateElement(changes){

            this.elements_store.execute('EDIT', {element: this.element, changes, sendToServer: (this.element.id)});
            this.editableElement = deepCopy(this.element); // Au cas où le store à fais des modification

            //Création de l'élément si les conditions sont valides
            if (this.creating && !this.creationSignalSent && this.element.name.length) {
                let elem = this.element;
                let that = this;
                this.elements_store.execute('CREATE', {element: this.element, period: this.period}, () => {
                    if (that.element === elem) {
                        that.$router.push({
                            name: this.resource_name,
                            params: {period: this.period, id: elem.id}
                        })
                    }
                });
                this.creationSignalSent = true;
            }
        },

        loadModule(){
            if (this.creating && (!this.element || this.element.id)) {
                this.creationSignalSent = false;
                this.element = this.elements_store.genNewStruct();
                this.editableElement = deepCopy(this.element);

            } else if (this.route_id !== undefined /*&& this.time.state.selectedPeriod !== undefined*/ && !this.fetching) {
                this.element = this.elements_store.getters.getElement(parseInt(this.route_id), this.period);

                if (!this.element)
                    this.$router.push({name: this.resources_name});
                else {
                    this.selection = [this.element];
                    this.editableElement = deepCopy(this.element);
                }

            } else if (!this.creating) {
                this.element = null;
                this.editableElement = null;
            }
        }

    },

    computed: {
        elements(){
            return this.elements_store.getters.getElements(this.period);
        },

        creating(){
            return this.$route.name === 'new_' + this.resource_name;
        },

        period(){
            if (this.$options.name === 'Activities')
                return this.time.state.currentPeriod;
            else if (this.$options.name === 'Members')
                return 'no_period';
        },

        resource_name() {
            return this.elements_store.state.resource_name[0];
        },

        resources_name() {
            return this.elements_store.state.resource_name[1];
        },

        route_id() {
            return this.$route.params.id;
        }
    },

    watch: {
        'this.period'(p, op){
            if (p !== op) {
                this.periodRequested(p);
            }
        },

        '$route.params.period'(){
            if (this.$route.params.period) {
                this.time.selectPeriod(this.$route.params.period);
            }
        },

        '$route'(){
            this.loadModule();
        },

        selection(s){
            if (s.length === 1) {
                this.openElement(s[0]);
            } else {
                this.element = null;
                this.editableElement = null;
            }
        }

    },

    mounted(){
        if (this.$route.params.period)
            this.time.selectPeriod(this.$route.params.period);

        this.periodRequested(this.period);
        this.loadModule();

        this.actionbar.setActions([]);
        this.actionbar.showPeriodDropdown(true);
    },
}