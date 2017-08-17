import networking from './networking';
import Vue from 'vue'

export default class Store{
    
    constructor(__store){
        const state = typeof(__store.state) === 'object' ? __store.state : {};
        
        this._actions = typeof(__store.actions) === 'object' ? __store.actions : {};
        this._fetchers = typeof(__store.fetchers) === 'object' ? __store.fetchers : {};
        this.getters = {};
        
        const computed = {};
        let that = this;
        
        if(__store.getters) {
            
            for (let getter in __store.getters){
                if(__store.getters.hasOwnProperty(getter)){
                    computed[getter] = () => (...a) => __store.getters[getter](that, ...a);
                    Object.defineProperty(that.getters, getter, {
                        get: () => that._vm[getter],
                        enumerable: true
                    })
                }
            }
        }
        
        if(__store.methods){
            for(let method in __store.methods){
                if(__store.methods.hasOwnProperty(method)){
                    that[method] = __store.methods[method]
                }
            }
        }
        
        this._vm = new Vue({
            data: {
                $$state: state
            },
            computed,
        })
        
    }
    
    execute(actionName, params, callback){
        
        // 1) On recherche l'action à éxécuter
        let action = this._actions[actionName];
        
        // 2) On applique les modifications locales
        
        action.applyLocally(params, this);
        
        // 3) On crée un objet et on le passe à la queue
        
        networking.addToQueue({makeRequest: (...a) => { action.makeRequest(...a) }, context: {params, store: this}, callback});
    }
    
    fetch(fetcherName, params, callback){
        
        // 1) On recherche le fetcher à éxécuter
        
        let fetcher = this._fetchers[fetcherName];
        
        // Si les données sont déjà chargés, on appelle directement le callback
        
        if(fetcher.isLoaded(params)){
            if(callback !== undefined)
                callback();
        }else{
            networking.addToQueue({makeRequest: (...a) => { fetcher.makeRequest(...a) }, context: {params, store: this}, callback});
        }
        
    }
    
    get state () {
        return this._vm._data.$$state
    }
}