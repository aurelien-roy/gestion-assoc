<template>
    <div>
        <div class="headset relative">
            <div><EditableText :value="activity.name" :title="true" placeholder="Cliquer pour nommer l'activité" class="like-h1" @input="notifyUpdate('name', $event)"></EditableText></div>
            <div><EditableText :value="activity.level" class="subtitle" placeholder="Ajouter le niveau" @input="notifyUpdate('level', $event)"></EditableText></div>
            <ColorPicker class="right" :value="activity.color" @input="notifyUpdate('color', $event)"></ColorPicker>
        </div>

        <div class="pl10 gray-text">
            <div class="dashed-line"></div>
            <p v-for="(date,i) in activity.schedules" class="m0 contains-input">
                tous les
                <EditableText type="day" :value="date.day" placeholder="jour"
                              @input="notifyUpdateDate(i, 'day', $event)"></EditableText>
                de
                <EditableText placeholder="hh:mm" type="time" :value="date.time_begin"
                              @input="notifyUpdateDate(i, 'time_begin', $event)"></EditableText>
                à
                <EditableText placeholder="hh:mm" type="time" :value="date.time_end"
                              @input="notifyUpdateDate(i, 'time_end', $event)"></EditableText>

                <button v-if="i === activity.schedules.length - 1" v-on:click="addDate()">Ajouter</button>
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
</template>
<style>

</style>
<script>

    import EditableText from './EditableText'
    import ColorPicker from './ColorPicker'
    
    export default {
        data() {
            return {
            }
        },
        components: { EditableText, ColorPicker },

        methods: {
            notifyUpdate(field, value){

                let changes = {};
                changes[field] = value;

                this.$emit('update', changes);
            },

            dateFilled(index){
                return (this.activity.schedules[index].day !== undefined &&
                this.activity.schedules[index].time_begin !== undefined &&
                this.activity.schedules[index].time_end !== undefined);
            },

            datesFilled(){
                let filled = true;
                let i = 0;
                do {
                    if (!this.dateFilled(i))
                        filled = false;
                    i++;
                } while (filled && this.activity.schedules.length > i)
                return filled;
            },

            notifyUpdateDate(index, field, value){

                this.activity.schedules[index][field] = value;

                if (this.datesFilled) {

                    this.notifyUpdate('schedules', this.activity.schedules);
                }
            },

            addDate(){ //Gestion du modèle dispercé
                this.activity.schedules.push({});
            }
        },
        
        computed: {
            activity(){
                return this.data.makeCopy();
            },
        },

        props: ['data'],
    }

</script>
