<template lang="pug">
.base-input-error
  .base-input-error__list
    .base-input-error__child(
      v-if="errorsObject.required === false"
    ) {{ localized('error.field.required') }}
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    errorsObject: Object
  },
  computed: {
    ...mapGetters('translations', ['localized']),
  }
};
</script>

<style lang="scss">
.base-input-error {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 0;
  border-radius: 5px;
  border: 1px solid rgba(222, 220, 220, 0.695907);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  background: #FFFFFF;
  &__child {
    position: relative;
    padding: 7px 12px;
    font-size: 13px;
    line-height: 16px;
    color: #D0021B;
    &:before, &:after {
      content: '';
      position: absolute;
      left: 20px; bottom: -20px;
      border: 10px solid transparent;
      border-top: 10px solid rgba(222, 220, 220, 0.695907);
    }
    &:after {
      border-top: 10px solid #FFFFFF;
      bottom: -19px;
    }
  }
}
</style>