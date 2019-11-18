<template lang="pug">
.order-form-cart
  .order-form-cart__top
    h2.order-form-cart__title Order summary
    .order-form-cart__list(
      v-if="selectedProducts"
    )
      OrderFormCartItem(
        v-for="product in selectedProducts"
        :key="product.id"
        :product="product"
        class="order-form-cart__child"
      )
      .order-form-cart__child
        .order-form-cart__info-row
          span.order-form-cart__info-data Subtotal
          span.order-form-cart__info-data {{ parsePrice(orderSummary) }}
        .order-form-cart__info-row
          span.order-form-cart__info-data Shipping
          span.order-form-cart__info-data {{ parsePrice(shipping) }}
        .order-form-cart__info-row
          span.order-form-cart__info-data Taxes
          span.order-form-cart__info-data {{ parsePrice(taxes) }}
      .order-form-cart__child
        .order-form-cart__info-row
          span.order-form-cart__info-data.order-form-cart__info-data_bold Total
          span.order-form-cart__info-data.order-form-cart__info-data_bold {{ parsePrice(total) }}
  .order-form-cart__bottom
    .order-form-cart__conditions All purchases are subject to our Terms and Conditions.
</template>

<script>
import OrderFormCartItem from '@/components/OrderFormCartItem';
import { mapState } from 'vuex';
import { parsePrice } from '@/mixins';
export default {
  components: {
    OrderFormCartItem
  },
  mixins: [parsePrice],
  data() {
    return {
      shippingValue: 10,
      taxesValue: 15
    };
  },
  computed: {
    ...mapState(['selectedProducts']),
    orderSummary() {
      return this.selectedProducts.reduce((accumulator, currentValue) => accumulator + +currentValue.price, 0);
    },
    isShippingPay() {
      return this.orderSummary < 300
        ? true
        : false;
    },
    shipping() {
      return this.isShippingPay
        ? this.shippingValue
        : 'Free';
    },
    taxes() {
      return this.orderSummary * this.taxesValue / 100;
    },
    total() {
      return this.isShippingPay
        ? this.orderSummary + this.taxes + this.shippingValue
        : this.orderSummary + this.taxes;
    }
  },
  // methods: {
  //   parsePrice(value) { return helpers.parsePrice(value); }
  // }
};
</script>

<style lang="scss">
.order-form-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  &__top {
    width: 100%;
  }
  &__bottom {
    margin-top: 20px;
  }
  &__title {
    margin: 0;
    font-size: 16px;
    line-height: 18px;
    color: #5A1094;
  }
  &__list {
    margin-top: 14px;
  }
  &__child {
    &:not(:last-child) {
      padding-bottom: 12px;
      border-bottom: 1px solid #979797;
      margin-bottom: 12px;
    }
  }
  &__info {
    &-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 12px;
      color: #777879;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    &-data {
      &_bold {
        font-family: "HelveticaNeueBold";
        font-size: 12px;
        color: #431C5D;
      }
    }
  }
  &__conditions {
    font-size: 10px;
    color: #9C9C9C;
  }
}
</style>