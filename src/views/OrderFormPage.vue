<template lang="pug">
.order-form
  .order-form__column
    .order-form__breadcrumbs
      OrderFormStatusBar(
        :links="links"
      )
    .order-form__info
      RouterView
  .order-form__column.order-form__column_dark
    OrderFormCart
</template>

<script>
import OrderFormCart from '@/components/OrderFormCart';
import OrderFormStatusBar from '@/components/OrderFormStatusBar';
export default {
  components: {
    OrderFormCart,
    OrderFormStatusBar
  },
  data() {
    return {
      links: {
        Shipping: '/',
        Billing: 'billing',
        Payment: 'payment'
      }
    };
  }
};
</script>

<style lang="scss">
.order-form {
  display: flex;
  background: linear-gradient(180deg, #FFFFFF 0%, #FEFEFE 100%);
  box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.07);
  border-radius: 5px;
  &__column {
    width: 60%;
    padding: 20px 40px;
    background: #FFFFFF;
    &_dark {
      width: 40%;
      padding: 20px 12px;
      background: #F3F4F7;
    }
  }
  &__info {
    margin-top: 20px;
  }
}
</style>