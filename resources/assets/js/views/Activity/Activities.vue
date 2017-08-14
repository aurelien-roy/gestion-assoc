<template>
    <div class="flex flexible h100 relative">
        <div class="absolute w100 h100">
            <div class="row wrapped push-center h100">
                <div class="row gutters col col-12 h100">
                    <div class="col col-4 h100 scrollable left-pane no-selectable">

                        <SideList
                                :items="activities"
                                v-model="selection"

                                component="ActivityItem"
                                :sorting="sorting"
                                @delete="deleteSelection"
                        ></SideList>

                    </div>

                    <div class="col col-8 scrollable" v-if="selected">
                        <Activity :data="selected" @update="updateActivity"></Activity>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style lang="scss" src="../../../sass/list.scss"></style>
<script>

    import activities_store from '../../store/activities'
    import actionbar from '../../store/actionbar'
    import time from '../../store/time'

    import Activity from '../../components/Activity'
    import SideList from '../../components/list/SideList'
    
    export default{
        name: 'Activities',

        data(){
            return {
                actionbar,
                activities_store,
                time,
                search: '',
                sortBy: 'Nom',
                selection: [],
                edit: false,

                sorting: {
                    'Nom': (a, b) => a.name.localeCompare(b.name),

                    'Date': (a, b) => {
                        if(a.day !== b.day){
                            return a.day - b.day;
                        }else{
                            return a.time_begin - b.time_begin;
                        }
                    }
                }
            }
        },
        components: { Activity, SideList },
        
        methods: {
            deleteSelection(){

                if(this.selection.length) {
                    activities_store.execute('DELETE_ACTIVITIES', {period: time.state.selectedPeriod, activities: this.selection});
                }
            },

            openActivity(activity){

                this.$router.push({name: 'activity', params: {id: activity.id}});
            },

            updateActivity(changes){
                activities_store.execute('EDIT_ACTIVITY', {activity: this.selected, changes});
            }

        },
        
        computed: {
            activities(){
                return activities_store.getters.activitiesByPeriod(time.state.selectedPeriod);
            },

            selected(){
                if(this.selection.length === 1){
                    return this.selection[0];
                }else{
                    return null;
                }
            }
        },

        watch:{
            'time.state.selectedPeriod'(p){
                activities_store.fetch('ACTIVITIES_BY_PERIOD', p);
            }
        },
        
        mounted(){
            activities_store.fetch('ACTIVITIES_BY_PERIOD', time.state.selectedPeriod);

            actionbar.setActions([]);
            actionbar.showPeriodDropdown(true);
        }
    }

</script>
