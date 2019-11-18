<template lang="pug">
.payment
  h2.payment__title Payment
  .payment__prompt
    img.payment__prompt-icon(:src="security")
    h3.payment__prompt-title This is a secure 128-bit SSL encrypted payment
  form.payment__form(@submit.prevent="submit")
    ul.payment__list
      li.payment__child
        h3.payment__child-title Cardholder Name
        .payment__child-inputs
          .payment__child-input
            BaseInput(
              v-model.trim="$v.formValues.cardholderName.$model"
              :isError="$v.formValues.cardholderName.$error"
              :errorsObject="$v.formValues.cardholderName"
              :placeholder="localized('placeholder.cardholder.name')"
            )
      li.payment__child
        h3.payment__child-title Card Number
        .payment__child-inputs
          .payment__child-input
            BaseInput(
              v-model="$v.formValues.cardNumber.$model"
              :isError="$v.formValues.cardNumber.$error"
              :errorsObject="$v.formValues.cardNumber"
              :type="'cards'"
              :mask="'#### #### #### ####'"
              :masked="false"
              :placeholder="'#### #### #### ####'"
            )
      li.payment__child
        .payment__child-group.payment__child-group_card
          .payment__child-wrap
            h3.payment__child-title Expire Date
            .payment__child-input
              BaseInput(
                v-model.trim="$v.formValues.expireData.$model"
                :isError="$v.formValues.expireData.$error"
                :errorsObject="$v.formValues.expireData"
                :mask="'##/##'"
                :masked="true"
                :placeholder="'MM/YY'"
              )
          .payment__child-wrap
            h3.payment__child-title Security Code
            .payment__child-input
              BaseInput(
                v-model.trim="$v.formValues.securityCode.$model"
                :isError="$v.formValues.securityCode.$error"
                :errorsObject="$v.formValues.securityCode"
                :mask="'###'"
                :masked="true"
                :placeholder="'###'"
              )
      li.payment__child
        .shipping-info__child-group
          .payment__child-btn
            BaseButton(
              type="submit"
              :value="localized('value.pay')"
            )
</template>

<script>
import { mapGetters } from 'vuex';
import { required, numeric } from 'vuelidate/lib/validators';
import BaseInput from '@/components/BaseInput';
import BaseButton from '@/components/BaseButton';
import security from '@/assets/img/icons/security.svg';
export default {
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      security,
      unhashedCardNumber: '',
      formValues: {
        cardholderName: '',
        cardNumber: '',
        expireData: '',
        securityCode: ''
      }
    };
  },
  computed: {
    ...mapGetters('translations', ['localized'])
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        //TODO request
        this.$router.push('check');
      }
    }
  },
  validations: {
    formValues: {
      cardholderName: {
        required
      },
      cardNumber: {
        required
      },
      expireData: {
        required
      },
      securityCode: {
        required,
        numeric
      }
    }
  }
};
</script>

<style lang="scss">
.payment {
  &__title {
    margin: 0;
    font-size: 26px;
    line-height: 31px;
  }
  &__prompt {
    display: flex;
    align-items: center;
    margin-top: 10px;
    &-icon {
      margin-right: 5px;
    }
    &-title {
      margin: 0;
      font-family: 'HelveticaNeueUlrtaLight';
      font-size: 15px;
      line-height: 18px;
      color: #6B6B6B;
    }
  }
  &__form {
    margin-top: 20px;
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
      margin: 0;
      font-family: 'HelveticaNeueUlrtaLight';
      font-size: 16px;
      line-height: 18px;
    }
    &-row {
      display: flex;
    }
    &-group {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: auto;
      grid-gap: 0 20px;
      &_card {
        grid-template-columns: repeat(3, 1fr);
      }
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
      &_city {
        position: relative;
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
      &_city {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        padding: 0;
        border: 0;
        background: transparent url('../assets/img/icons/geolocation.svg') center no-repeat;
        cursor: pointer;
      }
      &_disabled {
        opacity: 0.3;
        cursor: unset;
      }
    }
  }
}
</style>