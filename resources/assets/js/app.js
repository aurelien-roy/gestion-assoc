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
