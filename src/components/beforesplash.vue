<template>
<div  v-if="!hidden" id="beforesplash" :style="{'opacity':opacity}">
  <div>
    <div id="beforesplashHeader" @click="gotoIntro">
      <div id="hiddenHelper">
        <span>What's the fuss about. . .</span>
      </div>
      <div id="headerContent">
        <span>
            TEMPLATE
          </span>
        <span>
            STUDIO
          </span>
      </div>
    </div>
    <div id="imageContainerWrapper">
      <div  v-bind:style="{'background':item.background}" v-for="item in imageContent" class="imageContainer" :class="{smallContainer : item.outer_size === 'Small', largeContainer : item.outer_size === 'Large' }">
        <!-- <div :style="{'background-image':'url('+item.image.sizes.large+')'}" class="imageContainerInner" :class="{smallImage : item.inner_size === 'Small', largeImage : item.inner_size === 'Large' }" ></div> -->
        <img  :style="{'opacity':opacityImg}" :src="item.image.sizes.large" :class="{smallImage : item.inner_size === 'Small', largeImage : item.inner_size === 'Large' }" />
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
      opacityImg: 1
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

      if (window.scrollY > 2*(this.$el.offsetHeight/3)) {
        this.opacityImg = 2*(this.$el.offsetHeight/3)/window.scrollY
      }
      if (window.scrollY > this.$el.offsetHeight) {
        var vm = this
        setTimeout(function(){
          vm.hidden = true
          window.scrollTo(0, 0)
        },1)
        this.opacity = 0

        window.removeEventListener('scroll', this.beforeSplashHide);

      }
    },



    // beforeSplashHide: function() {
    //   if(window.scrollY < 1110){
    //     if(!this.locked){
    //       console.log('small')
    //
    //       this.setMarginTop = window.scrollY * -1
    //     }
    //
    //   }else{
    //     console.log('man')
    //     this.locked = true
    //
    //     this.setMarginTop = -1110/2
    //   }
    // },
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
    background: #f2f2f2;
    height: auto;
    h1,
    h2 {
        font-weight: normal;
    }

    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f2f2f2+93,f2f2f2+93,f2f2f2+100,f2f2f2+100&1+93,0+100 */
    background: -moz-linear-gradient(top, rgba(242,242,242,1) 96%, rgba(242,242,242,0) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(242,242,242,1) 96%,rgba(242,242,242,0) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(242,242,242,1) 96%,rgba(242,242,242,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f2f2f2', endColorstr='#00f2f2f2',GradientType=0 ); /* IE6-9 */


    #beforesplashHeader {
        z-index: 1;
        position: fixed;
        width: 100%;
        cursor: pointer;
        background: #f2f2f2;
        #hiddenHelper {
            span {
                line-height: $marginx1Desktop + $defaultPadding;
                color: white;
            }
            background: green;

            margin-top: -$marginx1Desktop - $defaultPadding;
            height: $marginx1Desktop + $defaultPadding;
            transition: margin-top $transition-timing-a;
            -webkit-transition: margin-top $transition-timing-a;
            text-align: center;
        }
        &:hover {
            #hiddenHelper {
                margin-top: 0;
            }
        }

        #headerContent {
            span {
                padding-top: $defaultPadding;
                padding-bottom: $defaultPadding;
                position: relative;
                top: 3px;
                &:first-of-type {
                    padding-left: $defaultPadding;
                    float: left;

                }
                &:last-of-type {
                    padding-right: $defaultPadding;
                    float: right;
                    text-align: right;
                }
            }
        }
    }

    #imageContainerWrapper {
        padding-top: $marginx1Desktop + $defaultPadding;
    }

    .imageContainer {

        &.largeContainer {
            width: 66.666%;
        }
        &.smallContainer {
            width: 33.333%;
        }

        width: 50%;
        height: 45vw;
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
            max-width: 100%;

            &.largeImage {
                max-width: 100%;
            }
            &.smallImage {
                max-width: 80%;

            }

        }
    }

}
</style>
