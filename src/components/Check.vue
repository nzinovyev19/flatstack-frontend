<template lang="pug">
.check
  h2.check__title Thank you for your order!
  .check__content
    span.check__order Order number is: 188787788
    p.check__descr.check__descr_email Your will recieve an email confirmation shortly to
      |  {{ $store.state.enteredData.email }}
    p.check__descr.check__descr_date Estimated delivery Day is <span class="bold">Friday 1st April 2016</span>
    a.check__link(@click="print()") Print Recipe
</template>

<script>
export default {
  methods: {
    print() {
      window.print();
    }
  }
};
</script>

<style lang="scss">
.check {
  margin: 0;
  font-size: 16px;
  line-height: 18px;
  color: #5A1094;
  &__content {
    margin-top: 24px;
  }
  &__title {
    margin: 0;
    font-family: 'HelveticaNeueUlrtaLight';
    font-size: 26px;
    line-height: 31px;
  }
  &__order {
    font-family: 'HelveticaNeueMed';
    font-size: 16px;
    line-height: 19px;
    color: #2B2525;
  }
  &__descr {
    margin: 0;
    font-size: 16px;
    line-height: 18px;
    color: #2B2525;
    &_email {
      width: 80%;
      margin-top: 10px;
    }
    &_date {
      width: 50%;
      margin-top: 30px;
    }
  }
  &__link {
    display: inline-block;
    margin-top: 30px;
    font-family: 'HelveticaNeueMed';
    font-size: 13px;
    text-decoration: underline;
    color: #5A1094;
    cursor: pointer;
  }
}
</style>