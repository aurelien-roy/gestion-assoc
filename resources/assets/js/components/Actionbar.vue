<template>
    <div id="action_bar">
        <div class="action_bar-visible h100">
            <a href="#" class="show-sm menu-toggle">
                <i class="activities"></i>
                <div class="arrow down"></div>
            </a>
            <div class="action_bar-content align-middle row">
                <div class="auto row flex-dir-row">
                    <div class="element" v-for="a in actionbar.actions">
                        <a href="#" @click="clickBtn(a)">{{ a.name }}</a>
                    </div>
                </div>

                <input class="wide selector" type="text" v-model="actionbar.searchQuery" :placeholder="actionbar.searchText"
                       v-if="actionbar.searchVisible"/>

                <select class="selector" v-model="selectedPeriod" v-if="actionbar.periodDropdown">
                    <option v-for="n in (currentPeriod - startPeriod + 1)" :value="time.indexToPeriod(n-1)">{{ time.periodName(time.indexToPeriod(n-1)) }}</option>
                </select>
            </div>


        </div>
    </div>
</template>
<script>

    import actionbar from '../store/actionbar'
    import time from '../store/time'
    
    export default{
        data(){
            return {
                actionbar,
                time
            }
        },
        components: {},
        
        methods: {
            clickBtn(action){
                if(action.callback){
                    action.callback();
                }

                if(action.routeTo){
                    this.$router.push({ name: action.routeTo });
                }
            }
        },
        
        computed: {
            currentPeriod(){ return time.state.currentPeriod; },
            startPeriod(){ return time.state.startPeriod; },
            selectedPeriod:{
                get(){
                    return time.state.selectedPeriod;
                },

                set(t){
                    time.selectPeriod(t);
                }
            }
        },
        
        mounted(){
            
        }
    }

</script>
