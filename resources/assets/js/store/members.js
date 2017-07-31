export default {

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