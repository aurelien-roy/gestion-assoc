<template>
    <div>
        <div class="headset relative">
            <div><EditableText :value="activity.name" :title="true" placeholder="Cliquer pour nommer l'activité" class="like-h1" @input="notifyUpdate('name', $event)"></EditableText></div>
            <div><EditableText :value="activity.level" class="subtitle" placeholder="Ajouter le niveau" @input="notifyUpdate('level', $event)"></EditableText></div>
            <ColorPicker class="right" :value="activity.color" @input="notifyUpdate('color', $event)"></ColorPicker>
        </div>

        <div class="pl10 gray-text">
            <div class="dashed-line"></div>
            <p class="m0">tous les <EditableText :value="dayName" placeholder="jour" :suggestions="days" @input="notifyUpdate('dayName', $event)"></EditableText> de <EditableText placeholder="hh:mm" type="time"></EditableText> à <EditableText placeholder="hh:mm" type="time"></EditableText></p>
            <div class="dashed-line"></div>
            <p class="m0">à <EditableText :value="activity.place" placeholder="lieu" @input="notifyUpdate('place', $event)"></EditableText></p>
            <div class="dashed-line"></div>
            <p class="m0">animé par <EditableText :value="activity.teacher" placeholder="encadrant" @input="notifyUpdate('teacher', $event)"></EditableText></p>
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

    import activities_store from '../store/activities'
    import EditableText from './EditableText'
    import ColorPicker from './ColorPicker'
    import { days } from '../helpers/enum'
    
    export default {
        data() {
            return {
                days
            }
        },
        components: { EditableText, ColorPicker },

        methods: {
            notifyUpdate(field, value){

                if(field === 'dayName'){
                    field = 'day';
                    value = days.indexOf(value);

                    if(value === -1){
                        value = undefined;
                    }
                }

                let changes = {};
                changes[field] = value;

                this.$emit('update', changes);
            }
        },
        
        computed: {
            activity(){
                return this.data.makeCopy();
            },

            dayName(){
                return this.activity.day !== undefined ? days[this.activity.day] : '';
            }
        },

        props: ['data'],
    }

</script>
