import networking from './networking';

export default {
    
    execute(actionName, params){
        
        // 1) On recherche l'action à éxécuter
        let action = this.actions[actionName];
        
        // 2) On applique les modifications locales
        
        action.applyLocally(params, this);
        
        // 3) On crée un objet et on le passe à la queue
        
        networking.addToQueue({makeRequest: (...a) => { action.makeRequest(...a) }, context: {params, store: this}});
    },
    
    fetch(fetcherName, params, callback){
        
        // 1) On recherche le fetcher à éxécuter
        
        let fetcher = this.fetchers[fetcherName];
        
        // Si les données sont déjà chargés, on appelle directement le callback
        
        if(fetcher.isLoaded(params)){
            if(callback !== undefined)
                callback();
        }else{
            networking.addToQueue({makeRequest: (...a) => { fetcher.makeRequest(...a) }, context: {params, store: this}});
        }
        
    }
}