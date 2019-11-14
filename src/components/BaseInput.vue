<template lang="pug">
.base-input
  .base-input__label
    input.base-input__input(
      @input="$emit('input', $event.target.value)"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :class="{'base-input__input_error': isError}"
    )
    BaseInputErrors(
      v-if="isError"
      :errorsObject="errorsObject"
    )
    .base-input__prompts(
      v-if="prompts && prompts.length !== 0"
    )
      .base-input__prompts-child(
        v-for="prompt in prompts"
        :key="prompt.place_id"
        @click="$emit('select-address', prompt)"
      ) {{ prompt.formatted_address }}
  .base-input__descr(
    v-if="this.$slots.descr"
    :class="{ 'base-input__descr_justify': modifier === 'descrJustify' }"
  )
    slot(
      name="descr"
    )
</template>

<script>
import BaseInputErrors from '@/components/BaseInputErrors';
export default {
  components: {
    BaseInputErrors,
  },
  model: {
    prop: 'modelValue'
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
    height: Number,
    accept: String,
    format: String,
    prompts: Array,
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
    &_worktime {
      padding: 0;
      text-align: center;
      font-size: 14px;
      line-height: 20px;
      color: #000000;
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
}
</style>