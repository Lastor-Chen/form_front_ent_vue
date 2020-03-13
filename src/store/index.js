import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }

      state.isAuthenticated =true
    }
  },
  actions: {
    async fetchCurrentUser() {
      try {
        const { data } = await usersAPI.getCurrentUser()
        this.commit('setCurrentUser', data)

      } catch(err) {
        console.log(err)
      }
    }
  },
  modules: {
  }
})
