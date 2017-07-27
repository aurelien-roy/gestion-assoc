<template>
    <div>
        <h1 v-if="exist">Modifié activité</h1>
        <h1 v-else>Nouvelle activité</h1>

        <label for="name">Nom activité</label> <input type="text" id="name" v-model="name"><br/>
        <label for="age">Age conseillé</label> <input type="text" id="age" v-model="age"><br/>
        <label for="level">Niveau</label> <input type="text" id="level" v-model="level"><br/>
        <label for="jour">Jour</label>
        <select v-model="day" id="jour">
            <option v-for="d in days" :value="d">{{ d }}</option>
        </select><br/>
        <label for="time_begin">Heure début</label> <input type="number" id="time_begin" max="23" min="0"
                                                           v-model="time_begin"><br/>
        <label for="time_end">Heure fin</label> <input type="number" id="time_end" max="24" :min="time_begin+1"
                                                       v-model="time_end"><br/>
        <label for="teacher">Profiiseur</label> <input type="text" id="teacher" v-model="teacher"><br/>
        <label for="effectif_max">Effectif maximum</label> <input type="number" id="effectif_max"
                                                                  :min="effectif_current" v-model="effectif_max">
        <label for="effectif_current">Effectif actuel</label>
        <p id="effectif_current">{{ effectif_current }}</p>

        <button @click="save_activity()">Enregistrer</button>

    </div>
</template>
<style>

</style>
<script>

    import activities_store from '../../store/activities'
    import actionbar from '../../store/actionbar'
    import enus from '../../helpers/enum'

    export default{
        name: 'NewActivity',

        data(){
            return {
                actionbar,
                activities_store,
                exist: false,
                id: 0,
                days: enus.days,

                name: '',
                age: '',
                level: '',
                day: enus.days[0],
                time_begin: 18,
                time_end: 20,
                teacher: '',
                effectif_max: 30,
                effectif_current: 0
            }
        },
        components: {},

        methods: {
            save_activity() {
                if (this.name != '') {
                    if (this.exist) {
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
                        alert('Activité modifié ocaml!!!!');
                    }
                    else {
                        activities_store.newActivity(this.name,
                            this.level,
                            this.age,
                            this.day,
                            this.time_begin,
                            this.time_end,
                            this.teacher,
                            this.effectif_max);
                        alert('Nouvelle activité créer ;)');
                    }
                }
                else
                    alert('Wsh alors met un nom quoi');
            }
        },

        computed: {},

        watch: {},

        mounted(){
            if (this.exist) {
                let activity = activities_store.state.activities.find(a => {
                    return this.id != a.id;
                });
                this.name = activity.name;
                this.age = activity.age;
                this.level = activity.level;
                this.day = activity.day;
                this.time_begin = activity.time_begin;
                this.time_end = activity.time_end;
                this.teacher = activity.teacher;
                this.effectif_max = activity.effectif_max;
                this.effectif_current = activity.effectif_current;
            }
        }
    }

</script>
