<template lang="pug">
#app(v-if="staticWords && basicStaticWords")
  TheHeader
  main.main
    .container
      RouterView
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TheHeader from '@/components/TheHeader';
export default {
  components: {
    TheHeader
  },
  computed: {
    ...mapState('translations', {
      staticWords: state => state.staticWords,
      basicStaticWords: state => state.basicStaticWords
    })
  },
  async created() {
    await this.fetchStaticWords();
    await this.fetchBasicStaticWords();
  },
  methods: {
    ...mapActions('translations', ['fetchStaticWords', 'fetchBasicStaticWords'])
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.main {
  padding: 60px 0;
}
</style>
