import { rand, Time } from '../helpers/math'
import Store from '../helpers/store'
import Vue from 'vue'

export default new Store({
    
    state: {
        policies: {},
        virtualId: 0,
        types: {multiple_courses_discount: 1, advanced_payments_discount: 2, registration_fee: 3},
    },
    
    getters: {
        //Obtient une politique tarifaire grâce à l'identifiant
        get: (store, period, id) => {
            if(!store.state.policies[period]) return null;
            return store.state.policies[period].find(a => a.id === id);
        },
        
        policiesByPeriod: (store, period) => {
            let policies = store.state.policies[period]
            return policies !== undefined ? policies : [];
        },
        
    },
    
    methods: {
        
        //Génère une nouvelle politique tarifaire
        genPolicy() {
            return {
                id: undefined,
                num: 0,
                type: undefined,
                name: '',
                data: {},
                makeCopy() {
                    let copy = {};
                    Object.assign(copy, this);
                    Object.assign(copy.data, this.data);
                    return copy;
                }
            }
        },
        
        //Génère des politiques de test
        generatePolicy(period) {
            let types = [this.state.types.multiple_courses_discount, this.state.types.advanced_payments_discount, this.state.types.registration_fee];
            
            for (let i = 0; i < 10; i++) {
                
                let p = this.genPolicy();
                p.virtualId = this.state.virtualId++;
                p.id = this.state.policies[period].length;
                p.num = this.state.policies[period].length+1;
                p.name = 'Une politique';
                p.type = types[rand(0, 2)]
                
                this.state.policies[period].push(p);
            }
        }
        
    },
    
    actions:{
        
        CREATE_POLICY: {
            applyLocally(params, store){
                params.policy.virtualId = store.state.virtualId++;
                store.state.policies[params.period].push(params.policy);
            },
            
            makeRequest(request, context, result){
                request().success(() => {
                    context.params.policy.id = context.store.state.policies[context.params.period].length;
                    result.isSuccess();
                });
            }
        },
        
        EDIT_POLICY: {
            
            applyLocally(params, store){
                Object.assign(params.policies, params.changes);
            },
            
            makeRequest(request, context, result){
                request().success(() => {
                    result.isSuccess();
                });
            }
        },
        
        DELETE_POLICIES: {
            
            applyLocally(params, store){
                store.state.policies[params.period] = store.state.policies[params.period].filter(a => {
                    return params.policies.indexOf(a) === -1;
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
        POLICIES_BY_PERIOD: {
            
            loadedPeriods: [],
            
            makeRequest(request, context, result){
                
                let self = this;
                
                request().success(function() {
                    let period = context.params;
                    
                    Vue.set(context.store.state.policies, period, []);
                    context.store.generatePolicy(period);
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