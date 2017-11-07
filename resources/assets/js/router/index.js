import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'
import actionbar from '../store/actionbar'
import auth from '../store/auth'

import Activity from '../components/Activity.vue'
import Activities from '../views/Activity/Activities.vue'
import PricingPolicies from '../views/PricingPolicies.vue'

import Members from '../views/Member/Members.vue'
import Member from '../components/Member.vue'

Vue.use(VueRouter)

auth.initialize();

const router = new VueRouter({
    mode: 'history',
    routes: [
        {name: 'root', path: '/', component: Home},
      
      
      
        {
          path: '/activites', component: Activities,
          children: [
              {name: 'activities', path: '', component: null },
              {name: 'activity', path: ':period(\\d{4})/:id(\\d+)', component: Activity },
              {name: 'new_activity', path: 'creer', component: Activity }
          ],
          
        },
      
        // Princing policies
        {name: 'pricings', path:'/politiques-tarifaires', component: PricingPolicies},
      
        
        //Members
        {
            path: '/membres', component: Members,
            children: [
                {name: 'members', path: '', component: null },
                {name: 'member', path: ':id(\\d+)', component: Member },
                {name: 'new_member', path: 'creer', component: Member }
            ]
        },
    
    
        // Auth
        {name: 'login', path: '/login', component: Login, meta: {layout: false}},
        {name: 'not_found', path: '*', component: NotFound},
        {name: 'register', path: '/register', component: Register, meta: {layout: false}},
    ],
    
    meta:{
        nav: [
            [
                {title: 'Activitiés', routes: ['activities', 'activity', 'new_activity']},
                {title: 'Politiques tarifaires', routes: ['pricings']}
            ]
        ]
    }
});

router.afterEach((to, from) => {
    actionbar.actions = [];
    actionbar.showPeriodDropdown(false);
});

router.beforeEach((to, from, next) => { auth.checkRouteAuthorization(to, from, next) });

export default router
