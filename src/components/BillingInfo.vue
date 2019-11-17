<template lang="pug">
.billing-info
  form.billing-info__form(@submit.prevent="submit")
    .billing-info__top
      h2.billing-info__title Billing Information
      a.billing-info__autocomplete(@click="autocomplete") Same as shipping
    ul.billing-info__list
      li.billing-info__child
        h3.billing-info__child-title Billing Contact
        .billing-info__child-inputs
          .billing-info__child-input
            BaseInput(
              v-model.trim="$v.formValues.fullname.$model"
              :isError="$v.formValues.fullname.$error"
              :errorsObject="$v.formValues.fullname"
              :placeholder="localized('placeholder.fullname')"
            )
          .billing-info__child-input
            BaseInput(
              v-model.trim="$v.formValues.email.$model"
              :isError="$v.formValues.email.$error"
              :errorsObject="$v.formValues.email"
              :placeholder="localized('placeholder.email')"
            )
      li.billing-info__child
        h3.billing-info__child-title Billing Address
        .billing-info__child-inputs
          .billing-info__child-input
            BaseInput(
              v-model.trim="$v.formValues.streetAddress.$model"
              :isError="$v.formValues.streetAddress.$error"
              :errorsObject="$v.formValues.streetAddress"
              :placeholder="localized('placeholder.streetAddress')"
            )
          .billing-info__child-input
            BaseInput(
              v-model.trim="formValues.fullAddress"
              :placeholder="localized('placeholder.address.clarification')"
            )
          .billing-info__child-input.billing-info__child-input_city
            BaseInput(
              v-model.trim="$v.formValues.city.$model"
              :isError="$v.formValues.city.$error"
              :errorsObject="$v.formValues.city"
              :placeholder="localized('placeholder.city')"
            )
            button.billing-info__child-btn.billing-info__child-btn_city(@click="searchCityNameByLatLng")
          .billing-info__child-group
            .billing-info__child-input.billing-info__child-input_country
              BaseInput(
                v-model.trim="$v.formValues.country.$model"
                :isError="$v.formValues.country.$error"
                :errorsObject="$v.formValues.country"
                type="select"
                :options="countries"
                :label="'name'"
                :reduce="country => country.name"
              )
            .billing-info__child-input.billing-info__child-input_zip
              BaseInput(
                v-model.trim="$v.formValues.zip.$model"
                :isError="$v.formValues.zip.$error"
                :errorsObject="$v.formValues.zip"
                :placeholder="localized('placeholder.zip')"
              )
          .billing-info__child-group
            .billing-info__child-btn
              BaseButton(
                type="submit"
                :value="localized('value.continue')"
              )
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { getCurrentPosition } from '@/helpers';
import { required, numeric, email } from 'vuelidate/lib/validators';
import BaseInput from '@/components/BaseInput';
import BaseButton from '@/components/BaseButton';
import BaseInputSelect from '@/components/BaseInputSelect';
export default {
  components: {
    BaseInput,
    BaseButton,
    BaseInputSelect
  },
  data() {
    return {
      isSearchCityBtnDisabled: false,
      position: [],
      countries: [],
      formValues: {
        zip: '',
        city: '',
        email: '',
        country: '',
        fullname: '',
        fullAddress: '',
        streetAddress: '',
      }
    };
  },
  computed: {
    ...mapGetters('translations', ['localized']),
    ...mapState(['enteredData'])
  },
  async created() {
    await Promise.allSettled([
      this.fetchCounties(),
      this.searchCityNameByLatLng()
    ]);
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        //TODO request
        this.$router.push('payment');
      }
    },
    autocomplete() {
      Object.assign(this.formValues, this.enteredData);
    },
    async fetchCounties() {
      try {
        const response = await this.$axios.get('https://restcountries.eu/rest/v2/all');
        this.countries = response.data;
      } catch (e) {
        console.error(e);
      }
    },
    async fetchLatLng() {
      try {
        const { coords } = await getCurrentPosition();
        const { latitude, longitude } = coords;
        this.position.push(latitude, longitude);
      } catch (e) {
        this.isSearchCityBtnDisabled = true;
        console.error(e);
      }
    },
    async fetchCityByLatLng() {
      try {
        const [lat, lng] = this.position;
        const key = `&key=${process.env.VUE_APP_GOOGLE_API_KEY}`;
        const queryString = `?latlng=${lat},${lng}&result_type=locality${key}`;
        const url = `https://maps.googleapis.com/maps/api/geocode/json${queryString}`;
        const response = await this.$axios.get(url);
        this.formValues.city = response.data.results[0].address_components[0].short_name;
      } catch (e) {
        console.error(e);
      }
    },
    async searchCityNameByLatLng() {
      await this.fetchLatLng();
      if (this.position.length !== 0) {
        await this.fetchCityByLatLng(this.position);
      }
    }
  },
  validations: {
    formValues: {
      fullname: {
        required
      },
      email: {
        required,
        email
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
        required,
        numeric
      }
    }
  }
};
</script>

<style lang="scss">
.billing-info {
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__autocomplete {
    font-size: 12px;
    line-height: 14px;
    text-decoration: underline;
    cursor: pointer;
  }
  &__title {
    margin: 0;
    font-size: 26px;
    line-height: 31px;
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