import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'
import actionbar from '../store/actionbar'
import auth from '../store/auth'

import Activities from '../views/Activity/Activities.vue'
import PricingPolicies from '../views/PricingPolicies.vue'

import Members from '../views/Member/Members.vue'
import MemberViewer from '../views/Member/MemberViewer.vue'

Vue.use(VueRouter)

auth.initialize();

const router = new VueRouter({
    mode: 'history',
    routes: [
        {name: 'root', path: '/', component: Home},
      
        // Activities
        {name: 'activities', path: '/activites', component: Activities },
        {name: 'activity', path: '/activites/:period(\\d{4})/:id(\\d+)', component: Activities, props: true },
        {name: 'new_activity', path: '/activites/creer', component: Activities },
      
        // Princing policies
        {name: 'pricings', path:'/politiques-tarifaires', component: PricingPolicies},
      
        
        //Members
        {
            name: 'members', path: '/membres', component: Members,
            children: [
                {name: 'new_member', path: 'member_viewer/new', component: MemberViewer},
                {name: 'open_member', path: 'member_viewer/:id(\\d+)', component: MemberViewer, props: true}
            ]
        },
    
    
        // Auth
        {name: 'login', path: '/login', component: Login, meta: {layout: false}},
        {name: 'not_found', path: '*', component: NotFound},
        {name: 'register', path: '/register', component: Register},
    ]
});

router.afterEach((to, from) => {
    actionbar.actions = [];
    actionbar.showPeriodDropdown(false);
});

router.beforeEach((to, from, next) => { auth.checkRouteAuthorization(to, from, next) });

export default router
