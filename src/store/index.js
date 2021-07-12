import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    popular: [],
    info: {},
    posts: {}
  },
  mutations: {
    SET_POPULAR (state, popular) {
      state.popular = popular
    },
    SET_INFO (state, info) {
      state.info = info
    },
    SET_POSTS (state, posts) {
      state.posts = posts
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
        let response = await fetch(`https://data.jsdelivr.com/v1/package/${param}`)
        response = await response.json()
        commit('SET_INFO', response)
      } catch (err) {
        console.error(err)
      }
    },
    async fetchPosts ({ commit }, param) {
      try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/${param}`)
        response = await response.json()
        commit('SET_POSTS', response)
      } catch (err) {
        console.error(err)
      }
    }
  },
  getters: {
    getPosts: state => {
      return state.posts
    },
    getPopular: state => {
      return state.popular
    }
  },
  modules: {
  }
})
