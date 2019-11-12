<template lang="pug">
.order-form
  .order-form__column
    .order-form__breadcrumbs
      OrderFormBreadcrumbs
    .order-form__info
      .order-form__title Shipping Info
      .order-form__child
        .order-form__child-title Recipient
        .order-form__child-input
          BaseInput

        .order-form__child-input
          BaseInput
      .order-form__child
        .order-form__child-title Address
  .order-form__column.order-form__column_dark
</template>

<script>
import OrderFormBreadcrumbs from '@/components/OrderFormBreadcrumbs';
export default {
  components: {
    OrderFormBreadcrumbs
  }
};
</script>

<style lang="scss">
.order-form {
  display: flex;
  background: linear-gradient(180deg, #FFFFFF 0%, #FEFEFE 100%);
  box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.07);
  border-radius: 5px;
  &__title {
    font-size: 26px;
    line-height: 31px;
  }
  &__column {
    width: 60%;
    padding: 20px 40px;
    background: #FFFFFF;
    &_dark {
      width: 40%;
      padding: 20px 5px;
      background: #E6E9F0;
    }
  }
  &__child {
    margin-top: 20px;
    &-title {
      font-size: 16px;
      line-height: 18px;
    }
  }
}
</style>