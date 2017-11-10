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
            this.$router.push({name: 'new_' + this.elements_store.state.resource_name[0]});
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
                    period: time.state.selectedPeriod
                }, () => {
                    that.$router.push({
                        name: this.elements_store.state.resource_name[0],
                        params: {period: time.state.selectedPeriod, id: copy.id}
                    });
                });
            }
        },

        deleteElements(elements){
            if (elements.length === 1) {
                let that = this;
                this.elements_store.execute('DELETE',
                    {period: time.state.selectedPeriod, elements: elements}, () => {
                    });
            }
        },

        openElement(element){
            this.$router.push({
                name: this.elements_store.state.resource_name[0],
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
            this.elements_store.fetch('BY_PERIOD', this.time.state.selectedPeriod, callback);
        },

        updateElement(changes){

            this.elements_store.execute('EDIT', {element: this.element, changes, sendToServer: this.element.id});
            this.editableElement = deepCopy(this.element); // Le tri des schedules peut modifier l'activity

            //Sauvegarde réelle de l'élément
            if (this.creating && !this.creationSignalSent && this.element.name.length) {
                let elem = this.element;
                let that = this;
                this.elements_store.execute('CREATE', {element: this.element, period: time.state.currentPeriod}, () => {
                    if (that.element === elem) {
                        that.$router.push({
                            name: this.elements_store.state.resource_name[0],
                            params: {period: time.state.selectedPeriod, id: elem.id}
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

            } else if (this.$route.params.id !== undefined && this.time.state.selectedPeriod !== undefined && !this.fetching) {

                this.element = this.elements_store.getters.get(parseInt(this.$route.params.id), this.time.state.selectedPeriod);
                if (!this.element) {
                    this.$router.push({name: this.elements_store.state.resource_name[1]})
                } else {
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
            return this.elements_store.getters.byPeriod(this.time.state.selectedPeriod);
        },

        creating(){
            return this.$route.name === 'new_' + this.elements_store.state.resource_name[0];
        }
    },

    watch: {
        'time.state.selectedPeriod'(p, op){
            if (p !== op) {
                this.periodRequested(p);
            }
        },

        '$route'(){
            if (this.$route.params.period) {
                this.time.selectPeriod(this.$route.params.period);
            }

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

        this.periodRequested(this.time.state.selectedPeriod);
        this.loadModule();

        this.actionbar.setActions([]);
        this.actionbar.showPeriodDropdown(true);
    },
}