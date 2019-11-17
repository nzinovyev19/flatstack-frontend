<template lang="pug">
.base-input
  .base-input__label
    BaseInputMask(
      v-if="mask"
      @input="$emit('input', $event)"
      :mask="mask"
      :type="type"
      :class="inputClasses"
      :value="modelValue"
      :masked="masked"
      :disabled="disabled"
      :placeholder="placeholder"
      class="base-input__input"
    )
    BaseInputSelect(
      v-else-if="type === 'select'"
      @input="$emit('input', $event)"
      :type="type"
      :label="label"
      :value="modelValue"
      :reduce="reduce"
      :isError="isError"
      :options="options"
      :disabled="disabled"
      :placeholder="placeholder"
    )
    input.base-input__input(
      v-else
      @input="$emit('input', $event.target.value)"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :class="inputClasses"
    )
    BaseInputErrors(
      v-if="isError"
      :errorsObject="errorsObject"
    )
  .base-input__descr(
    v-if="this.$slots.descr"
    :class="{ 'base-input__descr_justify': modifier === 'descrJustify' }"
  )
    slot(
      name="descr"
    )
</template>

<script>
import BaseInputSelect from '@/components/BaseInputSelect';
import BaseInputErrors from '@/components/BaseInputErrors';
export default {
  components: {
    BaseInputErrors,
    BaseInputSelect
  },
  model: {
    prop: 'modelValue',
  },
  props: {
    id: String,
    type: String,
    mask: String,
    value: String,
    descr: {
      type: Boolean,
      default: true
    },
    label: String,
    height: Number,
    accept: String,
    format: String,
    reduce: Function,
    prompts: Array,
    options: Array,
    masked: Boolean,
    maxSize: Number,
    preview: String,
    isError: Boolean,
    modifier: String,
    disabled: Boolean,
    inputWidth: String,
    staticValue: String,
    placeholder: String,
    errorsObject: Object,
    checkboxValue: Boolean,
    isLoaderActive: Boolean,
    trueValue: {
      type: [Boolean, String],
      default: true
    },
    falseValue: {
      type: [Boolean, String],
      default: false
    },
    modelValue: [Array, File, String, Number, Object, Boolean]
  },
  computed: {
    inputClasses() {
      return {
        'base-input__input_disabled': this.disabled,
        'base-input__input_error': this.isError
      };
    }
  }
};
</script>

<style lang="scss">
.base-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  &_ordered {
    & .base-input__descr {
      margin: 0;
    }
  }
  &__label {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }
  &__input {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    border: 1px solid #DEDCDC;
    border-radius: 5px;
    font-family: 'HelveticaNeueLight';
    font-size: 17px;
    background: #ffffff;;
    color: #000000;
    transition: 0.3s;
    outline: none;
    &::placeholder {
      color: #6B6B6B;
    }
    &:hover {
      border: 1px solid #E6E9F0;
    }
    &:focus {
      border: 1px solid #5A1094;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      box-shadow: 0 0 0 30px #FFFFFF inset;
    }
    &_error {
      border: 2px solid #EB5757;
      &:focus {
        border: 2px solid #EB5757;
      }
    }
    &_disabled {
      &:hover {
        border: 2px solid #F2F2F2;
      }
    }
  }
  &__prompts {
    width: 100%;
    padding: 12px 24px;
    border: 1px solid #F2F2F2;
    box-shadow: 0px 24px 34px rgba(0, 0, 0, 0.13);
    border-radius: 24px;
    cursor: pointer;
    &-child {
      &:not(:first-child) {
        margin-top: 5px;
        padding-top: 5px;
        border-top: 1px solid #F2F2F2;
      }
    }
  }
  &__checkbox {
    &-value {
      font-size: 14px;
      line-height: 20px;
      color: #828282;
    }
    &-currency {
      margin-right: 10px;
      font-size: 18px;
      line-height: 20px;
      text-transform: uppercase;
      color: #000000;
    }
  }
  &__descr {
    position: absolute;
    top: 50%;
    left: calc(100% + 10px);
    transform: translateY(-50%);
    width: 100px;
    margin: 0;
    margin-left: 10px;
    font-size: 13px;
    line-height: 16px;
    color: #A9A9A9;
    &_justify {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      height: 100%;
    }
    & p {
      margin: 0;
    }
  }
  &__loader {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
  &__btn {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }
}
</style>