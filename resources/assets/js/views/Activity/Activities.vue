<template>
    <div class="flex flexible relative">
        <div class="absolute w100 h100">
            <div class="row wrapped push-center h100">
                <div class="row gutters col col-12 h100">
                    <div class="col col-4 h100 left-pane no-selectable">

                        <SideList
                                :items="elements"
                                v-model="selection"

                                component="ActivityItem"
                                :sorting="sorting"
                                :match="match"
                                @create="createElement"
                                @duplicate="duplicateElement"
                                @delete="deleteElements"
                        ></SideList>

                    </div>
                    <div class="col col-8 scrollable">
                        <router-view :data="editableElement" @update="updateElement"></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style lang="scss" src="../../../sass/list.scss"></style>
<script>

    import resource_mixin from '../../helpers/resource_mixin'
    import elements_store from '../../store/activities'

    import Activity from '../../components/Activity'
    import SideList from '../../components/list/SideList'
    import {days} from "../../helpers/enum";

    export default{
        name: 'Activities',
        mixins: [resource_mixin],

        components: {SideList},

        data(){
            return {
                elements_store,
                sortBy: 'Nom',
                sorting: {
                    'Nom': (a, b) => a.name.localeCompare(b.name),

                    'Date': (a, b) => {
                        if (a.schedules.length === 0 && b.schedules.length === 0)
                            return 0;
                        else if (a.schedules.length === 0)
                            return -1;
                        else if (b.schedules.length === 0)
                            return 1;

                        if (a.schedules[0].day !== b.schedules[0].day) {
                            return a.schedules[0].day - b.schedules[0].day;
                        }else{
                            return a.schedules[0].time_begin.compare(b.schedules[0].time_begin);
                        }
                    }
                },

                match: (activity, s) => {
                    return (activity.name.toLocaleLowerCase().includes(s)
                      || activity.teacher.toLocaleLowerCase().includes(s)
                      || activity.level.toLocaleLowerCase().includes(s)
                      || activity.schedules.find(e => {
                          return days[e.day].toLocaleLowerCase().includes(s);
                      }))
                },
            }
        }

    }

</script>
