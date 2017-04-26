<template>
<div id="splashContent">
  <div v-if="contentSplash.acf" v-html="contentSplash.acf.indexoneliner">
  </div>

</div>
</template>

<script>
export default {
  name: 'splashcontent',
  props:['contentSplash'],
  data() {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../assets/scss/base.scss";
@include media("<tablet") {

}

#splashContent{
  clear: both;
}
</style>
