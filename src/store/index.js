import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: {}
  },
  mutations: {
    SET_POSTS (state, posts) {
      state.posts = posts
    }
  },
  actions: {
    async fetchPosts ({ commit }) {
      try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts')
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
    }
  },
  modules: {
  }
})
