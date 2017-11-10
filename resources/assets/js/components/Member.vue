<template>
    <div>
        <div v-if="member">
            <div class="headset relative">
                <h1 class="m0">
                    <EditableText :value="member.firstname" placeholder="Prénom" class="like-h1 width-auto no-background" @input="notifyUpdate('firstname', $event)"></EditableText><EditableText :value="member.lastname" placeholder="Nom" class="like-h1 thinner width-auto no-background" @input="notifyUpdate('lastname', $event)"></EditableText>
                </h1>
            </div>

        </div>

    </div>
</template>
<style>

</style>
<script>

    import EditableText from './EditableText'
    import ColorPicker from './ColorPicker'
    import Modal from './Modal'

    export default {
        data() {
            return {
                /*hasChanges: false,
                nameFilled: false,
                dialogs: {
                    schedulesUnfilled: {
                        title: "Un créneau n'a pas été rempli entièrement",
                        message: "Vous devez renseigner le jour, l'heure et début et de fin pour chaque créenau ajouté.",
                        buttons: [{label: "Continuer à remplir", class: "primary"}, {
                            label: "Supprimer le créneau",
                            class: "critical"
                        }],
                        visible: true
                    },
                    titleUnfilled: {
                        title: "Votre activité n'a pas de nom",
                        message: "Les activités sans nom ne sont pas sauvegardés.",
                        buttons: [{label: "Continuer à remplir", class: "primary"}, {
                            label: "Supprimer l'activité",
                            class: "critical"
                        }],
                        visible: true
                    }
                },
                dialog: null,
                nextRoute: null,*/
            }
        },
        components: {EditableText, ColorPicker, Modal},

        methods: {
            //Appelé quand un chanp est modifié
            /*notifyUpdate(field, value){
                let changes = {};
                changes[field] = value;

                if(field === 'name'){
                    this.nameFilled = (value.length > 0);
                }

                this.$emit('update', changes);
                this.hasChanges = true;
            },

            //Appelé quand un chanp du schedules est modifié
            notifyUpdateDate(index, field, value){
                if(value !== null) {
                    this.schedules[index][field] = value;

                    if (this.dateFilled(index)) {
                        this.notifyUpdate('schedules', this.schedulesFilled);
                    }
                }else if(value !== this.schedules[index][field]){
                    this.delDate(index);
                }
            },

            dateFilled(index){
                return (this.schedules[index].day !== null &&
                  this.schedules[index].time_begin !== null &&
                  this.schedules[index].time_end !== null);
            },

            datePartFilled(index){
                return (!this.dateFilled(index) &&
                  (this.schedules[index].day !== null ||
                    this.schedules[index].time_begin !== null ||
                    this.schedules[index].time_end !== null));
            },

            addDate(){
                this.activity.schedules.push({day: null, time_begin: null, time_end: null});

                if (this.schedules.length !== 1) {
                    this.$nextTick(() => {
                        this.$refs['day' + (this.schedules.length - 1)][0].select();
                    });
                }
            },

            delDate(index){
                this.schedules.splice(index, 1);
                this.notifyUpdate('schedules', this.schedulesFilled);
            },

            // Appelé quand on quitte l'activité en cours
            handleRouteChange(to, from, next){
                // Une date n'est pas rempli
                if (this.datePartFilled(this.schedules.length - 1)) {
                    this.dialog = "schedulesUnfilled";
                    this.nextRoute = next;
                }
                else if (this.hasChanges && !this.nameFilled) {
                    this.dialog = "titleUnfilled";
                    this.nextRoute = next;
                }
                else
                    next();
            },

            // Appelé pour gérer les boites de dialogues
            handleDialog(event){
                if (event.class === "primary")
                    this.nextRoute(false);
                else if (event.class === "critical")
                    this.nextRoute();
                this.dialog = null;
            }*/
        },

        computed: {
            member(){
                return this.data ? this.data : null;
            },
            /*
            schedules(){

                if (this.activity.schedules.length === 0)
                    this.addDate();
                return this.activity.schedules;
            },

            //Renvoi les dates du schedules qui sont remplis
            schedulesFilled(){
                return this.schedules.filter(d => {
                    return (d.day !== null &&
                      d.time_begin !== null &&
                      d.time_end !== null);
                });
            }*/
        },

        mounted(){

        },

        watch: {
            /*activity(a){
                this.nameFilled = (a.name.length > 0);
            }*/
        },

        beforeRouteUpdate (to, from, next) {
            next();
            /*this.handleRouteChange(to, from, next);
            this.hasChanges = false;*/
        },

        beforeRouteLeave (to, from, next) {
            next();
            /*this.handleRouteChange(to, from, next);*/
        },

        props: ['data'],
    }

</script>
