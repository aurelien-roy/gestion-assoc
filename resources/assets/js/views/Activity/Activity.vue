<template>
    <div>
        <Activity :data="editableActivity" @update="updateActivity" v-if="editableActivity"></Activity>
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
                activity: { id: undefined },
                editableActivity: null,
                creationSignalSent: false,
            }
        },
        components: { Activity },

        methods: {
            updateActivity(changes){
                // TODO : N'éxécuter ceci que pour les activités déjà enregistrés
                activities_store.execute('EDIT_ACTIVITY', {activity: this.requestedActivity, changes});

                if(this.creating && !this.creationSignalSent && this.requestedActivity.name.length){
                    activities_store.execute('CREATE_ACTIVITY', {activity: this.requestedActivity, period: time.state.currentPeriod});
                    this.creationSignalSent = true;
                }
            },

            fetchActivity(){
                this.activity = this.requestedActivity;

                if(this.activity) {
                    this.editableActivity = this.activity.makeCopy();
                    return true;
                }

                return false;
            }
        },

        computed: {
            creating(){
                return this.$route.name === 'new_activity'
            },

            requestedActivity(){
                if(this.creating){
                    return activities_store.genActivity();
                }else{
                    return activities_store.getters.get(time.state.currentPeriod, parseInt(this.id));
                }
            }
        },

        mounted(){
            this.fetchActivity();
        },

        watch: {
            requestedActivity(){
                this.creationSignalSent = false
                this.fetchActivity();
            },

            'activity.id'(newId){
                if (this.creating && this.creationSignalSent) {
                    this.$router.push({name: 'activity', params: {id: newId}})
                }
            }
        },

        props: ['id'],
    }

</script>
