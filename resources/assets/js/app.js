require('./helpers/util.js')

import Vue from 'vue'

import App from './App.vue'
import router from './router'


// Import des composants courants

import Dialog from './components/Dialog.vue'
import Modal from './components/Modal.vue'

Vue.component('Dialog', Dialog);
Vue.component('Modal', Modal);


// Import des composants pour les listes

import ActivityItem from './components/list/items/ActivityItem.vue'
import PricingPolicyItem from './components/list/items/PricingPolicyItem.vue'

Vue.component('ActivityItem', ActivityItem);
Vue.component('PricingPolicyItem', PricingPolicyItem);


const app = new Vue({
	el: '#root',
	template: `<app></app>`,
	components: { App },
	router
})


