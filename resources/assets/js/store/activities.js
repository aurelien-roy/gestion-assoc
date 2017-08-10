import { rand } from '../helpers/math'
import ajaxStore from '../helpers/ajax-store'

const State = {NotSynchro: 'NOT SYNCHRO', Synchro: 'SYNCHRO', Fetching: 'FETCHING', Emiting: 'EMITING'};

let store = {
    
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
            color: '',
            makeCopy(){
                return {
                    id: this.id,
                    members: this.members,
                    name: this.name,
                    level: this.level,
                    age: this.age,
                    day: this.day,
                    time_begin: this.time_begin,
                    time_end: this.time_end,
                    teacher: this.teacher,
                    effectif_max: this.effectif_max,
                    effectif_current: this.effectif_current,
                    color: this.color
                }
            }
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
            
            let a = this.genActivity();
            a.id = this.state.activities.length;
            a.name = act[rand(0, 4)];
            a.age = nvx[rand(0, 3)];
            a.day = rand(0, 6);
            a.time_begin = begin;
            a.time_end = end;
            a.teacher = 'Jackie';
            a.color = clr[rand(0, 6)];
    
            this.state.activities.push(a);
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
    },
    
    actions:{
        
        EDIT_ACTIVITY: {
            
            applyLocally(params, store){
                Object.assign(params.activity, params.changes);
            },
            
            makeRequest(request, context, result){
                request().success(() => {
                    result.isSuccess();
                });
            }
        },
    
        DELETE_ACTIVITIES: {
            
            applyLocally(params, store){
                store.state.activities = store.state.activities.filter(a => {
                    return params.indexOf(a) === -1;
                });
            },
            
            makeRequest(request, context, result){
                request().success(() => {
                    result.isSuccess();
                });
                
            }
            
        },
        
    },
    
    fetchers:{
        ACTIVITIES_BY_PERIOD: {
            
            loadedPeriods: [],
            
            makeRequest(request, context, result){
                
                let self = this;
                
                request().success(function() {
                    context.store.generateActivity();
                    result.isSuccess();
                    self.loadedPeriods.push(context.params);
                    
                });
            },
            
            isLoaded(params){
                return this.loadedPeriods.indexOf(params) !== -1;
            }
        }
    }
    
};


Object.assign(store, ajaxStore);

export default store;