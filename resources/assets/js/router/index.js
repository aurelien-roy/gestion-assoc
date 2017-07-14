import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'
import Activities from '../views/Activity/Activities.vue'
import actionbar from '../store/actionbar'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/', component: Home },
		{ path: '/activites', component: Activities },
		{ path: '/register', component: Register },
		{ path: '/login', component: Login },
		{ path: '/not-found', component: NotFound },
		{ path: '*', component: NotFound }
	]
})

router.afterEach((to, from) => {
    actionbar.length = 0;
})

export default router
