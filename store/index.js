// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import { createStore } from 'vuex'
import read_xlsx from '../script/read_xlsx.js'
const characters = read_xlsx.read_xlsx('../static/characters.xlsx')
const store = createStore({
// #endif
	state: {
		characters: characters
	}
})

export default store