<template lang="pug">
.order-form
  .order-form__column
    //- .order-form__breadcrumbs
      OrderFormBreadcrumbs
    .order-form__info
      .order-form__title Shipping Info
      ul.order-form__list
        li.order-form__child
          .order-form__child-title Recipient
          .order-form__child-inputs
            .order-form__child-input
              BaseInput(
                v-model.trim="$v.formValues.fullname.$model"
                :isError="$v.formValues.fullname.$error"
                :errorsObject="$v.formValues.fullname"
                :placeholder="localized('placeholder.fullname')"
              )
            .order-form__child-group
              .order-form__child-input.order-form__child-input_phone
                BaseInput(
                  v-model.trim="$v.formValues.phone.$model"
                  :isError="$v.formValues.phone.$error"
                  :errorsObject="$v.formValues.phone"
                  :placeholder="localized('placeholder.phone')"
                )
                  template(#descr) {{ localized('label.phone.use') }}
        li.order-form__child
          .order-form__child-title Address
          .order-form__child-inputs
            .order-form__child-input
              BaseInput(
                v-model.trim="$v.formValues.streetAddress.$model"
                :isError="$v.formValues.streetAddress.$error"
                :errorsObject="$v.formValues.streetAddress"
                :placeholder="localized('placeholder.streetAddress')"
              )
            .order-form__child-input
              BaseInput(
                v-model.trim="formValues.fullAddress"
                :placeholder="localized('placeholder.address.clarification')"
              )
            .order-form__child-input
              BaseInput(
                v-model.trim="$v.formValues.city.$model"
                :isError="$v.formValues.city.$error"
                :errorsObject="$v.formValues.city"
                :placeholder="localized('placeholder.city')"
              )
            .order-form__child-group
              .order-form__child-input.order-form__child-input_country
                BaseInput(
                  v-model.trim="$v.formValues.country.$model"
                  :isError="$v.formValues.country.$error"
                  :errorsObject="$v.formValues.country"
                  :placeholder="localized('placeholder.country')"
                )
              .order-form__child-input.order-form__child-input_zip
                BaseInput(
                  v-model.trim="$v.formValues.zip.$model"
                  :isError="$v.formValues.zip.$error"
                  :errorsObject="$v.formValues.zip"
                  :placeholder="localized('placeholder.zip')"
                )
            .order-form__child-group
              .order-form__child-btn
                BaseButton(
                  type="submit"
                  :value="localized('value.continue')"
                )
  .order-form__column.order-form__column_dark
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import BaseInput from '@/components/BaseInput';
import BaseButton from '@/components/BaseButton';
import OrderFormBreadcrumbs from '@/components/OrderFormBreadcrumbs';
export default {
  components: {
    BaseInput,
    BaseButton,
    OrderFormBreadcrumbs
  },
  data() {
    return {
      formValues: {
        zip: '',
        city: '',
        phone: '',
        fullname: '',
        fullAddress: '',
        streetAddress: '',
      }
    };
  },
  computed: {
    ...mapGetters('translations', ['localized']),
  },
  validations: {
    formValues: {
      fullname: {
        required
      },
      phone: {
        required
      },
      streetAddress: {
        required
      },
      city: {
        required
      },
      country: {
        required
      },
      zip: {
        required
      }
    }
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
  &__list {
    margin: 0;
    padding: 0;
    margin-top: 20px;
  }
  &__child {
    margin-top: 20px;
    list-style: none;
    &:not(:first-child) {
      margin-top: 30px;
    }
    &-title {
      font-size: 16px;
      line-height: 18px;
    }
    &-group {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: auto;
      grid-gap: 0 20px;
      margin-top: 10px;
    }
    &-inputs {
      margin-top: 5px;
    }
    &-input {
      margin-top: 10px;
      &_phone {
        margin: 0;
        grid-column: 1 / 4;
      }
      &_country {
        margin: 0;
        grid-column: 1 / 4;
      }
      &_zip {
        margin: 0;
        grid-column: 4 / 6;
      }
    }
    &-btn {
      grid-column: 1 / 4;
    }
  }
}
</style>