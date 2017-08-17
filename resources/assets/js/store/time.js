import activities from './activities';

let time_store = {
    
    state: {
        startPeriod: 2015,
        currentPeriod: 2016,
        selectedPeriod: 2016,
    
        periodChangeCallbacks: [],
    },
    
    periodIndex(){
        return this.state.selectedPeriod - this.state.startPeriod;
    },
    
    indexToPeriod(idx){
        return this.state.startPeriod + idx;
    },
    
    selectPeriod(newPeriod){
        let oldPeriod = this.state.selectedPeriod;
        newPeriod = parseInt(newPeriod);
        
        if(newPeriod !== oldPeriod) {
            this.state.selectedPeriod = newPeriod;
            this.state.periodChangeCallbacks.forEach(o => o.onPeriodChange());
        }
        
        console.log('period selected: ' + newPeriod);
    },
    
    periodName(period){
        return period + ' / ' + (period+1);
    },
    
    addPeriodChangeCallback(callback){
        this.state.periodChangeCallbacks.push(callback);
    }
}

export default time_store;