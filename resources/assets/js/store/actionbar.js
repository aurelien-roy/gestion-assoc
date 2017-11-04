export default {
    actions: [],
    periodDropdown: false,

    setActions(tab){
        
        this.actions = tab;
    },
    
    showPeriodDropdown(val){
        this.periodDropdown = val;
    }
}