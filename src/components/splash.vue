<template>
<div id="splashArea" class="">
  <div id="splashAreaInner">
    <p>
      splash page
    </p>

  </div>
</div>
</template>

<script>
export default {
  name: '',
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

#splashArea {
    // position: relative;
    width: 100%;
    height: auto;

    #splashAreaInner {
        min-height: 100vh;
        background: rgb(242, 242, 242) ;
        width: 100%;
        top: 0;
        display: flex;
        align-content: center;
        justify-content: center;

        p{
          align-self: center;
        }
    }
}
</style>
