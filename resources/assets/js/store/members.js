import activities from './activities'
import Store from "../helpers/store/store";
import { rand } from '../helpers/math';

export default new Store({

    //activities,

    state: {
        members: [],
        virtualId: 0
    },

    getters: {

        get: (store, period, id) => {
            if (!store.state.members[period])
                return null;
            return store.state.members[period].find(a => a.id === id);
        },

        all: (store) => {
            return store.state.members;
        },

    },

    methods: {

        //Génère un nouveau membre
        genMember(){
            return {
                id: undefined,
                firstname: '',
                lastname: '',
                birthdate: {day: null, month: null, year: null},
                sex: '',
                picture: null, //Not use
                address1: '',
                address2: '',
                postcode: '',
                city: '',
                email: '',
                phone: '',
                mobile: '',
                medical_certif: '', //Not use
                notes: ''
            }
        },

        genLocalTestMembers(){
            let firstnames = ['Dominique', 'Martin', 'Jerome', 'Camille', 'Mickael', 'Christelle', 'Paul', 'Brice', 'Pauline', 'Emma', 'Zoé', 'Ambre', 'Anne-Marie'];
            let lastnames = ['Duche', 'Da Costa', 'Coutouis', 'Bichon', 'El Paso', 'Matin', 'Chane', 'Roi', 'Vilaine'];

            for (let i = 0; i < 10; i++) {

                this.state.members.push({
                    id: this.state.members.length,
                    virtualId: this.state.members.length,
                    firstname: firstnames[rand(0, 12)],
                    lastname: lastnames[rand(0, 8)]
                });
            }
        },

        encodeMember(member, period){

        },

        decodeMember(member){

        },

    },

    actions: {

        CREATE_MEMBER: {
            applyLocally(params, store){
                params.member.virtualId = store.state.virtualId++;
                store.state.members[params.period].push(params.member);
            },

            makeRequest(request, context, result){
                /*request('POST', 'member', context.store.encodeMember(deepCopy(context.params.member), context.params.period)).then(() => {
                 context.params.member.id = context.store.state.members[context.params.period].length;
                 result.isSuccess();
                 });*/
                result.isSuccess();
            }
        },

        EDIT_MEMBER: {

            applyLocally(params, store){
                Object.assign(params.member, deepCopy(params.changes));
            },

            makeRequest(request, context, result){
                /*if (context.params.sendToServer) {
                 request('PATCH', 'activity/' + context.params.activity.id, context.store.encodeActivity(deepCopy(context.params.changes))).then(() => {
                 result.isSuccess();
                 });
                 } else {
                 result.isSuccess();
                 }*/
                result.isSuccess();
            }

        },

        DELETE_MEMBERS: {

            applyLocally(params, store){
                store.state.members[params.period] = store.state.members[params.period].filter(a => {
                    return params.members.indexOf(a) === -1;
                });
            },

            makeRequest(request, context, result){
                /*request('DELETE', 'activity/' + context.params.activities[0].id).then(() => {
                 result.isSuccess();
                 });*/
                result.isSuccess();
            }

        },

    },

    fetchers: {
        MEMBERS_BY_PERIOD: {

            loadedPeriods: [],

            makeRequest(request, context, result){

                /*let self = this;

                request('GET', 'activity').then(function (response) {
                    let period = context.params;

                    Vue.set(context.store.state.activities, period, []);
                    if (response.data && Array.isArray(response.data.data)) {
                        response.data.data.forEach((a) => {
                            context.store.state.activities[period].push(context.store.decodeActivity(a));
                        });
                    }
                    context.store.generateActivity(period);
                    result.isSuccess();
                    self.loadedPeriods.push(period);

                });*/
            },

            isLoaded(params){
                //return this.loadedPeriods.indexOf(params) !== -1;
            }
        }
    },

    /*saveNewMember (member){

        this.state.loading = true;
        // Requete AJAX

        setTimeout(() => {
            // Envoi du membre au serveur
            // Le serveur retourne l'id affecté dans la variable id
            let id = this.state.members.length;
            member.id = id;

            this.state.members.push(member);
            this.state.loading = false;
        }, 2000);
    },

    modifyMember (member){

        this.state.loading = true;
        // Requete AJAX

        setTimeout(() => {
            let id = member.id;
            this.state.members = this.state.members.filter(m => {
                return id !== m.id;
            });

            this.state.members.push(member);
            this.state.loading = false;
        }, 2000);
    },

    delMember(id){
        this.state.loading = true;

        setTimeout(() => {
            // Supression du membre : ajax
            // if false on reactualise les membres

            this.state.loading = false;
        }, 2000);

        this.state.members = this.state.members.filter(m => {
            return id !== m.id;
        });
    },

    getMember(id){
        return this.state.members.find(m => {
            return id === m.id;
        })
    }*/

});