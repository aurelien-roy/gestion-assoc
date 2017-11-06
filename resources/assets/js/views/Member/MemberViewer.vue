<template>
    <div class="row wrapped push-center">
        <h1 v-if="creating">Nouveau</h1>
        <h1 v-else>Affichage</h1>

        <div class="col-12" v-if="member">
            <label for="firstname">Prénom</label> <input id="firstname" v-model="member.firstname"><br/>
            <label for="lastname">Nom</label> <input id="lastname" v-model="member.lastname"><br/>

            <p>Date de naissance :</p>

            <p class="row gutters">
                <input id="birthday_day" class="col-4 col" placeholder="Jour" maxlength="2"
                       v-model="member.birthdate.day" @keyup="full_input">
                <input id="birthday_month" class="col-4 col" placeholder="Mois" maxlength="2"
                       v-model="member.birthdate.month" @keyup="full_input">
                <input id="birthday_year" class="col-4 col" placeholder="Année" maxlength="4"
                       v-model="member.birthdate.year"><br/>
            </p>
            <p>Sexe :
                <input type="radio" name="sex" value="H" v-model="member.sex" id="sex_m"/><label for="sex_m" class="ib">Homme</label>
                <input type="radio" name="sex" value="F" v-model="member.sex" id="sex_f"/><label for="sex_f" class="ib">Femme</label>
            </p>

            <label for="address1">Adresse 1</label> <input id="address1" v-model="member.address1"><br/>
            <label for="address2">Adresse 2</label> <input id="address2" v-model="member.address2"><br/>
            <label for="postcode">Code postale</label> <input maxlength="5" id="postcode" v-model="member.postcode"
                                                              @keyup="full_input"><br/>
            <label for="city">Ville</label> <input id="city" v-model="member.city"><br/>

            <label for="email">E-mail</label> <input id="email" v-model="member.email"><br/>
            <label for="phone">Téléphone fixe</label> <input id="phone" v-model="member.phone"><br/>
            <label for="mobile">Mobile</label> <input id="mobile" v-model="member.mobile"><br/>

            <label for="notes">Notes</label> <textarea id="notes" v-model="member.notes"></textarea><br/>
        </div>

    </div>
</template>
<style>

</style>
<script>

    import members_store from '../../store/members'
    import actionbar from '../../store/actionbar'

    export default{
        name: 'MemberViewer',

        data(){
            return {
                actionbar,
                members_store,

                member: null
            }
        },

        components: {},

        props: ['id'],

        methods: {
            init(){
                if (!this.creating) {
                    console.log(JSON.stringify(members_store.getMember(this.id)))
                    this.member = JSON.parse(JSON.stringify(members_store.getMember(this.id)));

                    actionbar.setActions([
                        {name: 'Save', callback: this.save_member},
                        {name: 'Rétablir', callback: this.reverse}
                    ]);
                }
                else {
                    actionbar.setActions([
                        {name: 'OK', callback: this.save_member},
                        {name: 'Annuler', callback: this.cancel}
                    ]);

                }
            },

            save_member() {
                if (this.member.firstname !== '' && this.member.lastname !== '' && this.member.birthdate.day !== null
                    && this.member.birthdate.month !== null && this.member.birthdate.year !== null) {
                    if (!this.creating) {
                        members_store.modifyMember(this.member);

                    }
                    else {
                        members_store.saveNewMember(this.member);
                        this.$router.push({name: 'members'});
                    }
                }
                else
                    alert('Wsh alors il manque d chants pd');
            },

            cancel(){
                this.$router.push({name: 'members'});
            },

            reverse(){
                this.member = JSON.parse(JSON.stringify(members_store.getMember(this.id)));
            },

            full_input(e){
                if (e.target.value.length === e.target.maxLength) {
                    let next = e.target.nextElementSibling;

                    while (next !== null && next.tagName.toLowerCase() !== 'input') {
                        next = next.nextElementSibling;
                    }
                    next.focus();
                }
            }
        },

        computed: {
            creating(){
                return this.id === undefined;
            }
        },

        watch: {
            id(id){
                this.save_member();
                this.init();
            }
        },

        mounted(){
            this.init();
        },

        destroyed(){
            if (!this.creating) {
                this.save_member();
            }
        },

        route: {
            canReuse: false
        }
    }

</script>
