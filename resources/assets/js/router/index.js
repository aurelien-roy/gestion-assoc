import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'
import Activities from '../views/Activity/Activities.vue'
import Activity from '../views/Activity/Activity.vue'
import actionbar from '../store/actionbar'
import auth from '../store/auth'

Vue.use(VueRouter)

auth.initialize();

const router = new VueRouter({
	mode: 'history',
	routes: [
		{ name: 'root', path: '/', component: Home },
        { name: 'activities', path: '/activites', component: Activities},
        { name: 'new_activity', path: '/activites/new', component: Activity},
        { name: 'activity', path: '/activites/:id(\\d+)', component: Activity, props: true},
		{ name: 'register', path: '/register', component: Register },
		{ name: 'login', path: '/login', component: Login, meta: {layout: false} },
		{ name: 'not_found', path: '*', component: NotFound },
	]
})

router.afterEach((to, from) => {
    actionbar.actions = [];
});

router.beforeEach((to, from, next) => { auth.checkRouteAuthorization(to, from, next) });

export default router
