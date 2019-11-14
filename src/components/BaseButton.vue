<template lang="pug">
button.base-button(
  :type="type"
) {{ value }}
</template>

<script>
export default {
  props: {
    type: String,
    value: String
  }
};
</script>

<style lang="scss">
.base-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid rgba(67, 28, 93, 0.8);
  background: rgba(90, 16, 148, 0.8);
  font-family: 'HelveticaNeueMed';
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  cursor: pointer;
}
</style>