import Vue from 'vue'

import App from './App.vue'
import router from './router'

//require('sticky-position')

const app = new Vue({
	el: '#root',
	template: `<app></app>`,
	components: { App },
	router
})


// Import des composants pour les listes

import ActivityItem from './components/list/items/ActivityItem.vue'
import PricingPolicyItem from './components/list/items/PricingPolicyItem.vue'

Vue.component('ActivityItem', ActivityItem);
Vue.component('PricingPolicyItem', PricingPolicyItem);