import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import http from "@/assets/js/request.js"
import sCorde from '@/assets/js/scqer.js'
import 'vant/lib/index.css'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import router from './router'
import FastClick from 'fastclick'
FastClick.attach(document.body)
Vue.use(Vant)
import {Lazyload} from 'vant';
Vue.use(Lazyload, {
	loading: '../static/img/logo.png',
	attempt: 3
})
Vue.use(Vant)
Vue.prototype.$api=http;
Vue.prototype.$scode=sCorde;
Vue.config.productionTip = false
require('es6-promise').polyfill()
Es6Promise.polyfill()
Vue.filter('Admin', function (val) { 
  return `${val.slice(0, 3)}****${val.slice(-4)}`
})
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
