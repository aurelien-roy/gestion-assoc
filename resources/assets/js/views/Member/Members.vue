<template>
    <div class="flex flexible relative">
        <div class="absolute w100 h100">
            <div class="row wrapped push-center h100">
                <div class="row gutters col col-12 h100">
                    <div class="col col-4 h100 left-pane no-selectable">

                        <SideList
                                :items="members"
                                v-model="selection"
                                :sorting="sorting"

                                component="MemberItem"
                        ></SideList>

                    </div>
                    <div class="col col-8 scrollable">
                        <router-view :data="editableMember" @update="updateMember"></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" src="../../../sass/list.scss"></style>
<script>

    import members_store from '../../store/members'
    import actionbar from '../../store/actionbar'
    import time from '../../store/time'
    import SideList from '../../components/list/SideList'

    export default{
        name: 'Members',

        data(){
            return {
                actionbar,
                members_store,
                selection: null,
                member: null,
                editableMember: null,

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
                      || member.lastname.toLocaleLowerCase().includes(s)
                      || member.birthdate.year.includes(s))
                }
            }
        },
        components: { SideList },

        methods: {
            openMember(member){
                this.$router.push({name: 'member', params: {id: member.id}});
            },

            updateMember(member){
                console.log("TODO - updateMember")
            }
        },

        computed: {
            members(){
                return members_store.getters.all();
            },
        },

        watch: {
            selection(s){
                if(s.length === 1) {
                    this.openMember(s[0]);
                }else{
                    this.member = null;
                    this.editableMember = null;
                }
            }
        },

        mounted(){

            if(members_store.getters.all().length === 0)
                members_store.genLocalTestMembers();
        }
    }

</script>
