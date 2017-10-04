<template>
    <div>
        <div class="row">
            <h1>Gestion des membres</h1>
        </div>

        <div class="row">

            <div class="col-5">
                <input placeholder="Rechercher un membre" v-model="search">

                <ul>
                    <li v-for="m in members" @click="openMember(m)">
                        {{ m.firstname + ' ' + m.lastname + ' (' + m.birthdate.year + ')' }}
                    </li>
                </ul>

            </div>

            <div class="col-7">
                <router-view></router-view>
            </div>

        </div>
    </div>
</template>
<style>

</style>
<script>

    import members_store from '../../store/members'
    import actionbar from '../../store/actionbar'
    import time from '../../store/time'

    export default{
        name: 'Members',

        data(){
            return {
                actionbar,
                members_store,
                search: ''
            }
        },
        components: {},

        methods: {
            openMember(member){
                this.$router.push({name: 'open_member', params: {id: member.id}});
            }
        },

        computed: {
            members(){
                if (this.search === '')
                    return members_store.state.members;
                else
                    return members_store.state.members.filter(m => {
                        let s = this.search.toLocaleLowerCase();
                        return (m.firstname.toLocaleLowerCase().includes(s)
                        || m.lastname.toLocaleLowerCase().includes(s)
                        || m.birthdate.year.includes(s))
                    });
            },
        },

        watch: {},

        mounted(){
            this.actionbar.setActions([
                {name: "Créer", routeTo: 'new_member'}
            ]);
        }
    }

</script>
