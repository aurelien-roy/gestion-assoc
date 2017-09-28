<template>
    <div class="flex flexible relative">
        <div class="absolute w100 h100">
            <div class="row wrapped push-center h100">
                <div class="row gutters col col-12 h100">
                    <div class="col col-4 h100 scrollable left-pane no-selectable">

                        <SideList
                                :items="activities"
                                v-model="selection"

                                component="ActivityItem"
                                :sorting="sorting"
                                @create="createActivity"
                                @delete="deleteSelection"
                        ></SideList>

                    </div>
                    {{ actionbar.searchQuery }}
                    <div class="col col-8 scrollable">
                        <router-view :data="editableActivity" @update="updateActivity"></router-view>
                        <!--<Activity :data="editableActivity" v-if="editableActivity" @update="updateActivity" :quitHandler="quitHandler"></Activity>-->
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
    import {days} from "../../helpers/enum";

    export default{
        name: 'Activities',

        data(){
            return {
                activity_id: null,
                period: null,
                actionbar,
                activities_store,
                time,
                search: '',
                sortBy: 'Nom',
                selection: [],
                edit: false,
                id: undefined,

                sorting: {
                    'Nom': (a, b) => a.name.localeCompare(b.name),

                    'Date': (a, b) => {
                        if(a.day !== b.day){
                            return a.day - b.day;
                        }else{
                            return a.time_begin - b.time_begin;
                        }
                    }
                },

                fetching: false,
                activity: null,
                editableActivity: null,
                creationSignalSent: false,
                quitHandler: null,
            }
        },
        components: { SideList, Activity },

        methods: {
            createActivity(){
                this.$router.push({name: 'new_activity'});
            },

            deleteSelection(){
                if(this.selection.length) {
                    activities_store.execute('DELETE_ACTIVITIES', {period: time.state.selectedPeriod, activities: this.selection});
                }
            },

            openActivity(activity){
                this.$router.push({name: 'activity', params: {period: time.state.currentPeriod, id: activity.id}});
            },

            periodRequested(period){
                let that = this;

                let callback = () => {
                    if(callback === that.fetching){
                        that.fetching = false;
                        that.loadActivityModule()
                    }
                }

                this.fetching = callback;
                activities_store.fetch('ACTIVITIES_BY_PERIOD', period, callback);
            },

            updateActivity(changes){
                // Bonjour je suis un commentaire
                if (activities_store.execute('EDIT_ACTIVITY', {
                        activity: this.activity,
                        changes,
                        sendToServer: this.activity.id
                    })) {

                    this.editableActivity = activities_store.getters.get(parseInt(this.period), parseInt(this.id));
                }

                if(this.creating && !this.creationSignalSent && this.activity.name.length){
                    let activity = this.activity;
                    let that = this;
                    activities_store.execute('CREATE_ACTIVITY', {activity: this.activity, period: time.state.currentPeriod}, () => {
                        if(that.activity === activity){
                            that.$router.push({name: 'activity', params: {period: time.state.selectedPeriod, id: activity.id}})
                        }
                    });
                    this.creationSignalSent = true;
                }
            },

            loadActivityModule(){
                if(this.creating && (!this.activity || this.activity.id)){
                    this.creationSignalSent = false;
                    this.activity = activities_store.genActivity();
                    this.editableActivity = deepCopy(this.activity);

                }else if(this.id !== undefined && this.period !== undefined){

                    //time.selectPeriod(this.period);
                    if(!this.fetching) {
                        this.activity = activities_store.getters.get(parseInt(this.period), parseInt(this.id));
                        if (!this.activity) {
                            this.$router.push({name: 'activities'})
                        } else {
                            this.selection = [this.activity];
                            this.editableActivity = deepCopy(this.activity);
                        }
                    }
                }else if(!this.creating){
                    this.activity = null;
                    this.editableActivity = null;
                }
            },

            /*handleRouteChange(to, from, next){
             if(from.name === 'activity'){
             this.quitHandler
             }
             }*/

        },

        computed: {
            activities(){
                let activities = activities_store.getters.activitiesByPeriod(time.state.selectedPeriod);

                if (this.actionbar.searchQuery === '')
                    return activities;
                else // Recherche par le nom, le jour, le prof, le lieu, le niveau
                    return activities.filter(a => {
                        let s = this.actionbar.searchQuery.toLocaleLowerCase();
                        //console.log(a.teacher);
                        return (a.name.toLocaleLowerCase().includes(s)
                        //|| a.teacher.toLocaleLowerCase().includes(s)
                        //|| a.level.toLocaleLowerCase().includes(s)
                        //|| a.level.toLocaleLowerCase().includes(s)
                        || a.schedules.find(e => {
                            return days[e.day].toLocaleLowerCase().includes(s);
                        }))
                    });
            },

            creating(){
                return this.$route.name === 'new_activity';
            }
        },

        watch:{
            'time.state.selectedPeriod'(p, op){
                if(p !== op) {
                    this.periodRequested(p);
                }
            },

            '$route'(){
                if(this.$route.params.period) {
                    time.selectPeriod(this.$route.params.period);
                    this.period = this.$route.params.period;
                }

                this.id = this.$route.params.id;

                this.loadActivityModule();
            },

            selection(s){
                if(s.length === 1) {
                    this.openActivity(s[0]);
                }else{
                    this.activity = null;
                    this.editableActivity = null;
                }
            }
        },

        mounted(){

            if(this.$route.params.period) {
                time.selectPeriod(this.$route.params.period);
                this.period = this.$route.params.period;
            }

            this.id = this.$route.params.id;

            this.periodRequested(time.state.selectedPeriod);

            this.loadActivityModule();


            actionbar.setActions([]);
            actionbar.showPeriodDropdown(true);
            actionbar.showSearch("Rechercher une activitée");

        },
    }

</script>
