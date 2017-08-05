<template>
    <div>
        <div class="headset relative">
            <div><EditableText v-model="value.name" :title="true" placeholder="Cliquer pour nommer l'activité" class="like-h1"></EditableText></div>
            <div><EditableText v-model="value.level" class="subtitle" placeholder="Ajouter le niveau"></EditableText></div>
            <ColorPicker class="right"></ColorPicker>
        </div>

        <div class="pl10 gray-text">
            <div class="dashed-line"></div>
            <p class="m0">tous les <EditableText placeholder="jour" :suggestions="days"></EditableText> de <EditableText placeholder="hh:mm"></EditableText> à <EditableText placeholder="hh:mm"></EditableText></p>
            <div class="dashed-line"></div>
            <p class="m0">à <EditableText placeholder="lieu"></EditableText></p>
            <div class="dashed-line"></div>
            <p class="m0">animé par <EditableText placeholder="encadrant"></EditableText></p>
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
    import enums from '../helpers/enum'
    
    export default {
        data() {
            return {
                days: enums.days
            }
        },
        components: { EditableText, ColorPicker },
        
        methods: {
            notifyUpdate(){
                this.$emit('input');
            }
        },
        
        computed: {},
        
        mounted() {
            
        },

        props: ['value']
    }

</script>
