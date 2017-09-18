<template>
    <div>
        <div class="headset relative">
            <div><EditableText :value="activity.name" :title="true" placeholder="Cliquer pour nommer l'activité" class="like-h1" @input="notifyUpdate('name', $event)"></EditableText></div>
            <div><EditableText :value="activity.level" class="subtitle" placeholder="Ajouter le niveau" @input="notifyUpdate('level', $event)"></EditableText></div>
            <ColorPicker class="right" :value="activity.color" @input="notifyUpdate('color', $event)"></ColorPicker>
        </div>

        <div class="pl10 gray-text">
            <div class="dashed-line"></div>
            <div class="group">
                <p class="contains-input">tous les <EditableText type="day" :value="activity.day" placeholder="jour" @input="notifyUpdate('day', $event)"></EditableText> de <EditableText placeholder="hh:mm" type="time" :value="activity.time_begin"  @input="notifyUpdate('time_begin', $event)"></EditableText> à <EditableText placeholder="hh:mm" type="time" :value="activity.time_end"  @input="notifyUpdate('time_end', $event)"></EditableText> et</p>
                <!-- TODO : Time periods multiples -->
                <!--<p class="contains-input">tous les <EditableText type="day" :value="activity.day" placeholder="jour" @input="notifyUpdate('day', $event)"></EditableText> de <EditableText placeholder="hh:mm" type="time" :value="activity.time_begin"  @input="notifyUpdate('time_begin', $event)"></EditableText> à <EditableText placeholder="hh:mm" type="time" :value="activity.time_end"  @input="notifyUpdate('time_end', $event)"></EditableText></p>-->
            </div>
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
            }
        },
        
        computed: {
            activity(){
                return this.data.makeCopy();
            }
        },

        props: ['data'],

        mounted(){
            console.log(this.activity);
        }
    }

</script>
