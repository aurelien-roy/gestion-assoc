<template>
    <div class="row wrapped push-center">
     <h1>Activités</h1>

        <input type="text" placeholder="Rechercher un prof, une activité ou encore un jour" v-model="search">

        <table>
            <tr>
                <th>Nom</th>
                <th>Jour</th>
                <th>Begin</th>
                <th>End</th>
                <th>Prof</th>
                <th>Effectif actu</th>
                <th>Eff max</th>
            </tr>

            <tr v-for="a in activities">
                <td>{{ a.name }}</td>
                <td>{{ a.day }}</td>
                <td>{{ a.time_begin }}</td>
                <td>{{ a.time_end }}</td>
                <td>{{ a.teacher }}</td>
                <td>{{ a.effectif_current }}</td>
                <td>{{ a.effectif_max }}</td>
                <td><button v-on:click="del(a)">Sup</button></td>
            </tr>
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
                activities_store,
                search: ''
            }
        },
        components: {},
        
        methods: {
            del(a){
                activities_store.delActivity(a.id);
            }
        },
        
        computed: {
            activities(){
                if(this.search === '')
                    return activities_store.state.activities;
                else
                    return activities_store.state.activities.filter(a => {
                        let s = this.search.toLocaleLowerCase();
                       return (a.name.toLocaleLowerCase().includes(s)
                                || a.teacher.toLocaleLowerCase().includes(s))
                    });
            }
        },
        
        watch: {},
        
        mounted(){
            this.activities_store.generateActivity();


            this.actionbar.push({name: "Créer"});
            this.actionbar.push({name: "Modifier"});
            this.actionbar.push({name: "Supprimer"});
        }
    }

</script>
