import { rand } from '../helpers/math'

const State = {NotSynchro: 'NOT SYNCHRO', Synchro: 'SYNCHRO', Fetching: 'FETCHING', Emiting: 'EMITING'};


export default {

    state: {
        activities: [],
        
        async: {
            state_actual: State.NotSynchro,
            task: 0
        }
        
    },

    //Génère une nouvelle activitée
    genActivity(){
        return {
            id: undefined,
            members: [],
            name: '',
            level: '',
            age: '',
            day: undefined,
            time_begin: undefined,
            time_end: undefined,
            teacher: '',
            effectif_max: undefined,
            effectif_current: undefined,
            color: ''
        }
    },

    //Génère des activités de test
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

    //Obtient une activité grâce à l'identifiant
    get(id){
        return this.state.activities.find(a => a.id === id);
    },

    //Sauvegarde une nouvelle activité
    saveNewActivity (activity){
        if (this.state.async.state_actual === State.Synchro) {
            this.state.async.state_actual = State.Emiting;

            setTimeout(() => {
                let id = this.state.activities.length;
                activity.id = id;

                this.state.activities.push(activity);
                this.state.async.state_actual = State.Synchro;
            }, 2000);
        }
    },

    //Modifie une activité existante
    modActivity (activity){
        if (this.state.async.state_actual === State.Synchro) {
            this.state.async.state_actual = State.Emiting;

            setTimeout(() => {
                this.delActivity(activity.id); //Faire attention au passage en ajax
                this.state.activities.push(activity);
                this.state.async.state_actual = State.Synchro;
            }, 2000);
        }
    },

    //Suprime une activité
    delActivity(id){
        if (this.state.async.state_actual === State.Synchro) {
            this.state.async.state_actual = State.Emiting;

            setTimeout(() => {
                this.state.activities = this.state.activities.filter(a => {
                    return id !== a.id;
                });
            }, 2000);
        }
    },

    //Télécharge les membres
    fetch(){
        if (this.state.async.state_actual === State.NotSynchro) {
            this.state.async.state_actual = State.Fetching;
    
            this.state.async.task = setTimeout(() => {
                this.generateActivity();

                this.state.async.state_actual = State.Synchro;
            }, 1500);
        }
    },

    //Détruit les opérations courantes
    cancelThreads(){
        clearTimeout(this.state.async.task);
        this.state.async.state_actual = State.NotSynchro;
    },

    //Changement de période
    onPeriodChange(newPeriod){
        this.cancelThreads();
        this.state.activities = [];
        //this.state.async.state_actual = State.NotSynchro;
    }
};