<template lang="pug">
.base-input
  BaseInputCheckbox(
    v-if="type === 'checkbox'"
    @change="$emit('input', $event)"
    :id="id"
    :type="type"
    :value="value"
    :modifier="modifier"
    :disabled="disabled"
    :trueValue="trueValue"
    :falseValue="falseValue"
    :modelValue="modelValue"
    :placeholder="placeholder"
  )
    template(
      v-if="checkboxValue === true"
      #checkboxValue
    )
      .base-input__checkbox-value <span class="base-input__checkbox-currency">{{ value }}</span> {{ placeholder }}
  BaseInputTextarea(
    v-else-if="type === 'textarea'"
    @input="$emit('input', $event)"
    :value="modelValue"
    :height="height"
    :isError="isError"
    :modifier="modifier"
    :placeholder="placeholder"
  )
  BaseInputFile(
    v-else-if="type === 'file'"
    @input="$emit('input', $event)"
    :value="modelValue"
    :accept="accept"
    :preview="preview"
    :maxSize="maxSize"
    :isError="isError"
    :modifier="modifier"
    :placeholder="placeholder"
  )
  BaseInputTimePicker(
    v-else-if="type === 'time'"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
    :value="modelValue"
    :format="format"
    :disabled="disabled"
    :inputClass="timePickerClasses"
    :inputWidth="inputWidth"
    :placeholder="placeholder"
    advanced-keyboard
    close-on-complete
    hide-clear-button
  )
  MaskedInput(
    v-else-if="mask"
    @input="$emit('input', $event)"
    :mask="mask"
    :type="type"
    :value="value"
    :masked="masked"
    :disabled="disabled"
    :placeholder="placeholder"
    :class="{ 'base-input__input_disabled': disabled }"
    class="base-input__input"
  )
  .base-input__label(v-else)
    input.base-input__input(
      @input="handleInput($event.target.value)"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :class="{'base-input__input_error': isError}"
    )
    BaseLoader(
      v-if="isLoaderActive"
      :width="30"
      :height="30"
      :transition="1.2"
      color="#FF8E3B"
      class="base-input__loader"
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
    :class="{ 'base-input__descr_justify': modifier === 'descrJustify' }"
  )
    slot(
      name="descr"
    )
</template>

<script>
import { BaseLoader } from '@/components/BaseLoader.jsx';
import BaseInputFile from '@/components/BaseInputFile';
import BaseInputErrors from '@/components/BaseInputErrors';
import BaseInputCheckbox from '@/components/BaseInputCheckbox';
import BaseInputTextarea from '@/components/BaseInputTextarea';
import BaseInputTimePicker from 'vue2-timepicker';
export default {
  components: {
    BaseLoader,
    BaseInputFile,
    BaseInputErrors,
    BaseInputCheckbox,
    BaseInputTextarea,
    BaseInputTimePicker
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
  },
  computed: {
    timePickerClasses() {
      let classes = 'base-input__input';
      if (this.isError) classes += ' base-input__input_error';
      if (this.disabled) classes += ' base-input__input_disabled';
      if (this.modifier === 'worktime') classes += ' base-input__input_worktime';
      return classes;
    }
  },
  methods: {
    handleInput(event) {
      if (this.staticValue) {
        return event.startsWith(this.staticValue)
          ? this.$emit('input', event.slice(this.staticValue.length))
          : this.$emit('input', event);
      }
      return this.$emit('input', event);
    }
  }
};
</script>

<style lang="scss">
.base-input {
  position: relative;
  width: 100%;
  &_ordered {
    & .base-input__descr {
      margin: 0;
      @include desktop {
        order: -1;
        padding: 0;
        margin: 12px 0;
      }
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
    height: 42px;
    padding: 0 35px 0 24px;
    border: 2px solid #F2F2F2;
    border-radius: 21px;
    font-size: 12px;
    line-height: 20px;
    background: #ffffff;
    color: #828282;
    transition: 0.3s;
    outline: none;
    &:hover {
      border: 2px solid #828282;
      @include tablets {
        border: 2px solid #F2F2F2;
      }
    }
    &:focus {
      border: 2px solid #FF8E3B;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      box-shadow: 0 0 0 30px #F2F2F2 inset;
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
    top: 0;
    left: calc(100% + 30px);
    height: 100%;
    width: 320px;
    margin: 0;
    font-size: 14px;
    line-height: 20px;
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
    @include desktop {
      position: unset;
      left: 0;
      top: 0;
      width: 100%;
      height: auto;
      margin-top: 10px;
      padding-left: 24px;
    }
  }
  &__loader {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
}
.vue__time-picker {
  position: relative;
  display: block;
  & .dropdown {
    position: absolute;
    top: 50%;
    left: 0;
    background: #fff;
    border: 2px solid #F2F2F2;
    padding-top: 20px;
    overflow: hidden;
    height: 10em;
    font-weight: 400;
    z-index: -2;
    .hint {
      color: #a5a5a5;
      cursor: default;
      font-size: .8em;
    }
    & ul {
      padding: 0;
      margin: 0;
      list-style: none;
      -webkit-box-flex: 1;
      -ms-flex: 1 1 0.00001px;
      flex: 1 1 0.00001px;
      overflow-x: hidden;
      overflow-y: auto;
      & li {
        list-style: none;
        text-align: center;
        padding: .3em 0;
        color: #161616;
        outline: none;
        &.active {
          background: #FF8E3B;
          color: #ffffff;
        }
      }
    }
  }
  & .select-list {
    width: 100%;
    height: 10em;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  & .clear-btn {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
}
</style>