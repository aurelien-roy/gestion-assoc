import activities from './activities'
import Store from "../helpers/store/store";
import resource_fragment from '../helpers/store/resource_fragment'
import { rand } from '../helpers/math';

export default new Store({

    methods: {

        //Génère un nouveau membre
        genNewStruct(){
            let vId = this.state.virtualId++;

            return {
                id: undefined,
                firstname: '',
                lastname: '',
                birthdate: null, // YYYY-MM-DD
                sex: '', // char M ou F
                picture: '',
                address: '', // string multiline
                postcode: '', // string numérique (pas de int)
                city: '',
                email: '',
                phones: '', // string avec plusieurs numéros de téls. pas d'espace. séparé par point virgule
                notes: ''
            }
        },

        genLocalTestMembers(){
            let firstnames = ['Dominique', 'Martin', 'Jerome', 'Camille', 'Mickael', 'Christelle', 'Paul', 'Brice', 'Pauline', 'Emma', 'Zoé', 'Ambre', 'Anne-Marie'];
            let lastnames = ['Duche', 'Da Costa', 'Coutouis', 'Bichon', 'El Paso', 'Matin', 'Chane', 'Roi', 'Vilaine'];

            for (let i = 0; i < 10; i++) {

                this.state.data.push({
                    id: this.state.data.length,
                    virtualId: this.state.data.length,
                    firstname: firstnames[rand(0, 12)],
                    lastname: lastnames[rand(0, 8)]
                });
                
            }
        },

        encode(member, period){

        },

        decode(member){

        },

    },

    actions: {


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

}, [resource_fragment('member', 'members')]);