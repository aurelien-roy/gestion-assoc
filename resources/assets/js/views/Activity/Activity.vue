<template>
    <div class="row wrapped push-center">
        <h1 v-if="creating">Nouvelle activité</h1>
        <h1 v-else>Modifier l'activité</h1>

        <div v-if="activity" class="row">
            <label for="name">Nom activité</label> <input id="name" v-model="activity.name"><br/>
            <label for="age">Age conseillé</label> <input id="age" v-model="activity.age"><br/>
            <label for="level">Niveau</label> <input id="level" v-model="activity.level"><br/>
            <label for="jour">Jour</label>
            <select v-model="activity.day" id="jour">
                <option v-for="d in days" :value="d">{{ d }}</option>
            </select><br/>
            <label for="time_begin">Heure début</label> <input type="number" id="time_begin" max="23" min="0"
                                                               v-model="activity.time_begin"><br/>
            <label for="time_end">Heure fin</label> <input type="number" id="time_end" max="24" :min="activity.time_begin+1"
                                                           v-model="activity.time_end"><br/>
            <label for="teacher">Profiiseur</label> <input id="teacher" v-model="activity.teacher"><br/>
            <label for="effectif_max">Effectif maximum</label> <input type="number" id="effectif_max"
                                                                      :min="activity.effectif_current" v-model="activity.effectif_max">
            <label for="effectif_current">Effectif actuel</label>
            <p id="effectif_current">{{ activity.effectif_current }}</p>

        </div>

    </div>
</template>
<style>

</style>
<script>

    import activities_store from '../../store/activities'
    import actionbar from '../../store/actionbar'
    import enums from '../../helpers/enum'

    export default{
        name: 'Activity',

        data(){
            return {
                actionbar,
                activities_store,

                activity: null,
                days: enums.days,

            }
        },

        components: {},

        props: ['id'],

        methods: {
            save_activity() {
                if (this.name !== '') {
                    if (!this.creating) {
                        activities_store.modActivity(this.id,
                            this.name,
                            this.level,
                            this.age,
                            this.day,
                            this.time_begin,
                            this.time_end,
                            this.teacher,
                            this.effectif_max,
                            this.effectif_current);

                    }
                    else {
                        activities_store.saveNewActivity(this.activity);
                    }

                    this.$router.push({name: 'activities'});
                }
                else
                    alert('Wsh alors met un nom quoi');
            },

            cancel(){
                this.$router.push({name: 'activities'});
            }
        },

        computed: {
            creating(){ return this.id === undefined; }

        },

        watch: {},

        mounted(){

            actionbar.setActions([
                {name: 'OK', callback: this.save_activity},
                {name: 'Annuler', callback: this.cancel}
            ]);

            if (!this.creating) {
                this.activity = activities_store.get(this.id);
            }else{
                this.activity = {
                    name: '',
                    age: '',
                    level: '',
                    day: enums.days[0],
                    time_begin: 0,
                    time_end: 0,
                    teacher: '',
                    effectif_current: 0,
                    effectif_max: 0
                }
            }
        }
    }

</script>
