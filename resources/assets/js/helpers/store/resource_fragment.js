export default {
    
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
    
    },
    
    actions: {
    
    },
    
    fetchers: {
    
    }
    
    
}