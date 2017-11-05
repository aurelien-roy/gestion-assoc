export default function(resource_name, plurial_resource_name) {
    return {
    
        state: {
            data: {},
            virtualId: 0
        },
    
        getters: {
            get: (store, id, period = "no_period") => {
                if (!store.state.data[period])
                    return null;
                return store.state.data[period].find(a => a.id === id);
            },
        
            byPeriod: (store, period) => {
                let data = store.state.data[period];
                return data !== undefined ? data : [];
            }
        },
    
        methods: {
            encode(resource, period){
                // To be defined in stores
            },
            
            decode(resource){
                // To be defined in stores
            },
            
            normalize(resource){
                // To be defined in stores
            }
        },
    
        actions: {
        
            CREATE: {
                applyLocally(params, store) {
                    params[resource_name].virtualId = store.state.virtualId++;
                    store.state.data[params.period].push(params[resource_name]);
                },
            
                makeRequest(request, context, result) {
                    request('POST', resource_name, context.store.encode(deepCopy(context.params[resource_name]), context.params.period)).then(() => {
                        context.params[resource_name].id = context.store.state.data[context.params.period].length;
                        result.isSuccess();
                    });
                }
            },
    
            EDIT: {
        
                applyLocally(params, store){
                    Object.assign(params[resource_name], deepCopy(params.changes));
                    store.normalize(params[resource_name]);
                },
        
                makeRequest(request, context, result){
                    if (context.params.sendToServer) {
                        request('PATCH', resource_name + '/' + context.params[resource_name].id, context.store.encode(deepCopy(context.params.changes))).then(() => {
                            result.isSuccess();
                        });
                    } else {
                        result.isSuccess();
                    }
            
                }
            },
    
            DELETE: {
        
                applyLocally(params, store){
                    store.state.data[params.period] = store.state.data[params.period].filter(a => {
                        return params[plurial_resource_name].indexOf(a) === -1;
                    });
                },
        
                makeRequest(request, context, result){
                    // TODO : Multi-DELETE
                    request('DELETE', resource_name + '/' + context.params[plurial_resource_name][0].id).then(() => {
                        result.isSuccess();
                    });
            
                }
        
            },
        },
    
        fetchers: {}
    }
    
}