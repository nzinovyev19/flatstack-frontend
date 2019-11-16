<template lang="pug">
.order-form-cart-item
  .order-form-cart-item__column
    img.order-form-cart-item__img(:src="image")
    .order-form-cart-item__list
      h3.order-form-cart-item__child.order-form-cart-item__child_title {{ product.name }}
      .order-form-cart-item__list-descr
        p.order-form-cart-item__child {{ product.descr }}
        p.order-form-cart-item__child Quantity: {{ product.quantity }}
  .order-form-cart-item__column
    span.order-form-cart-item__price {{ parsePrice(product.price) }}
</template>

<script>
import ProductPlaceholder from '@/assets/img/icons/product-placeholder.svg';
import { parsePrice } from '@/mixins';
export default {
  mixins: [parsePrice],
  props: {
    product: Object
  },
  data() {
    return {
      ProductPlaceholder
    };
  },
  computed: {
    image() {
      if (!this.product.image) return ProductPlaceholder;
      // TODO created imgPath
      const imgPath = this.$axios.defaults.baseURL + this.product.image;
      return imgPath;
    }
  }
};
</script>

<style lang="scss">
.order-form-cart-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  &__img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #E3E3E3;
    border-radius: 1px;
  }
  &__list {
    &-descr {
      margin-top: 8px;
    }
  }
  &__child {
    margin: 0;
    font-size: 10px;
    color: #2B2525;
    &_title {
      font-family: 'HelveticaNeueRoman';
      font-size: 12px;
      color: #777879;
    }
  }
  &__price {
    font-size: 12px;
    color: #777879;
  }
  &__column {
    display: flex;
  }
}
</style>