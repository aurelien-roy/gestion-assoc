<template>
    <div class="flex flexible relative">
        <div class="absolute w100 h100">
            <div class="row wrapped push-center h100">
                <div class="row gutters col col-12 h100">
                    <div class="col col-4 h100 left-pane no-selectable">

                        <SideList
                                :items="elements"
                                v-model="selection"

                                component="MemberItem"
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

<script>

    import resource_mixin from '../../helpers/resource_mixin'
    import elements_store from '../../store/members'
    import actionbar from '../../store/actionbar'
    import time from '../../store/time'
    import SideList from '../../components/list/SideList'


    export default{
        name: 'Members',
        mixins: [resource_mixin],

        components: {SideList},

        data(){
            return {
                elements_store,
                sortBy: 'Nom',
                sorting: {
                    'Nom': (a, b) => {
                        let s = a.lastname.localeCompare(b.lastname);
                        if(!s) s = a.firstname.localeCompare(b.firstname);
                        return s;
                    },

                    'Prénom': (a, b) => {
                        let s = a.firstname.localeCompare(b.firstname);
                        if(!s) s = a.lastname.localeCompare(b.lastname);
                        return s;
                    }
                },

                match: (member, s) => {
                    s = s.toLocaleLowerCase();
                    return (member.firstname.toLocaleLowerCase().includes(s)
                      || member.lastname.toLocaleLowerCase().includes(s))
                      /*|| member.birthdate.year.includes(s))*/
                },

                creationSignalSent: false,
                fetching: false,
                id: null,
            }
        }
    }

</script>
