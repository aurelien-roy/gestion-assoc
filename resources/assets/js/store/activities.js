export default {
    
    state: {
        activities: [],
    },
    
    generateActivity(){
        let act = ['Classique', 'Jazz', 'Street'];

        for(let i = 0; i < 3; i ++)
            this.state.activities.push({
                id: this.state.activities.length,
                name: act[i],
                day: 'Lundi',
                time_begin: '18h',
                time_end: '20h',
                teacher: 'Jackie',
                effectif_max: 30,
                effectif_current: 10
            });
        
        window.activities = this.state.activities;
    },

    delActivity(id){
        this.state.activities = this.state.activities.filter(a => {
            return id != a.id;
        });
    }
}