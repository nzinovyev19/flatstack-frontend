<template lang="pug">
.wrapper
  TheHeader
  main.main
    .container
      OrderForm
</template>

<script>
import TheHeader from '@/components/TheHeader';
import OrderForm from '@/components/OrderForm';
export default {
  name: 'app',
  components: {
    TheHeader,
    OrderForm
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.main {
  padding: 60px 0;
}
</style>
