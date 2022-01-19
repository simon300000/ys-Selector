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
		characters: read_xlsx('static/characters.xlsx'),
    challanger: '',
    challangee: '',
    bottom: [],
    seq: []
	},
  getters: {
    getChallanger: state => {
      var rand = Math.floor(Math.random()*state.characters.length)
      return state.characters[rand]
    },
    getChallangee: state => {
      //var rand = Math.floor(Math.random()*state.characters.length)
      return state.characters[1]
    }
  },
  mutations: {
    removeCharacter (state, character) {
      for (var i=0; i < state.characters.length; i++) {
        if (state.characters[i] === character) {
          state.characters.splice(i, 1)
        }
      }
    },
    addToBottom (state, character) {
      state.characters.push(character)
    },
    addToSeq (state, character, n) {
      state.characters.splice(n, 0, [character])
    },
    addToSeqTie (state, character, n) {
      state.characters[n].push(character)
    },
    setChallangee (state, n) {
      state.challangee = state.seq[n][0]
    },
    initChallanger (state) {
      state.challanger = state.characters[0]
    },
    initChallangee (state) {
      state.challangee = state.characters[1]
    }
  }
})


export default store