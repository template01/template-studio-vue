<template>
<div v-bind:style="{'margin-bottom':marginBottom+'px'}" class="" id="splashExtra">
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
  props:['contentSplash','marginBottom'],
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
  background: #fffdf5;

  clear: both;
  #splashExtraInner{
    background: #fffdf5;

  }
  p{
    margin: 0;
  }
}
</style>
