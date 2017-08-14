<template>
    <div>
        <Activity :data="copy" @update="updateActivity" v-if="activity"></Activity>
    </div>

</template>
<style>

</style>
<script>

    import Activity from '../../components/Activity'
    import activities_store from '../../store/activities'
    import time from '../../store/time'

    export default {
        data() {
            return {
            }
        },
        components: { Activity },

        methods: {
            updateActivity(changes){
                activities_store.execute('EDIT_ACTIVITY', {activity: this.activity, changes});
            }
        },

        computed: {
            activity(){
                return activities_store.getters.get(time.state.currentPeriod, parseInt(this.id));
            },

            copy(){
                return this.activity.makeCopy();
            }
        },

        props: ['id'],
    }

</script>
