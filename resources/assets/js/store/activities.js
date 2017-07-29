export default {
    
    state: {
        activities: [],
        
        async: {
            fetching: false,
            loaded: false,
            task: 0
        }
        
    },
    
    generateActivity(){
        let act = ['Classique', 'Jazz', 'Street'];

        for(let i = 0; i < 3; i ++)
            this.state.activities.push({
                id: this.state.activities.length,
                members: [],
                name: act[i],
                level: 'Compétition',
                age: 'Adulte',
                day: 'Lundi',
                time_begin: 18,
                time_end: 20,
                teacher: 'Jackie',
                effectif_max: 30,
                effectif_current: 10
            });
    },

    newActivity (name, level, age, day, time_begin, time_end, teacher, effectif_max){
        this.state.activities.push
        ({
            id: this.state.activities.length,
            members: [],
            name,
            level,
            age,
            day,
            time_begin,
            time_end,
            teacher,
            effectif_max,
            effectif_current: 0
        });
    },

    modActivity (id, level, age, name, day, time_begin, time_end, teacher, effectif_max, effectif_current){
        this.delActivity(id);
        this.state.activities.push
        ({
            id: id,
            name: name,
            level: level,
            age: age,
            day: day,
            time_begin: time_begin,
            time_end: time_end,
            teacher: teacher,
            effectif_max: effectif_max,
            effectif_current: effectif_current
        });
    },

    delActivity(id){
        this.state.activities = this.state.activities.filter(a => {
            return id !== a.id;
        });
    },
    
    fetch(period){
        if(!this.state.async.fetching) {
            this.state.async.loaded = false;
            this.state.async.fetching = true;
            this.state.activities.length = 0;
    
            this.state.async.task = setTimeout(() => {
                this.generateActivity();
        
                this.state.async.loaded = true;
                this.state.async.fetching = false;
            }, 1500);
        }
    },
    
    cancelFetch(){
        clearTimeout(this.state.async.task);
        this.state.async.fetching = false;
        this.state.async.loaded = false;
    },
    
    onPeriodChange(){
        this.cancelFetch();
        this.state.activities = [];
    }
};