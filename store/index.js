// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
import read_xlsx from '@/script/read_xlsx.js'
Vue.use(Vuex)
const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import { createStore } from 'vuex'

//console.log(c.toString())
const store = createStore({
// #endif
	state: {
		characters: read_xlsx('static/characters.xlsx')
	}
})


export default store