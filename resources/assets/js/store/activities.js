import { rand, Time } from '../helpers/math'
import Store from '../helpers/store/store'
import resource_fragment from '../helpers/store/resource_fragment'
import Colors from '../helpers/colors'
import Vue from 'vue'

export default new Store({
    
    methods: {
    
        //Génère une nouvelle activitée
        genNewStruct() {
            console.log(this);
            let vId = this.state.virtualId;
            this.state.virtualId++;
            
            return {
                id: undefined,
                virtualId: vId,
                members: [],
                name: '',
                level: '',
                age: '',
                schedules: [],
                place: '',
                teacher: '',
                effectif_max: undefined,
                effectif_current: undefined,
                color: 'red'
            }
        },
    
        //Génère des activités de test
        generateActivity(period) {
            /*let act = ['Classique', 'Jazz', 'Street', 'Ragga', 'Eveil'];
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
             }*/
        },

        encode(activity, period){
            
            if(period !== undefined) {
                activity.period = period;
            }

            if (activity.color)
                activity.color = Colors.nameToHex(activity.color);

            if (activity.schedules)
                activity.schedules.forEach(s => {
                    s.day++;
                    s.start = s.time_begin ? (s.time_begin.h + ':' + (s.time_begin.m < 10 ? '0' : '') + s.time_begin.m) : null
                    s.end = s.time_end ? (s.time_end.h + ':' + (s.time_end.m < 10 ? '0' : '') + s.time_end.m) : null
                });
            
            return activity;
        },

        decode(activity){
            let a = Object.assign(this.genNewStruct(), activity);
            
            a.color = Colors.hexToName(a.color);

            if (a.schedules.data) {
                a.schedules = a.schedules.data;
                a.schedules.forEach(s => {
                    s.day--;
                    s.start = s.start.split(":");
                    s.end = s.end.split(":");
                    s.time_begin = new Time(Number(s.start[0]), Number(s.start[1]));
                    s.time_end = new Time(Number(s.end[0]), Number(s.end[1]));

                    delete s.start;
                    delete s.end;
                    delete s.id;
                });
            }

            return a;
        },
        
        normalize(activity){
            activity.schedules.sort((a, b) => {
                if(a.day !== b.day){
                    return a.day - b.day;
                }else{
                    return a.time_begin.compare(b.time_begin);
                }
            });
        }
    
    },
    
    actions:{
        
    },
    
    fetchers:{
        BY_PERIOD: {
            
            loadedPeriods: [],
            
            makeRequest(request, context, result){
                
                let self = this;
                
                request('GET', 'activity').then(function(response) {
                    let period = context.params;

                    Vue.set(context.store.state.data, period, []);
                    if(response.data && Array.isArray(response.data.data)){
                        response.data.data.forEach((a) => {
                            context.store.state.data[period].push(context.store.decode(a));
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
    
}, [resource_fragment('activity', 'activities')]);