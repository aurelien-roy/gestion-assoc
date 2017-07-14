<template>
    <div>
    <h1>Activités</h1>
        <table>
            <tr><th>Nom</th><th>Jour</th></tr>
            <tr v-for="a in activities"><td>{{ a.name }}</td><td>{{ a.day }}</td></tr>
        </table>
    </div>
</template>
<style>

</style>
<script>

    import activities_store from '../../store/activities'
    import actionbar from '../../store/actionbar'
    
    export default{
        name: 'Activities',

        data(){
            return {
                actionbar,
                activities_store
            }
        },
        components: {},
        
        methods: {},
        
        computed: {
            activities(){
                return activities_store.state.activities;
            }
        },
        
        watch: {},
        
        mounted(){
            for(let i = 0; i < 3; i++){
                this.activities_store.generateActivity();
            }


            this.actionbar.push({name: "Créer"});
            this.actionbar.push({name: "Modifier"});
            this.actionbar.push({name: "Supprimer"});
        }
    }

</script>
