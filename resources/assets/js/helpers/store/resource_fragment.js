export default function(resource_name, plurial_resource_name) {
    return {
    
        state: {
            data: {},
            virtualId: 0,
            resource_name: [resource_name, plurial_resource_name]
        },
    
        getters: {

            getElement: (store, id, period) => {
                if (!store.state.data[period])
                    return null;
                return store.state.data[period].find(a => a.id === id);
            },

            getElements: (store, period) => {
                let data = store.state.data[period];
                return data !== undefined ? data : [];
            },
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
                    params['element'].virtualId = store.state.virtualId++;
                    store.state.data[params.period].push(params['element']);
                },
            
                makeRequest(request, context, result) {
                    request('POST', resource_name, context.store.encode(deepCopy(context.params['element']), context.params.period)).then((r) => {
                        context.params['element'].id = r.data.data.id;
                        result.isSuccess();
                    });
                }
            },
    
            EDIT: {
        
                applyLocally(params, store){
                    Object.assign(params['element'], deepCopy(params.changes));
                    store.normalize(params['element']);
                },
        
                makeRequest(request, context, result){
                    if (context.params.sendToServer) {
                        request('PATCH', resource_name + '/' + context.params['element'].id, context.store.encode(deepCopy(context.params.changes))).then(() => {
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
                        return params['elements'].indexOf(a) === -1;
                    });
                },
        
                makeRequest(request, context, result){
                    // TODO : Multi-DELETE
                    request('DELETE', resource_name + '/' + context.params['elements'][0].id).then(() => {
                        result.isSuccess();
                    });
            
                }
        
            },
        },
    
        fetchers: {}
    }
    
}