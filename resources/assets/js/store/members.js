import activities from './activities'

export default {
    
    activities,

    state: {
        members: [],
        loading: false
    },

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

    generateActivity(){
        let act = ['Classique', 'Jazz', 'Street', 'Ragga', 'Eveil'];
        let nvx = ['', 'Adultes', '10-12 ans', '5-6 ans'];
        let clr = ['red', 'blue', 'yellow', 'green', 'aqua', 'purple', 'orange'];

        for (let i = 0; i < 10; i++) {

            let begin = rand(9, 16);
            let end = begin + rand(1, 3);

            this.state.activities.push({
                id: this.state.activities.length,
                members: [],
                name: act[rand(0, 4)],
                level: nvx[rand(0, 3)],
                age: nvx[rand(0, 3)],
                day: rand(0, 6),
                time_begin: begin,
                time_end: end,
                teacher: 'Jackie',
                effectif_max: 30,
                effectif_current: 10,
                color: clr[rand(0, 6)]
            });
        }
    },

    saveNewMember (member){

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
            return id == m.id;
        })
    }

}