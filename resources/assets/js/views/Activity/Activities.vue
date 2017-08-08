<template>

    <div class="flex flexible h100 relative">
        <div class="absolute w100 h100">
            <div class="row wrapped push-center h100">
                <div class="row gutters col col-12">
                    <div class="col col-4 h100 scrollable left-pane no-selectable">

                        <ListHeadChoice :choices="['Nom', 'Date']" v-model="sortBy" class="sticky"></ListHeadChoice>

                        <transition-group tag="ul" name="flip-list" class="list">
                            <li v-for="a in activities" @click="selectActivity(a, $event)" :class="[{dark: isSelected(a)}, a.color + '-sheet']" :key="a.id">
                                <p><span class="title">{{ a.name }}</span><span class="second">{{ a.level }}</span></p>
                                <p class="details">{{ days[a.day] }} {{ a.time_begin }}h - {{ a.time_end }}h ◦ {{ a.teacher }}</p>
                            </li>
                        </transition-group>

                    </div>

                    <div class="col col-8 scrollable" v-if="selected">
                        <Activity v-model="selected"></Activity>
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
    import enums from '../../helpers/enum'

    import ListHeadChoice from '../../components/ListHeadChoice'
    import Activity from '../../components/Activity'
    
    export default{
        name: 'Activities',

        data(){
            return {
                actionbar,
                activities_store,
                time,
                days: enums.days,
                search: '',
                sortBy: 'Nom',
                selection: [],
                edit: false
            }
        },
        components: { Activity, ListHeadChoice },
        
        methods: {
            del(id){
                activities_store.delActivity(id);

            },

            openActivity(activity){
                console.log('open');
                console.log(activity);
                this.$router.push({name: 'activity', params: {id: activity.id}});
            },

            selectActivity(activity, e){
                if(!e.metaKey) {
                    this.selection.length = 0;
                    this.selection.push(activity);
                }else{
                    if(this.isSelected(activity)){
                        this.selection = this.selection.filter(s => s !== activity);
                    }else{
                        this.selection.push(activity);
                    }
                }

            },

            isSelected(activity){
                return this.selection.indexOf(activity) !== -1;
            },

            test(e){
                console.log(e.target.innerHTML);
            }
        },
        
        computed: {
            activities(){

                let activities = activities_store.state.activities;

                if(this.search !== ''){
                    let s = this.search.toLocaleLowerCase();
                    activities = activities.filter(a =>
                      a.name.toLocaleLowerCase().includes(s) || a.teacher.toLocaleLowerCase().includes(s)
                    );
                }

                if(this.sortBy === 'Nom') {
                    activities.sort((a, b) => a.name.localeCompare(b.name))
                }else if(this.sortBy === 'Date'){
                    activities.sort((a, b) => {
                        if(a.day !== b.day){
                            return a.day - b.day;
                        }else{
                            return a.time_begin - b.time_begin;
                        }
                    })
                }

                return activities;

            },

            loaded(){
                return activities_store.state.async.loaded;
            },

            selected(){

                if(this.selection.length === 1){
                    console.log(this.selection[0]);
                    return this.selection[0];
                }else{
                    return null;
                }
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
            activities_store.fetch();

            actionbar.setActions([]);
            actionbar.showPeriodDropdown(true);
        }
    }

</script>
