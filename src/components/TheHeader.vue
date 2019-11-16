<template lang="pug">
.header
  .container
    .header__wrap
      .header__column
        .header__logo
          img.header__logo-icon(:src="Logo")
          span.header__logo-text Front-end Developer Test Task
      .header__column
        .header__cart
          span.header__cart-text cart
          span.header__cart-length(v-if="selectedProducts.length !== 0") {{ selectedProducts.length }}
          img.header__cart-icon(:src="Cart")
</template>

<script>
import Logo from '@/assets/img/icons/logo.svg';
import Cart from '@/assets/img/icons/cart.svg';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      Logo,
      Cart
    };
  },
  computed: {
    ...mapState(['selectedProducts'])
  }
};
</script>

<style lang="scss">
.header {
  padding: 12px 0;
  border-bottom: 1px solid transparent;
  background: #ffffff;
  &__wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__logo {
    display: flex;
    align-items: center;
    &-icon {
      margin-right: 10px;
    }
    &-text {
      font-family: 'HelveticaNeueThin';
      font-size: 26px;
      color: #5A1094;
    }
  }
  &__cart {
    position: relative;
    display: flex;
    align-items: flex-end;
    &-text {
      margin-right: 5px;
      font-size: 15px;
      color: #C90EA5;
    }
    &-length {
      position: absolute;
      top: -6px;
      right: -5px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15px;
      height: 15px;
      border: 1px solid #FFFFFF;
      border-radius: 50%;
      font-size: 9px;
      line-height: 10px;
      color: #ffffff;
      background: #C90EA5;
    }
  }
}
</style>