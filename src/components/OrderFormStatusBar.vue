<template lang="pug">
.order-form-status-bar
  .order-form-status-bar__list
    .order-form-status-bar__child(
      v-for="[value, key] in Object.entries(links)"
      :key="key"
    )
      button.order-form-status-bar__btn(
        @click="$router.push(key)"
        :disabled="true"
        :class="{ 'order-form-status-bar__btn_active': $route.path.substr(-key.length) === key }"
      ) {{value}}
      img.order-form-status-bar__icon(:src="Arrow")
</template>

<script>
import Arrow from '@/assets/img/icons/arrow.svg';
export default {
  props: {
    links: Object
  },
  data() {
    return {
      Arrow
    };
  }
};
</script>

<style lang="scss">
.order-form-status-bar {
  &__list {
    display: flex;
    align-items: center;
  }
  &__child {
    position: relative;
    &:not(:last-child) {
      margin-right: 40px;
      & .order-form-status-bar__icon {
        display: block;
      }
    }
  }
  &__btn {
    padding: 0;
    border: none;
    background: transparent;
    font-family: 'HelveticaNeueRoman';
    font-size: 12px;
    line-height: 14px;
    color: #979797;
    outline: none;
    cursor: pointer;
    &_active {
      color: #5A1094;
    }
  }
  &__icon {
    position: absolute;
    top: 50%;
    left: calc(100% + 12px);
    transform: translateY(-50%);
    display: none;
    width: 20px;
    height: 20px;
  }
}
</style>
