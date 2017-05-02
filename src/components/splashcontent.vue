<template>
<div class="addMarginX1" id="splashContent">
  <!-- <div v-if="contentSplash.acf" v-html="contentSplash.acf.indexoneliner">
  </div> -->
  <p>
    Graphic studio for <span class='iconWrapper'>web<span class='icon web'></span></span>, <span class='iconWrapper'><span class='icon print'></span>print</span> and <span class='iconWrapper'><span class='icon hybrid'></span>inbetween</span>.
  </p>
</div>
</template>

<script>
export default {
  name: 'splashcontent',
  props: ['contentSplash'],
  data() {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@include media("<tablet") {}

#splashContent {
    clear: both;
    padding-top: $defaultPadding;
}
</style>


<style lang="scss">
@import "../assets/scss/base.scss";
@include media("<tablet") {}

#splashContent {
    clear: both;
    padding-top: $defaultPadding;
    p {
        margin-top: 0;
    }
    span {

        &.iconWrapper {
            position: relative;
            display: inline-block;
        }

        &.icon {
            width: 50px;
            height: 50px;
            background-size: cover;
            display: block;
            // position: absolute;
            // left:0;
            margin: 0 auto;
        }

        &.web {
            background-image: url("../assets/svg/webcircle.svg");
        }
        &.print {
            background-image: url("../assets/svg/printcircle.svg");
        }
        &.hybrid {
            background-image: url("../assets/svg/hybridcircle.svg");
            -webkit-animation-name: example;
            -webkit-animation-duration: 5s;
            animation-name: example;
            animation-duration: 5s;
            animation-delay: 1s;
            animation-iteration-count: 3;
  animation-direction: alternate;
  animation-fill-mode: forwards;
            position: relative;
            top: 0px;

        }

        /* Safari 4.0 - 8.0 */
        @-webkit-keyframes example {
            0% {
                top: 0px;
            }
            50% {
                // top: -96px;

            }
            100% {
              top: 96px;

                // top: 0px;
            }
        }

        /* Standard syntax */
        @keyframes example {
          0% {
              top: 0px;
          }
          50% {
            // top: 96px;

          }
          100% {
            top: 96px;

              // top: 0px;
          }
        }

    }
}
</style>
