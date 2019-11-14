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
          img.header__cart-icon(:src="Cart")
</template>

<script>
import Logo from '@/assets/img/icons/logo.svg';
import Cart from '@/assets/img/icons/cart.svg';
export default {
  data() {
    return {
      Logo,
      Cart
    };
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
    display: flex;
    align-items: flex-end;
    &-text {
      margin-right: 5px;
      font-size: 15px;
      color: #C90EA5;
    }
  }
}
</style>