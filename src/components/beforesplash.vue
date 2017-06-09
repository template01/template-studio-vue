<template>
<div v-if="!hidden" id="beforesplash" :style="{'opacity':opacity}">
  <div>
    <div :style="{'pointer-events':splashStringDoneHover?'auto':'none'}" id="beforesplashHeader" @click="gotoIntro">
      <div id="hiddenHelper">
        <span>Check out that fuss...</span>
      </div>
      <div id="headerWrapper">
        <div id="headerContent">
          <span>
            TEMPLATE
          </span>
          <span>
            STUDIO
          </span>
        </div>
        <div id="headerSingleLine">
          Graphic design / Web development / Etc.
        </div>
      </div>
    </div>
    <div id="imageContainerWrapper">
      <div v-bind:style="{'background':item.background, 'opacity':opacityImg}" v-for="item in imageContent" class="imageContainer" :class="{smallContainer : item.outer_size === 'Small', largeContainer : item.outer_size === 'Large' }">
        <!-- <div :style="{'background-image':'url('+item.image.sizes.large+')'}" class="imageContainerInner" :class="{smallImage : item.inner_size === 'Small', largeImage : item.inner_size === 'Large' }" ></div> -->

        <img v-if="splashStringDone" v-lazy="item.image.sizes.large" :class="{smallImage : item.inner_size === 'Small', largeImage : item.inner_size === 'Large' }" />


        <!-- <img  :style="{'opacity':opacityImg}" :src="item.image.sizes.large" :class="{smallImage : item.inner_size === 'Small', largeImage : item.inner_size === 'Large' }" /> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'beforesplash',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      imageContent: [],
      setMarginTop: 0,
      hidden: false,
      opacity: 1,
      opacityImg: 1,
      splashStringDone: false,
      splashStringDoneHover: false
    }
  },
  created() {

    if (this.$route.path != '/') {
      this.hidden = true
    } else {
      this.fetchContent()
    }


    var vm = this

    window.addEventListener('scroll', this.beforeSplashHide);

    setTimeout(function(){
      vm.splashStringDone = true
    },2000)

    setTimeout(function(){
      vm.splashStringDoneHover = true
    },3000)

    // this.$Lazyload.$on('loaded', alert('hey'))

  },
  methods: {

    gotoIntro: function() {
      window.scroll({
        top: this.$el.scrollHeight + 1,
        left: 0,
        behavior: 'smooth'
      })
    },

    beforeSplashHide: function() {
      console.log('scrooll')

      if (window.scrollY > 2 * (this.$el.offsetHeight / 3)) {
        this.opacityImg = 2 * (this.$el.offsetHeight / 3) / window.scrollY
      }
      if (window.scrollY > this.$el.offsetHeight) {
        var vm = this
        setTimeout(function() {
          vm.hidden = true
          window.scrollTo(0, 0)
        }, 1)
        this.opacity = 0

        this.$emit('animateSplashContentIn')

        window.removeEventListener('scroll', this.beforeSplashHide);

      }
    },


    fetchContent: function() {
      this.$http.get('http://api.template-studio.nl/wp-json/wp/v2/pages?name="visual-splash"').then(function(response) {
        this.imageContent = response.body[0].acf.visual_content
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@include media("<tablet") {
    // * {
    //     display: none;
    // }
}

#beforesplash {
    // z-index: -1;
    min-height: 100vw;
    // margin-top:  $marginx1Desktop;
    position: relative;
    clear: both;
    overflow: hidden;
    background: #fffdf5;
    height: auto;
    h1,
    h2 {
        font-weight: normal;
    }

    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#fffdf5+93,f7f6ef+93,f7f6ef+100,f7f6ef+100&1+93,0+100 */
    background: -moz-linear-gradient(top, #fffdf5 96%, rgba(242,242,242,0) 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #fffdf5 96%,rgba(242,242,242,0) 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #fffdf5 96%,rgba(242,242,242,0) 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr= '#fffdf5', endColorstr='#00f7f6ef',GradientType=0 );
    /* IE6-9 */

    #beforesplashHeader {
        z-index: 1;
        position: fixed;
        width: 100%;
        cursor: pointer;
        background: #fffdf5;
        // transition: background $transition-timing-a/1.5;
        // -webkit-transition: background $transition-timing-a/1.5;
        //
        //
        //
        // -webkit-animation: pulse $transition-timing-a;  /* Safari 4.0 - 8.0 */
        // -webkit-animation-fill-mode: forwards; /* Safari 4.0 - 8.0 */
        // animation: pulse $transition-timing-a;
        // animation-fill-mode: forwards;
        // -webkit-animation-delay: 3s; /* Safari 4.0 - 8.0 */
        // animation-delay: 3s;
        @keyframes pulse {
            0% {
                background: #fffdf5;
            }
            100% {
                background: rgba(242,242,242,0.6);
            }
        }

        #hiddenHelper {
            span {
                line-height: $marginx1Desktop;
                color: white;
            }
            background: green;

            margin-top: -$marginx1Desktop;
            height: $marginx1Desktop;
            transition: margin-top $transition-timing-a;
            -webkit-transition: margin-top $transition-timing-a;
            text-align: center;
        }
        &:hover {

            // -webkit-animation: pulse2 $transition-timing-a;  /* Safari 4.0 - 8.0 */
            // animation: pulse2 $transition-timing-a;
            // -webkit-animation-delay: $transition-timing-a; /* Safari 4.0 - 8.0 */
            // animation-delay: $transition-timing-a;
            //
            // @keyframes pulse2 {
            //   0% {
            //     background: #fffdf5;
            //   }
            //   100% {
            //     background:  #fffdf5 ;
            //   }
            // }

            #hiddenHelper {
                margin-top: 0;
            }
        }

        #headerWrapper{
          position: relative;
          width: 100%;
          display: flex;


          #headerContent {
            background: #fffdf5;
            display: table;
            float: left;
            min-width: 33.333%;
            // width: 33.333%;

            -webkit-animation: width $transition-timing-a*2;  /* Safari 4.0 - 8.0 */
            -webkit-animation-fill-mode: forwards; /* Safari 4.0 - 8.0 */
            animation: width $transition-timing-a*2;
            animation-fill-mode: forwards;
            -webkit-animation-delay: 2s; /* Safari 4.0 - 8.0 */
            animation-delay: 2s;



            @keyframes width {
                0% {
                  min-width: 33.333%;

                }
                100% {
                    min-width: 100%;
                }
            }


            span {
              line-height: $marginx1Desktop;
              // padding-top: $defaultPadding;
              // padding-bottom: $defaultPadding;
              position: relative;
              &:first-of-type {
                padding-left: $defaultPadding;
                padding-right: $defaultPadding;
                float: left;

              }
              &:last-of-type {
                padding-right: $defaultPadding;
                float: right;
                text-align: right;
              }
            }
          }

          #headerSingleLine{
            background: green;
            // display: table;

            line-height: $marginx1Desktop;
            padding-left: $defaultPadding;
            padding-right: $defaultPadding;
            color: white;

            text-overflow: ellipsis;

            /* Required for text-overflow to do anything */
            white-space: nowrap;
            overflow: hidden;


            float: left;
            min-width: 66.666%;
            overflow: hidden;
            // margin-left: 50%;
            transition: min-width $transition-timing-a*2;
            -webkit-transition: min-width $transition-timing-a*2;
            // position: absolute;
          }
        }
    }

    #imageContainerWrapper {
        // padding-top: $marginx1Desktop + $defaultPadding;
    }

    .imageContainer {
        &:nth-of-type(1),
        &:nth-of-type(2) {
            padding-top: $marginx1Desktop + $defaultPadding*2;
        }

        &.largeContainer {
            width: 66.666%;
        }
        &.smallContainer {
            width: 33.333%;
        }

        width: 50%;
        height: calc(50vw - #{$defaultPadding*2});
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: $defaultPadding*2;

        .imageContainerInner {
            // height: 100px;
            width: 100%;
            // width: 100px;
            height: 100%;
            background-repeat: no-repeat;
            // background-attachment: fixed;
            background-position: center;
            // -webkit-background-size: cover;
            // -moz-background-size: cover;
            // -o-background-size: cover;
            // background-size: cover;
        }

        img {

            transition: opacity $transition-timing-a/1.5, top $transition-timing-a/1.5;
            -webkit-transition: opacity $transition-timing-a/1.5, top $transition-timing-a/1.5;
            opacity: 0;
            position: relative;
            top: $defaultPadding*2;

            // transition-delay:10s;
            // -webkit-transition-delay: $transition-timing-a*2;

            max-width: 100%;

            &.largeImage {
                max-width: 100%;
            }
            &.smallImage {
                max-width: 80%;

            }

        }

        img[lazy=loading] {
            /*your style here*/
            opacity: 0;
        }
        img[lazy=error] {
            /*your style here*/
        }
        img[lazy=loaded] {
            opacity: 1;
            -webkit-transition-delay: 1s;
            /* Safari */
            transition-delay: 1s;
            top: 0;

        }

    }

}
</style>
