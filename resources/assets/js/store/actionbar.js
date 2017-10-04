export default {
    actions: [],
    periodDropdown: false,

    searchQuery: '',
    searchText: "",
    searchVisible: false,

    setActions(tab){
        
        this.actions = tab;
    },
    
    showPeriodDropdown(val){
        this.periodDropdown = val;
    },

    showSearch(defaultText){
        this.searchVisible = true;
        this.searchText = defaultText;
    },
}