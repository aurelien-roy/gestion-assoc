<template>

    <div class="wrapped push-center">
        <h1>Activités</h1>

        <input placeholder="Rechercher un prof, une activité ou encore un jour" v-model="search">

        <table v-if="loaded">
            <tr>
                <th>Activité</th>
                <th>Jour</th>
                <th>Encadrant</th>
                <th>Effectif</th>
                <th></th>
            </tr>

            <tr v-for="a in activities" @click="openActivity(a)">
                <td>{{ a.name + ' (' + a.age + ' / ' + a.level + ')' }}</td>
                <td>{{ a.day }} de {{ a.time_begin }}h à {{ a.time_end }}h</td>
                <td>{{ a.teacher }}</td>
                <td>{{ a.effectif_current }}/{{ a.effectif_max }}</td>
                <td>
                    <a @click.prevent="del(a.id)">Sup</a>
                </td>
            </tr>
        </table>

        <div class="loading big" v-else></div>

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

            },

            openActivity(activity){
                console.log('open');
                console.log(activity);
                this.$router.push({name: 'activity', params: {id: activity.id}});
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


            actionbar.setActions([
              {name: "Créer", routeTo: 'new_activity'}
            ]);

            actionbar.showPeriodDropdown(true);
        }
    }

</script>
