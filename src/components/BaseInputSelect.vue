<template lang="pug">
BaseInputSelect(
  @input="$emit('input', $event)"
  :type="type"
  :label="label"
  :class="inputClasses"
  :value="value"
  :reduce="reduce"
  :options="options"
  :placeholder="placeholder"
)
</template>

<script>
export default {
  props: {
    type: String,
    label: String,
    value: String,
    reduce: Function,
    options: Array,
    isError: Boolean,
    disabled: Boolean,
    placeholder: String,
  },
  computed: {
    inputClasses() {
      return {
        'vs--disabled': this.disabled,
        'vs--error': this.isError
      };
    }
  }
};
</script>

<style lang="scss">
$vs-state-active-bg: #E6E9F0 !default;
$vs-state-active-color: #000000 !default;
@import 'vue-select/src/scss/vue-select.scss';
.v {
  &-select {
    display: flex;
    width: 100%;
    min-height: 40px;
    font-size: 16px;
    line-height: 18px;
  }
}
.vs {
  &--open {
    & .vs__dropdown-toggle {
      border-radius: 0 0 5px 5px;
      border-color: #DEDCDC;
    }
  }
  &--error {
    & .vs__dropdown-toggle {
      border: 2px solid #EB5757;
    }
  }
  &__dropdown-toggle {
    width: 100%;
  }
  &__dropdown-menu {
    top: auto;
    width: 100%;
    bottom: calc(100% - 1px);
    border: 1px solid #DEDCDC;
    border-radius: 5px 5px 0 0;
    box-shadow: 0px -3px 7px rgba(0, 0, 0, 0.05);
    overflow-x: hidden;
  }
  &__dropdown-option {
    white-space: normal;
  }
  &__selected-options {
    flex-wrap: nowrap;
    padding: 0 0 0 8px;
  }
  &__selected, &__search {
    font-family: 'HelveticaNeueLight';
    font-size: 17px;
    color: #000000;
  }
}
</style>