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
            }
        },
        components: {EditableText, ColorPicker, Modal},

        methods: {
            notifyUpdate(field, value){

                let changes = {};
                changes[field] = value;
                console.log("activity + changes");
                console.log(this.activity);
                console.log(changes);

                this.$emit('update', changes);
            },

            notifyUpdateDate(index, field, value){
                this.schedules[index][field] = value;
                console.log(this.schedules + "shedules mod");
                if (this.datesFilled()) {
                    this.notifyUpdate('schedules', this.schedules);
                }
            },

            dateFilled(index){
                return (this.schedules[index].day != null &&
                this.schedules[index].time_begin != null &&
                this.schedules[index].time_end != null);
            },

            datesFilled(){
                let filled = true;
                let i = 0;
                do {
                    if (!this.dateFilled(i))
                        filled = false;
                    i++;
                } while (filled && this.schedules.length > i)
                return filled;
            },

            addDate(){
                this.activity.schedules.push({day: null, time_begin: null, time_end: null});
            },

            handleRouteChange(to, from, next){

            },

            test2(a){
                console.log(a);
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

        props: ['data', 'a'],
    }

</script>
