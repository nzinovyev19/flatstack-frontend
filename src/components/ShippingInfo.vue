<template lang="pug">
form.shipping-info__form(@submit.prevent="submit")
  .shipping-info__title Shipping Info
  ul.shipping-info__list
    li.shipping-info__child
      .shipping-info__child-title Recipient
      .shipping-info__child-inputs
        .shipping-info__child-input
          BaseInput(
            v-model.trim="$v.formValues.fullname.$model"
            :isError="$v.formValues.fullname.$error"
            :errorsObject="$v.formValues.fullname"
            :placeholder="localized('placeholder.fullname')"
          )
        .shipping-info__child-group
          .shipping-info__child-input.shipping-info__child-input_phone
            BaseInput(
              v-model.trim="$v.formValues.phone.$model"
              :mask="'+7 (###) ###-##-##'"
              :isError="$v.formValues.phone.$error"
              :errorsObject="$v.formValues.phone"
              :placeholder="localized('placeholder.phone')"
            )
              template(#descr) {{ localized('label.phone.use') }}
    li.shipping-info__child
      .shipping-info__child-title Address
      .shipping-info__child-inputs
        .shipping-info__child-input
          BaseInput(
            v-model.trim="$v.formValues.streetAddress.$model"
            :isError="$v.formValues.streetAddress.$error"
            :errorsObject="$v.formValues.streetAddress"
            :placeholder="localized('placeholder.streetAddress')"
          )
        .shipping-info__child-input
          BaseInput(
            v-model.trim="formValues.fullAddress"
            :placeholder="localized('placeholder.address.clarification')"
          )
        .shipping-info__child-input.shipping-info__child-input_city
          BaseInput(
            v-model.trim="$v.formValues.city.$model"
            :isError="$v.formValues.city.$error"
            :errorsObject="$v.formValues.city"
            :placeholder="localized('placeholder.city')"
          )
          button.shipping-info__child-btn.shipping-info__child-btn_city(@click="searchCityNameByLatLng")
        .shipping-info__child-group
          .shipping-info__child-input.shipping-info__child-input_country
            BaseInput(
              v-model.trim="$v.formValues.country.$model"
              :isError="$v.formValues.country.$error"
              :errorsObject="$v.formValues.country"
              type="select"
              :options="countries"
              :label="'name'"
              :reduce="country => country.name"
            )
          .shipping-info__child-input.shipping-info__child-input_zip
            BaseInput(
              v-model.trim="$v.formValues.zip.$model"
              :isError="$v.formValues.zip.$error"
              :errorsObject="$v.formValues.zip"
              :placeholder="localized('placeholder.zip')"
            )
        .shipping-info__child-group
          .shipping-info__child-btn
            BaseButton(
              type="submit"
              :value="localized('value.continue')"
            )
</template>

<script>
import { mapGetters } from 'vuex';
import { required, numeric } from 'vuelidate/lib/validators';
import { getCurrentPosition } from '@/helpers';
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
        phone: '',
        country: '',
        fullname: '',
        fullAddress: '',
        streetAddress: '',
      }
    };
  },
  computed: {
    ...mapGetters('translations', ['localized']),
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
        this.$router.push('billing');
      }
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
        required,
        numeric
      }
    }
  }
};
</script>

<style lang="scss">
.shipping-info {
  &__title {
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