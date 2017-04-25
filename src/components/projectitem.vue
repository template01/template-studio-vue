<template>
<div class="projectitem addMarginX1TopBottom">
  <div>
  <!-- <div class="addMarginX2Sides"  v-html="projectContent.acf['item_year']"></div> -->
  <div class="addMarginX1Sides addMarginX1Bottom" v-html="projectContent.acf['item_text']"></div>
  <img width="100%" v-bind:src="projectContent.acf['customfeaturedimage'].url" />
</div>
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
<style lang="scss" >@import "../assets/scss/base.scss";
@include media("<tablet") {
    * {
        // display: none;
    }
}

</style>
