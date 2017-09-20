import { rand, Time } from '../helpers/math'
import Store from '../helpers/store'
import Colors from '../helpers/colors'
import Vue from 'vue'

export default new Store({
    
    state: {
        activities: {},
        virtualId: 0
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
            
            let vId = this.state.virtualId++;
            
            return {
                id: undefined,
                virtualId: vId,
                members: [],
                name: '',
                level: '',
                age: '',
                schedules: [{day: undefined, time_begin: undefined, time_end: undefined}],
                place: '',
                teacher: '',
                effectif_max: undefined,
                effectif_current: undefined,
                color: 'red',
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
                a.virtualId = this.state.virtualId++;
                a.id = this.state.activities[period].length;
                a.name = act[rand(0, 4)];
                a.age = nvx[rand(0, 3)];
                a.schedules = [{
                    day: rand(0, 6),
                    time_begin: new Time(rand(9, 16), 0),
                    time_end: new Time(rand(17, 23), 0)
                }];
                a.teacher = 'Jackie';
                a.color = clr[rand(0, 6)];
                
                this.state.activities[period].push(a);
            }
        },
        
        encodeActivity(activity, period){
            let a = Object.assign({}, activity);
            
            if(period !== undefined) {
                a.period = period;
            }
            
            a.color = Colors.nameToHex(a.color);
            
            a.schedules.forEach(s => {
                s.day++;
                s.start = s.time_begin ? (s.time_begin.h + ':' + (s.time_begin.m < 10 ? '0' : '') + s.time_begin.m) : null
                s.end = s.time_end ? (s.time_end.h + ':' + (s.time_end.m < 10 ? '0' : '') + s.time_end.m) : null
            });
            
            return a;
        },
    
        decodeActivity(activity){
            let a = Object.assign(this.genActivity(), activity);
            
            a.color = Colors.hexToName(a.color);
        
            return a;
        }
    
    },
    
    actions:{
    
        CREATE_ACTIVITY: {
            applyLocally(params, store){
                console.log('create applied locally')
                params.activity.virtualId = store.state.virtualId++;
                store.state.activities[params.period].push(params.activity);
            },
    
            makeRequest(request, context, result){
                request('POST', 'activity', context.store.encodeActivity(context.params.activity, context.params.period)).then(() => {
                    context.params.activity.id = context.store.state.activities[context.params.period].length;
                    result.isSuccess();
                });
            }
        },
        
        EDIT_ACTIVITY: {
            
            applyLocally(params, store){
                Object.assign(params.activity, params.changes);
            },
            
            makeRequest(request, context, result){
                request('PATCH', 'activity/' + context.params.activity.id, context.store.encodeActivity(context.params.activity)).then(() => {
                    result.isSuccess();
                });
                
                result.isSuccess();
            }
        },
    
        DELETE_ACTIVITIES: {
            
            applyLocally(params, store){
                store.state.activities[params.period] = store.state.activities[params.period].filter(a => {
                    return params.activities.indexOf(a) === -1;
                });
            },
            
            makeRequest(request, context, result){
                request('DELETE', 'activity', {id: context.params.activity.id}).then(() => {
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
                
                request('GET', 'activity').then(function(response) {
                    let period = context.params;
                    
                    Vue.set(context.store.state.activities, period, []);
                    console.log(response);
                    if(response.data && Array.isArray(response.data.data)){
                        response.data.data.forEach((a) => {
                            context.store.state.activities[period].push(context.store.decodeActivity(a));
                        });
                    }
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