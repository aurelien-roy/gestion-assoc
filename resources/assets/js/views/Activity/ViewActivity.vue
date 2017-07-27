<template>
    <div>
        <h1>Membres {{ name }}</h1>

        <table>
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

        <button @click="">Nouveau membre</button>

    </div>
</template>
<style>

</style>
<script>

    import activities_store from '../../store/activities'
    import actionbar from '../../store/actionbar'

    export default{
        name: 'ViewActivity',

        data(){
            return {
                actionbar,
                activities_store,
                id: 0,

                name: '',
                members: []
            }
        },
        components: {},

        methods: {},

        computed: {},

        watch: {},

        mounted(){
            let activity = activities_store.state.activities.find(a => {
                return this.id != a.id;
            });
            this.name = activity.name;
            this.members = activity.members;
        }
    }

</script>
