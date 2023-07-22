import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vue3GoogleLogin from 'vue3-google-login'
import './index.css'

router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth && !store.getters.auth_token) {
      var token = ('; '+document.cookie).split(`; user_access_token=`).pop().split(';')[0]
      if ( typeof token === 'undefined' || token === null || token == '' ) {
          next({name: 'LoginPage'})
      }
      else  {
          store.dispatch('setToken', token)
          sessionStorage.setItem('user_access_token', token)
          next()
      }
  } else {
      if (to.meta.menu != undefined) {
          next()
      } else if (to.meta.menu == undefined) {
          next()
      } else {
          next({ name: 'errornotfound', params: { catchAll: 'not-found' } })
      }
  }
})

const app = createApp(App)
let gauthClientid = '22281155287-2q2pmubr564qv48em0mad7448mg764m6.apps.googleusercontent.com'
app.use(store)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: gauthClientid
})
app.mount("#app")
