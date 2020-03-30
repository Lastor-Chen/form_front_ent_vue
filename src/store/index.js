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
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.token = localStorage.getItem('token')
      state.isAuthenticated =true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.token = ''
      localStorage.removeItem('token')
      state.isAuthenticated = false
    }
  },
  actions: {
    async fetchCurrentUser() {
      try {
        const { data } = await usersAPI.getCurrentUser()
        this.commit('setCurrentUser', data)

        return true
      } catch(err) {
        console.error(err)
        this.commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
