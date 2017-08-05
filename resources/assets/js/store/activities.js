import { rand } from '../helpers/math'

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
        let act = ['Classique', 'Jazz', 'Street', 'Ragga', 'Eveil'];
        let nvx = ['', 'Adultes', '10-12 ans', '5-6 ans'];
        let clr = ['red', 'blue', 'yellow', 'green', 'aqua', 'purple', 'orange'];

        for(let i = 0; i < 10; i ++) {
    
            let begin = rand(9, 16);
            let end = begin + rand(1, 3);
    
            this.state.activities.push({
                id: this.state.activities.length,
                members: [],
                name: act[rand(0, 4)],
                level: nvx[rand(0, 3)],
                age: nvx[rand(0, 3)],
                day: rand(0, 6),
                time_begin: begin,
                time_end: end,
                teacher: 'Jackie',
                effectif_max: 30,
                effectif_current: 10,
                color: clr[rand(0, 6)]
            });
        }
    },
    
    get(id){
        return this.state.activities.find(a => a.id === id);
    },

    saveNewActivity (activity){
        this.state.activities.push(activity);
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