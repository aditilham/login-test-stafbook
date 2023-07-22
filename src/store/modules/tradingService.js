import axios from 'axios'
const BASE_URL = process.env.VUE_APP_URL_PRODUCTION;
// const BASE_URL = process.env.VUE_APP_DEBUG == 'true' ? process.env.VUE_APP_URL_DEBUG : process.env.VUE_APP_URL_PRODUCTION;

const state = {
  tradingData: null,
}

const getters = {
  tradingData: state => state.tradingData,
}

const actions = {
  fetchTradingData({ commit }, query) {
    return new Promise((resolve, reject) => {
      axios.get(BASE_URL + '/v5/market/kline', {
        params: query
      }).then(response => {
          commit('setTradingData', response.data)
          resolve(response.data)
      }).catch( error => {
          reject(error)
      })
    })
  },
}

const mutations = {
  setTradingData: (state, token) => {
    state.tradingData = token
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
