import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    popular: [],
    info: {},
    package: {}
  },
  mutations: {
    SET_POPULAR (state, popular) {
      state.popular = popular
    },
    SET_INFO (state, info) {
      state.info = info
    },
    SET_PACKAGE (state, response) {
      state.package = response
    }
  },
  actions: {
    async fetchPopular ({ commit }) {
      try {
        let response = await fetch('https://data.jsdelivr.com/v1/stats/packages')
        response = await response.json()
        commit('SET_POPULAR', response)
      } catch (err) {
        console.error(err)
      }
    },
    async fetchInfo ({ commit }, param) {
      try {
        let response = await fetch(`https://data.jsdelivr.com/v1/package/npm/${param}/stats`)
        response = await response.json()
        commit('SET_INFO', response)
      } catch (err) {
        console.error(err)
      }
    },
    async fetchPackage ({ commit }, param) {
      try {
        let response = await fetch(`https://data.jsdelivr.com/v1/package/npm/${param}`)
        response = await response.json()
        commit('SET_PACKAGE', response)
      } catch (err) {
        console.error(err)
      }
    }
  },
  getters: {
    getPopular: state => {
      return state.popular
    }
  },
  modules: {
  }
})
