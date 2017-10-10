<template>
    <div>
        <div v-if="activity">
            <div class="headset relative">
                <div><EditableText :value="activity.name" :title="true" placeholder="Cliquer pour nommer l'activité" class="like-h1" @input="notifyUpdate('name', $event)"></EditableText></div>
                <div><EditableText :value="activity.level" class="subtitle" placeholder="Ajouter le niveau" @input="notifyUpdate('level', $event)"></EditableText></div>
                <ColorPicker class="right" :value="activity.color" @input="notifyUpdate('color', $event)"></ColorPicker>
            </div>

            <div class="pl10 gray-text">
                <div class="dashed-line"></div>
                <p v-for="(date, i) in schedules" class="m0 contains-input">
                    tous les
                    <EditableText type="day" :value="date.day" placeholder="jour"
                                  @input="notifyUpdateDate(i, 'day', $event)" :ref="'day' + i"></EditableText>
                    de
                    <EditableText placeholder="hh:mm" type="time" :value="date.time_begin"
                                  @input="notifyUpdateDate(i, 'time_begin', $event)"></EditableText>
                    à
                    <EditableText placeholder="hh:mm" type="time" :value="date.time_end"
                                  @input="notifyUpdateDate(i, 'time_end', $event)"></EditableText>


                    <a href="#" v-if="dateFilled(i) || datePartFilled(i)"  @click.prevent="delDate(i)" class="btn-icon right" title="Supprimer le créneau"><i class="icon delete-inline"></i></a>
                    <!--&nbsp;&nbsp;
                    <a class="btn-link" v-if="i != 0 && (dateFilled(i) || datePartFilled(i))" @click.prevent="delDate(i)" href="#">Supprimer</a>-->
                </p>
                <p class="m0 contains-input" v-if="schedulesFilled.length === schedules.length"><a class="btn-link" @click.prevent="addDate()" href="#">Ajouter un créneau</a></p>
                <div class="dashed-line"></div>
                <p class="m0 contains-input">à <EditableText :value="activity.place" placeholder="lieu" @input="notifyUpdate('place', $event)"></EditableText></p>
                <div class="dashed-line"></div>
                <p class="m0 contains-input">animé par <EditableText :value="activity.teacher" placeholder="encadrant" @input="notifyUpdate('teacher', $event)"></EditableText></p>
                <div class="dashed-line"></div>
            </div>

            <h2>Tarification</h2>

            <p>TODO</p>

            <h2>Membres inscrits</h2>

            <p>TODO</p>

            <Modal v-if="dialog != null" :title="dialogs[dialog].title" :message="dialogs[dialog].message"
                   :buttons="dialogs[dialog].buttons" :visible="dialogs[dialog].visible" @done="handleDialog"/>

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
                hasChanges: false,
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
                nextRoute: null,
            }
        },
        components: {EditableText, ColorPicker, Modal},

        methods: {
            //Appelé quand un chanp est modifié
            notifyUpdate(field, value){
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
                return (this.schedules[index].day != null &&
                this.schedules[index].time_begin != null &&
                this.schedules[index].time_end != null);
            },

            datePartFilled(index){
                return (!this.dateFilled(index) &&
                (this.schedules[index].day != null ||
                this.schedules[index].time_begin != null ||
                this.schedules[index].time_end != null));
            },

            /*datesFilled(){
                let filled = true;
                let i = 0;
                do {
                    if (!this.dateFilled(i))
                        filled = false;
                    i++;
                } while (filled && this.schedules.length > i)
                return filled;
             },*/

            addDate(){
                this.activity.schedules.push({day: null, time_begin: null, time_end: null});

                if(this.activity.schedules.length !== 1){
                    this.$nextTick(() => {
                        this.$refs['day' + (this.schedules.length - 1)][0].select();
                    });
                }

            },

            delDate(index){
                this.schedules.splice(index, 1);

                if(!this.schedules.length){
                    addDate();
                }
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
            }
        },

        computed: {
            activity(){
                return this.data ? this.data : null;
            },

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
            }
        },

        mounted(){

        },

        watch: {
            activity(a){
                this.nameFilled = (a.name.length > 0);
            }
        },

        beforeRouteUpdate (to, from, next) {
            this.handleRouteChange(to, from, next);
            this.hasChanges = false;
        },

        beforeRouteLeave (to, from, next) {
            this.handleRouteChange(to, from, next);
        },

        props: ['data'],
    }

</script>
