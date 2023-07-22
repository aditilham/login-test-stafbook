<template>
  <header class="w-full flex">
    <div class="bg-white  w-full flex-auto max-h-20 min-h-20 h-20 shadow-inner border-b">
      <div class="flex flex-row justify-between items-center px-5 md:px-10 py-3 h-full">
        <div class="flex lg:flex flex-row justify-between items-center w-full px-1 lg:px-5">
          <div class="lg:w-full md:w-full relative">
            <img src="../../assets/img/trading-stock-market.png" alt="">
            <div class="bg-gray-100  absolute w-full z-50 p-5 mt-3.5 hidden">
            </div>
          </div>

          <div class="flex flex-row justify-end items-center lg:w-2/4 md:w-full space-x-3">
            <div class="w-52 flex flex-row justify-end items-center relative">
              <img @click="profile" class="rounded-full w-5 lg:w-10 h-5 lg:h-10 mr-4 border-[1px] cursor-pointer" src="../../assets/img/tsm.png" alt="">
                <div id="profile-body" class="hidden bg-white absolute z-50 p-4 w-full top-0 mt-12 rounded-b-lg shadow-xl cursor-default">
                  <button @click.stop="toggleModal" class="flex items-center space-x-2 p-2 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <ModalPlain v-if="isVisibility" @toggle-modal="toggleModal" title="">
      <div class="p-5 text-center">
        <p class="pt-5 px-5 text-xl font-semibold text-gray-700">Log out</p>
        <p class="pb-5 px-5 text-base text-gray-700">Are you sure you want to Log out?</p>
      </div>
      <div class="flex justify-end items-center px-5 space-x-2 border-t-2">
        <button @click="toggleModal" class="text-blue-500 py-5 px-12 border-r-2">Cancel </button>
        <button @click="logout" class="text-blue-500 py-5 px-12">Log out</button>
      </div>
    </ModalPlain>
  </header>
</template>

<script>
import $ from 'jquery'
import ModalPlain from '../Modal/ModalPlain.vue'

export default {
  props: {
  },
  name: 'HeaderComponent',
  components: {
    ModalPlain,
  },
  data() {
    return {
      show: true,
      isVisibility: false,
    }
  },
  methods: {
    profile() {
      const dropDown = $('#profile-body');
      dropDown.hasClass("hidden") ? dropDown.removeClass("hidden") : dropDown.addClass("hidden");
    },
    logout() {
      this.$store.dispatch('destroyToken').then(() => {
        this.$router.push({ name: "LoginPage" });
      })
    },
    toggleModal() {
      const dropDown = $('#profile-body');
      dropDown.hasClass("hidden") ? `` : dropDown.addClass("hidden");
      this.isVisibility = !this.isVisibility;
      this.$emit('checkOpenModal')
      sessionStorage.setItem('oMLg', this.isVisibility )
    },
  },
  computed: {
  },
  mounted() {
  }
}
</script>

<style>

</style>
