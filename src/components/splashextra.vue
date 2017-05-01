<template>
<div class="" id="splashExtra">
  <div  class="addPaddingX1" id="splashExtraInner">
    <p>
      Extra content?
    </p>

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
  padding-top: $defaultPadding;
}
</style>


<style lang="scss">@import "../assets/scss/base.scss";
@include media("<tablet") {

}

#splashExtra{
  margin-bottom: 90px;
  position: relative;
  display: block;
  background: rgb(242,242,242);

  clear: both;
  #splashExtraInner{
    background: rgb(242,242,242);

  }
  p{
    margin: 0;
  }
}
</style>
