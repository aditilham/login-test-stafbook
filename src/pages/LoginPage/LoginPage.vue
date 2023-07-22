<template>
  <main class="min-h-screen lg:login phone-login">
    <div class="flex flex-col lg:flex-row min-h-screen w-full justify-top lg:justify-end items-center">
      <LoginLogo class="w-full flex lg:w-6/12 h-full justify-center items-center lg:pl-20 lg:ml-10 lg:mb-2" />
      <div class="w-full lg:w-6/12 h-full flex justify-center items-center py-10 font-sans">
          <div class="w-4/5 lg:w-3/5 h-full bg-white rounded-md p-10 flex flex-col justify-between space-y-20 border shadow-md">
            <div class="flex flex-col">
              <div class="hidden lg:flex w-full justify-center">
                <img src="../../assets/img/trading-stock-market.png" alt="">
              </div>
              <p class="font-semibold pb-5" data-cy="form-text-title">
                Login
              </p>
              <button class="py-4 border rounded-lg flex justify-center items-center space-x-3 group transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-md" @click="login">
                <google-icon class="w-7 h-7" />
                <span>
                  Sign-in With Google
                </span>
              </button>
              </div>
          </div>
        </div>
    </div>
  </main>
</template>

<script>
import { googleTokenLogin } from "vue3-google-login"
import LoginLogo from '@/components/LoginLogo/LoginLogo.vue';
import GoogleIcon from '@/components/Icon/googleIcon.vue';
export default {
  name: 'LoginPage',
  components: {
    LoginLogo,
    GoogleIcon
  },

  data() {
      return {
    }
  },

  methods: {
    login() {
      googleTokenLogin().then((response) => {
        this.$store.dispatch('setToken', response)
        .then(() => {
          this.$router.push({ name: "IbmStock" })
        })
      })
      .catch(() => {
      })
    }
  },
  computed: {
  }
};
</script>

<style scoped>
</style>
