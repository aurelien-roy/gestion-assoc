import { rand, Time } from '../helpers/math'
import Store from '../helpers/store'
import Vue from 'vue'

export default new Store({
    
    state: {
        activities: {},
    },
    
    getters: {
        //Obtient une activité grâce à l'identifiant
        get: (store, period, id) => {
            if(!store.state.activities[period]) return null;
            return store.state.activities[period].find(a => a.id === id);
        },
    
        activitiesByPeriod: (store, period) => {
            let activities = store.state.activities[period]
            return activities !== undefined ? activities : [];
        },
        
    },
    
    methods: {
    
        //Génère une nouvelle activitée
        genActivity() {
            return {
                id: undefined,
                members: [],
                name: '',
                level: '',
                age: '',
                day: undefined,
                time_begin: undefined,
                time_end: undefined,
                place: '',
                teacher: '',
                effectif_max: undefined,
                effectif_current: undefined,
                color: '',
                makeCopy() {
                    let copy = {};
                    Object.assign(copy, this);
                    return copy;
                }
            }
        },
    
        //Génère des activités de test
        generateActivity(period) {
            let act = ['Classique', 'Jazz', 'Street', 'Ragga', 'Eveil'];
            let nvx = ['', 'Adultes', '10-12 ans', '5-6 ans'];
            let clr = ['red', 'blue', 'yellow', 'green', 'aqua', 'purple', 'orange'];
        
            for (let i = 0; i < 10; i++) {
            
                let a = this.genActivity();
                a.id = this.state.activities[period].length;
                a.name = act[rand(0, 4)];
                a.age = nvx[rand(0, 3)];
                a.day = rand(0, 6);
                a.time_begin = new Time(rand(9, 16), 0);
                a.time_end = a.time_begin.clone().addHours(rand(1, 2));
                a.teacher = 'Jackie';
                a.color = clr[rand(0, 6)];
                
                this.state.activities[period].push(a);
            }
        }
    
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
                store.state.activities[params.period] = store.state.activities[params.period].filter(a => {
                    return params.activities.indexOf(a) === -1;
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
                    let period = context.params;
                    
                    Vue.set(context.store.state.activities, period, []);
                    context.store.generateActivity(period);
                    result.isSuccess();
                    self.loadedPeriods.push(period);
                    
                });
            },
            
            isLoaded(params){
                return this.loadedPeriods.indexOf(params) !== -1;
            }
        }
    }
    
});