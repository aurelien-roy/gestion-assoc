<template>
    <div>
        <div class="headset relative">
            <div><EditableText :value="activity.name" :title="true" placeholder="Cliquer pour nommer l'activité" class="like-h1" @input="notifyUpdate('name', $event)"></EditableText></div>
            <div><EditableText :value="activity.level" class="subtitle" placeholder="Ajouter le niveau" @input="notifyUpdate('level', $event)"></EditableText></div>
            <ColorPicker class="right" :value="activity.color" @input="notifyUpdate('color', $event)"></ColorPicker>
        </div>

        <div class="pl10 gray-text">
            <div class="dashed-line"></div>
            <p v-for="(date,i) in activity.dates" class="m0 contains-input">
                tous les
                <EditableText type="day" :value="date.day" placeholder="jour"
                              @input="notifyUpdateDate(i, 'day', $event)"></EditableText>
                de
                <EditableText placeholder="hh:mm" type="time" :value="date.time_begin"
                              @input="notifyUpdateDate(i, 'time_begin', $event)"></EditableText>
                à
                <EditableText placeholder="hh:mm" type="time" :value="date.time_end"
                              @input="notifyUpdateDate(i, 'time_end', $event)"></EditableText>
                <button v-if="buttonAddDate == i" v-on:click="addDate()">Ajouter</button>
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
                return (this.activity.dates[index].day != undefined &&
                this.activity.dates[index].time_begin != undefined &&
                this.activity.dates[index].time_end != undefined);
            },

            notifyUpdateDate(index, field, value){
                if (field === 'day')
                    this.activity.dates[index].day = value;
                else if (field === 'time_begin')
                    this.activity.dates[index].time_begin = value;
                else if (field === 'time_end')
                    this.activity.dates[index].time_end = value;

                console.log(this.activity);

                if (this.datesFilled) {
                    let changes = {};
                    changes['dates'] = this.activity.dates;

                    this.$emit('update', changes);
                    console.log("modif send\n");
                }
            },

            addDate(){ //Gestion du modèle dispercé
                this.activity.dates.push({day: undefined, time_begin: undefined, time_end: undefined});
            }
        },
        
        computed: {
            activity(){
                return this.data.makeCopy();
            },

            datesFilled(){
                let filled = true;
                let i = 0;
                do {
                    if (!this.dateFilled(i))
                        filled = false;
                    i++;
                } while (filled && this.activity.dates.length > i)
                return filled;
            },

            buttonAddDate(){
                if (this.datesFilled)
                    return this.activity.dates.length - 1;
                else
                    return -1;
            }
        },

        props: ['data'],
    }

</script>
