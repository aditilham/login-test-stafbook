<template>
  <div>
    Home
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    logout() {
      this.$store.dispatch("destroyToken").then(() => {
        this.$router.push({ name: "LoginPage" });
      });
    },
  },
}
</script>
