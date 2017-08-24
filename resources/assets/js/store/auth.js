export default {
	state: {
		token_type: null,
        expiration: null,
        access_token: null,
		refresh_token: null
	},
	initialize() {
		this.state.token_type = localStorage.getItem('token_type')
		this.state.expiration = parseInt(localStorage.getItem('expiration'))
        this.state.access_token = localStorage.getItem('access_token')
        this.state.refresh_token = localStorage.getItem('refresh_token')
	},
	set(token) {
		localStorage.setItem('token_type', token.token_type)
		localStorage.setItem('expiration', token.expiration)
		localStorage.setItem('access_token', token.access_token)
		localStorage.setItem('refresh_token', token.refresh_token)
		this.initialize()
	},
	remove() {
		localStorage.removeItem('token_type')
		localStorage.removeItem('expiration')
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
		this.initialize()
	},
	
	isAuthorized(){
		return this.state.access_token && this.state.expiration > Date.now();
	},
	
	checkRouteAuthorization(to, from, next){
		if(this.isAuthorized()){
			if(to.name === 'login')
            	next({ name: 'home'})
		}else{
			if(to.name !== 'login')
				next({name: 'login'});
		}
		
		next();
	}
}
