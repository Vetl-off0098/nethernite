import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    popular: [],
    posts: {}
  },
  mutations: {
    SET_POPULAR (state, popular) {
      state.popular = popular
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
        console.log(err)
      }
    },
    async fetchPosts ({ commit }, param) {
      try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/${param}`)
        response = await response.json()
        commit('SET_POSTS', response)
      } catch (err) {
        console.log(err)
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
