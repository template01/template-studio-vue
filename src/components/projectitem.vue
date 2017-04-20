<template>
<div class="projectitem">
  <div v-html="projectContent.acf['item_year']"></div>
  <div v-html="projectContent.acf['item_text']"></div>
  <img width="100%" v-bind:src="projectContent.acf['customfeaturedimage'].url" />
</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: ['projectContent']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../assets/scss/base.scss";
@include media("<tablet") {
    * {
        // display: none;
    }
}
</style>
