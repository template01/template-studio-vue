<template>
<div class="addMarginX1" id="splashContent">
  <!-- <div v-if="contentSplash.acf" v-html="contentSplash.acf.indexoneliner">
  </div> -->
  <!-- <p>
    Graphic studio for <span class='iconWrapper'>web<span class='icon web'></span></span>, <span class='iconWrapper'><span class='icon print'></span>print</span> and things that goes <span class='iconWrapper'><span class='icon hybrid'></span>inbetween</span>.
  </p> -->

  <!-- <p>
    Graphic studio for <span class='iconWrapper'>web<span class='icon web'></span></span>, <span class='iconWrapper'>print<span class='icon print'></span></span> and things <span class='iconWrapper'>inbetween<span class='icon hybrid'></span></span>.
  </p> -->

  <transition name="fade">
    <div v-if="passedAnimateSplashContentInProp">
      <p>
        Graphic design studio for web, print and things inbetween.
        <br /><span v-if="!hidetypedSplashContent" id="typedSplashContent"><span class="one">.</span><span class="two">.</span><span class="three">.</span></span>
      </p>



    </div>
  </transition>

</div>
</template>

<script>
export default {
  name: 'splashcontent',
  props: ['contentSplash', 'passedAnimateSplashContentInProp'],
  data() {
    return {
      hidetypedSplashContent: false,
      // 'popupSidebar':false,
      // 'popupProjects':false,
    }
  },

  mounted() {
  },

  methods: {
      lockScroll () {
        window.scrollTo(0,0)
      }

  },
  watch: {
    '$route' (to, from) {
      if (to.path === '/') {
        this.hidetypedSplashContent = true
      }

    },

    'passedAnimateSplashContentInProp': function() {
      // alert('change')
      if (this.$route.path === '/') {

        var counter = 0
        var vm = this
        setTimeout(function() {
          Typed.new("#typedSplashContent", {
            strings: ["Hi there!", "See some of our <u>projects</u> below.", "Or read more <u>about us</u> here.", "And remember to have fun :)", ""],
            typeSpeed: 0,
            showCursor: false,
            backDelay: 1000,
            onStringTyped: function() {
              vm.popupSidebar = true
              // console.log(self.arrayPos)
              // console.log(this)

              if (counter === 1) {
                vm.$emit('popupProjects')
              }
              if (counter === 2) {
                vm.$emit('popupSidebar')
              }
              if (counter > 2) {
                // vm.toggleScroll('enable')
                window.removeEventListener('scroll', vm.lockScroll);
                document.querySelector("body").style.pointerEvents = "auto";
              }
              counter++

            },
          });

        }, 1000)
        setTimeout(function() {
          window.scrollTo(0, 0)
        }, 200)
        document.querySelector("body").style.pointerEvents = "none";
        // this.toggleScroll('disable')
        window.addEventListener('scroll', this.lockScroll);

      }
    }
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

  #blockScroll{
    background: red;
  }

    #typedSplashContent {

        u {
            text-decoration: none;
            -webkit-box-shadow: inset 0 -3px 0 0 green;
            -moz-box-shadow: inset 0 -3px 0 0 green;
            box-shadow: inset 0 -3px 0 0 green;
            color: green;
        }

        .one {
            opacity: 0;
            -webkit-animation: dot 1.3s infinite;
            -webkit-animation-delay: 0.0s;
            animation: dot 1.3s infinite;
            animation-delay: 0.0s;
        }

        .two {
            opacity: 0;
            -webkit-animation: dot 1.3s infinite;
            -webkit-animation-delay: 0.2s;
            animation: dot 1.3s infinite;
            animation-delay: 0.2s;
        }

        .three {
            opacity: 0;
            -webkit-animation: dot 1.3s infinite;
            -webkit-animation-delay: 0.3s;
            animation: dot 1.3s infinite;
            animation-delay: 0.3s;
        }
        @-webkit-keyframes dot {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 0;
            }
            51% {
                opacity: 1;
            }
            100% {
                opacity: 1;
            }
        }
        @keyframes dot {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 0;
            }
            51% {
                opacity: 1;
            }
            100% {
                opacity: 1;
            }
        }

    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity $transition-timing-a;
    }
    /* .fade-leave-active in <2.1.8 */
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

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
        }

    }
}
</style>
