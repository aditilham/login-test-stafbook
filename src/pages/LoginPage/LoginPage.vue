<template>
  <div>
    login page
    <button @click="login">Login Using Google</button>
  </div>
</template>

<script>
import { googleTokenLogin } from "vue3-google-login"
export default {
  name: "LoginPage",
  methods: {
    login() {
      googleTokenLogin().then((response) => {
        this.$store.dispatch('setToken', response)
        .then(() => {
          this.$router.push({ name: "IbmStock" })
        })
      })
    }
  },
}
</script>
