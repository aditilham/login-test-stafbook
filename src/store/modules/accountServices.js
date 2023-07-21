const state = {
  auth_token: null,
}

const getters = {
  auth_token: state => state.auth_token,
}

const actions = {
  setToken({commit}, data) {
    return new Promise((resolve, reject) => {
      try {
        sessionStorage.setItem('user_access_token', data.access_token);
        document.cookie = "user_access_token=" + data.access_token + "; expires=0; path=/;";
        commit('setUserToken', data.access_token);
        resolve()
      } catch {
        reject()
      }
    })
  },
  async destroyToken({ commit }) {
    sessionStorage.removeItem('user_access_token')
    document.cookie = "user_access_token=; expires=0; path=/;";
    commit('destroyToken')
},

}

const mutations = {
  setUserToken: (state, token) => {
    state.auth_token = token
  },
  destroyToken: (state) => state.auth_token = null,

}

export default {
  state,
  getters,
  actions,
  mutations
}
