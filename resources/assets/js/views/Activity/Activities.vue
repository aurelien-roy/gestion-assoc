<template>
    <div class="row wrapped push-center">
        <h1>Activités</h1>

        <input placeholder="Rechercher un prof, une activité ou encore un jour" v-model="search">

        <table v-if="loaded">
            <tr>
                <th>Activité</th>
                <th>Jour</th>
                <th>Begin</th>
                <th>End</th>
                <th>Prof</th>
                <th>Effectif actu</th>
                <th>Eff max</th>
            </tr>

            <tr v-for="a in activities" @click="">
                <td>{{ a.name + ' (' + a.age + ' / ' + a.level + ')' }}</td>
                <td>{{ a.day }}</td>
                <td>{{ a.time_begin }}</td>
                <td>{{ a.time_end }}</td>
                <td>{{ a.teacher }}</td>
                <td>{{ a.effectif_current }}</td>
                <td>{{ a.effectif_max }}</td>
                <td>
                    <button @click.prevent="">Mod</button>
                </td>
                <td>
                    <button @click.prevent="del(a.id)">Sup</button>
                </td>
            </tr>
        </table>

        <p v-else>CHARGEMENT...</p>

        <router-link to="ouvrir_activite"><i class="activities w24"></i>Ouvrir activité</router-link>

    </div>
</template>
<style>

</style>
<script>

    import activities_store from '../../store/activities'
    import actionbar from '../../store/actionbar'
    import time from '../../store/time'
    
    export default{
        name: 'Activities',

        data(){
            return {
                actionbar,
                activities_store,
                time,
                search: ''
            }
        },
        components: {},
        
        methods: {
            del(id){
                activities_store.delActivity(id);

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
            },

            loaded(){
                return activities_store.state.async.loaded;
            }
        },
        
        watch: {
            loaded(loaded){
                if(!loaded){
                    activities_store.fetch(time.state.selectedPeriod);
                }
            }
        },
        
        mounted(){
            activities_store.fetch(time.state.selectedPeriod);


            this.actionbar.push({name: "Créer", routeTo: 'nouvelle_activite'});
            this.actionbar.push({name: "Modifier"});
            this.actionbar.push({name: "Supprimer"});
        }
    }

</script>
