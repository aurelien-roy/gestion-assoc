<template>
    <div>
        <div v-if="member">
            <div class="headset relative">

                <div class="row">
                    <div class="auto">
                        <h1>
                            <EditableText :value="member.firstname" placeholder="Prénom" class="like-h1 width-auto no-background m0" @input="notifyUpdate('firstname', $event)"></EditableText><EditableText :value="member.lastname" placeholder="Nom" class="like-h1 thinner width-auto no-background m0" @input="notifyUpdate('lastname', $event)"></EditableText>
                        </h1>

                        <div class="pl10">
                            <!--<div class="tag green-pane colorful white-text m0">Actif en 2017/2018</div>-->
                            <div class="tag red-pane colorful white-text m0">Inactif depuis 2015/2016</div>
                        </div>

                        <div class="pl10 pt10 gray-text large">
                            <p class="thin m0">Né(e) le</p>
                            <DateSelector v-model="member.birthdate"
                                          @input="notifU('birthdate', $event)"></DateSelector>
                            <span>{{age}}</span>

                            <p class="thin m0">Inscrit(e) depuis le</p>
                            <DateSelector v-model="member.subdate" @input="notifU('subdate', $event)"></DateSelector>
                        </div>
                    </div>

                    <div class="aside">
                        <div class="photo">
                            <img src="https://placeholdit.co//i/280x280?&text=Photo">
                        </div>
                    </div>
                </div>


                <div class="row data-table gray-text darker">

                    <div class="col col-6 p10">
                        <h3 class="row">
                            <div class="col col-3"><i class="icon phone"></i></div>
                            <div class="col col-9">Contact</div>
                        </h3>
                        <div class="dashed-line thinner"></div>

                        <div class="data row">
                            <p class="col col-3">tél</p>
                            <PhoneSelector v-model="member.phone1" @input="notifU('phone1', $event)"></PhoneSelector>
                        </div>

                        <div class="data row">
                            <p class="col col-3">tél</p>
                            <PhoneSelector v-model="member.phone2" @input="notifU('phone2', $event)"></PhoneSelector>
                        </div>

                        <div class="data row">
                            <p class="col col-3">mail</p>
                            <p class="col col-9">XX XX XX XX XX</p>
                        </div>
                    </div>

                    <div class="col col-6 p10">
                        <h3 class="row">
                            <div class="col col-3"><i class="icon home"></i></div>
                            <div class="col col-9">Adresse postale</div>
                        </h3>
                        <div class="dashed-line thinner"></div>

                        <div class="data row">
                            <p class="col col-3">Adr 1</p>
                            <EditableText :value="member.address1" placeholder="Adresse"
                                          @input="notifU('address1', $event)"></EditableText>
                        </div>

                        <div class="data row">
                            <p class="col col-3">Adr 2</p>
                            <EditableText :value="member.address2" placeholder="Suite adresse"
                                          @input="notifU('address2', $event)"></EditableText>
                        </div>

                        <div class="data row">
                            <p class="col col-3">Cp</p>
                            <EditableText :value="member.postcode" type="number" :maxlength="5" placeholder="xxxxx"
                                          @input="notifU('postcode', $event)"></EditableText>

                            <p class="col col-3">Ville</p>
                            <EditableText :value="member.city" placeholder="Ville"
                                          @input="notifU('city', $event)"></EditableText>
                        </div>
                    </div>


                    <div class="col col-6 p10">
                        <h3 class="row">
                            <div class="col col-3"><i class="icon note"></i></div>
                            <div class="col col-9">Notes</div>
                        </h3>
                        <div class="dashed-line thinner"></div>

                        <div class="data row">
                            <p class="col col-3">notes</p>
                            <EditableText :value="member.notes" placeholder="Notes sur l'adhérent(e)"
                                          @input="notifU('notes', $event)"></EditableText>
                        </div>

                        <div class="data row">
                            <p class="col col-3">médic.</p>
                            <EditableText :value="member.medic" placeholder="Contres-indications"
                                          @input="notifU('medic', $event)"></EditableText>
                        </div>
                    </div>


                    <div class="col col-6 p10">
                        <h3 class="row">
                            <div class="col col-3"><i class="icon family"></i></div>
                            <div class="col col-9">Parents</div>
                        </h3>
                        <div class="dashed-line thinner"></div>

                        <div class="data row">
                            <p class="col col-3">parent 1</p>
                            <EditableText :value="member.parent1" placeholder="Prénom Nom"
                                          @input="notifU('parent1', $event)"></EditableText>
                        </div>

                        <div class="data row">
                            <p class="col col-3">parent 2</p>
                            <EditableText :value="member.parent2" placeholder="Prénom Nom"
                                          @input="notifU('parent2', $event)"></EditableText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>

    import EditableText from './EditableText'
    import Modal from './Modal'
    import DateSelector from './DateSelector'
    import PhoneSelector from './PhoneSelector'

    export default {
        data() {
            return {}
        },
        components: {EditableText, Modal, DateSelector, PhoneSelector},

        methods: {
            //Appelé quand un chanp est modifié
            notifyUpdate(field, value){
                let changes = {};
                changes[field] = value;

                this.$emit('update', changes);
            },

            notifU(field, value){
                console.log("Update : " + field + " : " + value)
                this.notifyUpdate(field, value)
            }
        },

        computed: {
            member(){
                return this.data ? this.data : null;
            },

            age(){
                if (!this.member.birthdate)
                    return '';

                let now = new Date()
                let years = (now.getFullYear() - this.member.birthdate.getFullYear());

                if (now.getMonth() < this.member.birthdate.getMonth() ||
                    now.getMonth() == this.member.birthdate.getMonth() && now.getDate() < this.member.birthdate.getDate()) {
                    years--;
                }
                return "(" + years + " ans)";
            }
        },

        watch: {},

        beforeRouteUpdate (to, from, next) {
            next();
        },

        beforeRouteLeave (to, from, next) {
            next();
        },

        props: ['data'],
    }

</script>
