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
                <p v-for="(date,i) in schedules" class="m0 contains-input">
                    tous les
                    <EditableText type="day" :value="date.day" placeholder="jour"
                                  @input="notifyUpdateDate(i, 'day', $event)"></EditableText>
                    de
                    <EditableText placeholder="hh:mm" type="time" :value="date.time_begin"
                                  @input="notifyUpdateDate(i, 'time_begin', $event)"></EditableText>
                    à
                    <EditableText placeholder="hh:mm" type="time" :value="date.time_end"
                                  @input="notifyUpdateDate(i, 'time_end', $event)"></EditableText>

                    <button v-if="i === schedules.length - 1 && dateFilled(i)" v-on:click="addDate()">Ajouter</button>
                    <button v-if="dateFilled(i) || datePartFilled(i)" v-on:click="delDate(i)">Sup</button>
                </p>
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
                dialogs: {
                    schedulesUnfilled: {
                        title: "Avertissement",
                        message: "Vous n'avez pas rempli entièrement la date pour l'activitée en cours.",
                        buttons: [{label: "Finir de la remplir", class: "primary"}, {
                            label: "Quitter sans sauvegarder",
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

                this.$emit('update', changes);
            },

            //Appelé quand un chanp du schedules est modifié
            notifyUpdateDate(index, field, value){
                this.schedules[index][field] = value;

                if (this.dateFilled(index)) {
                    console.log(this.schedules);
                    this.notifyUpdate('schedules', this.schedulesFilled);
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
            },

            delDate(index){
                console.log(this.schedules);
                this.schedules.splice(index, 1);
                this.notifyUpdate('schedules', this.schedulesFilled);
            },

            // Appelé quand on quitte l'activité en cours
            handleRouteChange(to, from, next){
                // Une date n'est pas rempli
                if (this.datePartFilled(this.schedules.length - 1)) {
                    console.log("unfilled");
                    this.dialog = "schedulesUnfilled";
                    this.nextRoute = next;
                }
                else
                    next();
            },

            // Appelé pour gérer les boites de dialogues
            handleDialog(event){
                if (this.dialog = "schedulesUnfilled") {
                    if (event.class === "primary")
                        this.nextRoute(false);
                    else if (event.class === "critical")
                        this.nextRoute();
                    this.dialog = null;
                }
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

        watch: {},

        beforeRouteUpdate (to, from, next) {
            this.handleRouteChange(to, from, next);
        },

        beforeRouteLeave (to, from, next) {
            this.handleRouteChange(to, from, next);
        },

        props: ['data'],
    }

</script>
