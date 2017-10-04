<template>
    <div class="flex flexible h100 relative">
        <div class="absolute w100 h100">
            <div class="row wrapped push-center h100">
                <div class="row gutters col col-12 h100">
                    <div class="col col-4 h100 scrollable left-pane no-selectable">

                        <SideList
                                :items="policies"
                                v-model="selection"

                                component="PricingPolicyItem"
                                :sorting="sorting"
                                @create="createPolicy"
                                @delete="deleteSelection"
                        ></SideList>

                    </div>

                    <div class="col col-8 scrollable">

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style lang="scss" src="../../sass/list.scss"></style>
<script>

    import time from '../store/time'
    import policies_store from '../store/pricing_policies'
    import actionbar from '../store/actionbar'

    import SideList from '../components/list/SideList.vue'
    import PricingPolicyItem from '../components/list/items/PricingPolicyItem.vue'
    
    export default {
        data() {
            return {
                selection: [],
                sorting: {
                    'Num': (a, b) => a.name.localeCompare(b.name),

                    'Nom': (a, b) => (a < b ? 1 : (a > b ? -1 : 0))
                },
            }
        },
        components: { SideList },
        
        methods: {
            createPolicy(){

            },

            deleteSelection(){

            },

            periodRequested(period){
                let that = this;

                let callback = () => {
                    if(callback === that.fetching){
                        that.fetching = false;
                        //that.loadPolicyModule()
                    }
                }

                this.fetching = callback;
                policies_store.fetch('POLICIES_BY_PERIOD', period, callback);
            }
        },
        
        computed: {
            policies(){
                return policies_store.getters.policiesByPeriod(time.state.selectedPeriod);
            },
        },
        
        watch: {},

        mounted(){
            if(!this.period || parseInt(this.period) === time.state.selectedPeriod){
                this.periodRequested(time.state.selectedPeriod);
            }

            //this.loadPolicyModule();


            actionbar.setActions([]);
            actionbar.showPeriodDropdown(true);
        },

        props: ['id', 'period']
    }

</script>
