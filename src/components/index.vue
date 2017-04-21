<template>
<div id="index" class="">
  <!-- <splash></splash> -->
  <projectlist></projectlist>
</div>
</template>

<script>
import projectlist from './projectlist'
import splash from './splash'
export default {
  components:{
    projectlist,
    splash
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../assets/scss/base.scss";
@include media("<tablet") {
    * {
        // display: none;
    }
}

#index{
  font-family: Courier Prime;
  font-size: 40px;
  // font-weight:
  @include media("<tablet") {
    font-size: 30px;
  }
}
</style>
