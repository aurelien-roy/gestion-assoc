export default {

    state: {
        members: [],
    },

    newMember (name, surname, sex, picture, birthday, adress_post, adress_mail, telephone, medical_certif, notes){
        this.state.members.push
        ({
            id: this.state.members.length,
            name: name,
            surname: surname,
            sex: sex,
            picture: picture,
            birthday: birthday,
            adress_post: adress_post,
            adress_mail: adress_mail,
            telephone: telephone,
            medical_certif: medical_certif,
            notes: notes
        });

        window.activities = this.state.activities;
    },

    delMember(id){
        this.state.members = this.state.members.filter(m => {
            return id != m.id;
        });
    },

    getMember(id){
        return this.state.members
    }

}