<template>
<div class="addMarginX1" id="splashContent">
  <!-- <div v-if="contentSplash.acf" v-html="contentSplash.acf.indexoneliner">
  </div> -->
  <!-- <p>
    Graphic studio for <span class='iconWrapper'>web<span class='icon web'></span></span>, <span class='iconWrapper'><span class='icon print'></span>print</span> and things that goes <span class='iconWrapper'><span class='icon hybrid'></span>inbetween</span>.
  </p> -->

  <p>
    Graphic studio for <span class='iconWrapper'>web<span class='icon web'></span></span>, <span class='iconWrapper'>print<span class='icon print'></span></span> and things <span class='iconWrapper'>inbetween<span class='icon hybrid'></span></span>.
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

            // -webkit-animation-name: example;
            // -webkit-animation-duration:2s;
            // animation-name: example;
            // -webkit-animation-timing-function: ease-in-out;
            // animation-timing-function: ease-in-out;
            // animation-duration: 2s;
            // animation-delay: 1s;
            // animation-iteration-count: infinite;;
            // animation-direction: alternate;
            // animation-fill-mode: forwards;
            // position: relative;
            // top: 0;

        }
        //
        // @-webkit-keyframes example {
        //     0% {
        //         top: 0;
        //     }
        //     50% {
        //
        //     }
        //     100% {
        //         top: 97px;
        //     }
        // }
        //
        // @keyframes example {
        //     0% {
        //         top: 0;
        //     }
        //     50% {
        //
        //     }
        //     100% {
        //         top: 97px;
        //
        //     }
        // }

    }
}
</style>
