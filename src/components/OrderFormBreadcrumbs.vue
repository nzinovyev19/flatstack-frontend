<template lang="pug">
.order-form-breadcrumbs
  .order-form-breadcrumbs__list
    a.order-form-breadcrumbs__child(
      v-for="(breadcrumb, index) in breadcrumbsList"
      :key="index"
      :class="{'profile-place-breadcrumbs__child_active': breadcrumbsList[index].link }"
      @click="$router.push(breadcrumbsList[index].link($route.params.id))"
    )
      span.order-form-breadcrumbs__text {{ breadcrumb.name }}
      img.order-form-breadcrumbs__icon
</template>

<script>
import Arrow from '@/assets/img/icons/arrow.svg';
export default {
  data() {
    return {
      Arrow,
      breadcrumbsList: []
    };
  },
  watch: {
    '$route' () {
      this.breadcrumbsList = this.$route.meta.breadcrumb;
    }
  },
  created() {
    this.breadcrumbsList = this.$route.meta.breadcrumb;
  }
};
</script>
