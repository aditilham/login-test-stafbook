<template>
  <div class="absolute">
      <div class="opacity-80 !z-[90] bg-black fixed inset-0">
      </div>
      <div class="fixed inset-0 !z-[90] flex justify-center items-center" @click="closeModal">
          <div class="flex flex-col max-w-7xl rounded-2xl shadow-lg bg-white" @click.stop>
              <slot></slot>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
      name: "ModalPlain",
      props: {
          title: {
              type: String,
              required: true
          },
          styles: {
              type: String
          }
      },
      methods: {
          closeModal() {
              this.$emit('toggle-modal');
          }
      },
  }
</script>

<style>

</style>
