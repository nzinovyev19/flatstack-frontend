<template lang="pug">
.base-input-cards
  BaseInputMask(
    @input="handleInput($event)"
    class="base-input-cards__input"
    :mask="mask"
    :type="type"
    :value="value"
    :class="inputClasses"
    :masked="masked"
    :disabled="disabled"
    :placeholder="placeholder"
  )
  img.base-input-cards__icon(
    v-if="inputIcon"
    :src="inputIcon"
  )
</template>

<script>
import mir from '@/assets/img/icons/mir.svg';
import visa from '@/assets/img/icons/visa.svg';
import maestro from '@/assets/img/icons/maestro.svg';
import mastercard from '@/assets/img/icons/mastercard.svg';
import creditCardType from 'credit-card-type';
export default {
  props: {
    mask: String,
    type: String,
    value: String,
    masked: Boolean,
    isError: Boolean,
    disabled: Boolean,
    placeholder: String,
  },
  data() {
    return {
      inputIcon: '',
      mastercard,
      maestro,
      visa,
      mir
    };
  },
  computed: {
    inputClasses() {
      return {
        'base-input-cards__input_disabled': this.disabled,
        'base-input-cards__input_error': this.isError
      };
    }
  },
  methods: {
    handleInput(event) {
      if (event) {
        const [info] = creditCardType(event);
        // TODO Memoize
        if (info) this.inputIcon = this[info.type];
      } else {
        this.inputIcon = '';
      }
      this.$emit('input', event);
    }
  }
};
</script>

<style lang="scss">
.base-input-cards {
  width: 100%;
  &__input {
    width: 100%;
    height: 40px;
    padding: 0 62px 0 15px;
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
  &__icon {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    max-width: 50px;
    max-height: 20px;
  }
}
</style>