<template>
<div class="projectitem addMarginX1TopBottom">
  <div>
    <div class="smallText additionalFirst addMarginX2Sides">
      <div>
        <p v-html="projectContent.title.rendered">
        </p>
      </div>

    </div>

    <!-- <div class="addMarginX2Sides"  v-html="projectContent.acf['item_year']"></div> -->
    <div class="addMarginX1Sides addMarginX1Bottom" v-html="projectContent.acf['item_text']"></div>
    <swiper v-if="projectContent.acf['item_media']" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <!-- {{projectContent.acf['item_media']}} -->
      <swiper-slide v-bind:style="{'height':initialSwiperHeight}" class="maxWidthAdjustedToMarginX1" v-for="image in projectContent.acf['item_media']" :key="image">
        <!-- <img width="100%" v-bind:src="projectContent.acf['customfeaturedimage'].url" /> -->
        <img width="100%" v-bind:data-src="image.image.url" class="swiper-lazy" />
        <div class="swiper-lazy-preloader">WAIT</div>

        <p v-if="showLabel" v-html="image.label"></p>
        <!-- {{image}} -->
      </swiper-slide>
      <div class="swiper-button-prev swiper-button-black" slot="button-prev">P</div>
      <div class="swiper-button-next swiper-button-black" slot="button-next">N</div>
    </swiper>
    <div class="smallText additional addMarginX2Sides">
      <div>
        <p>
          YEAR:
        </p>
        <p v-text="projectContent.acf['item_year']"></p>
      </div>
      <div>
        <p>
          CLIENT/PARTNER:
        </p>
        <p v-html="projectContent.acf['item_client']"></p>
      </div>
      <div>
        <p>
          SERVICE:
        </p>
        <p><span v-for="(item, index) in projectContent.acf['item_services']"><span v-html="item"></span><span v-if="index+1<projectContent.acf['item_services'].length">, </span></span></p>
      </div>
      <div>
        <p>
          TECHNOLOGIES:
        </p>
        <p><span v-for="(item, index) in projectContent.acf['item_techno']"><span v-html="item"></span><span v-if="index+1<projectContent.acf['item_techno'].length">, </span></span></p>


      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {

  props: ['projectContent'],

  data() {
    return {

      showLabel: false,
      msg: 'Welcome to Your Vue.js App',
      initialSwiperHeight: '0px',
      swiperOption: {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        // autoplay: 3000,
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,

        lazyLoading: true,
        paginationClickable: true,
        // updateOnImagesReady: true,
        lazyLoadingInPrevNextAmount: 30,
        lazyLoadingInPrevNext: true,
        onLazyImageReady: function(swiper) {
          swiper.updateAutoHeight()
        },
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        // scrollbar: '.swiper-scrollbar',
        // mousewheelControl: true,
        observeParents: true,
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true,
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        onTransitionStart(swiper) {
          // console.log(swiper)
          // console.log(this)
          // swiper.alert()

        },
        // more Swiper configs and callbacks...
        // ...
      }
    }
  },

  // you can find current swiper instance object like this, while the notNextTick property value must be true
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    alert: function() {
      alert('heyy')
    }
  },

  created() {

    // this.initialSwiperHeight = this.$el.querySelectorAll('.addMarginX1Sides')[0].offsetWidth / (this.projectContent.acf['item_media'][0].image.width / this.projectContent.acf['item_media'][0].image.height) + 'px'
    // this.initialSwiperHeight = '100000px'
  },
  mounted() {
    console.log(this.$el)
    console.log()
    // you can use current swiper instance object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了

    if (this.projectContent.acf['item_media']) {

      this.initialSwiperHeight = this.$el.querySelectorAll('.addMarginX1Sides')[0].offsetWidth / (this.projectContent.acf['item_media'][0].image.width / this.projectContent.acf['item_media'][0].image.height) + 10 + 'px'

      var vm = this
      this.swiper.on('onLazyImageReady', function() {
        setTimeout(function() {
          vm.initialSwiperHeight = ''
          vm.showLabel = true
        }, 500)


      });


    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../assets/scss/base.scss";
@include media("<tablet") {
    * {
        // display: none;
    }
}

.swiper-slide {
    p {
      margin-top: 0;
        margin-bottom: $marginx1Desktop;
        text-align: center;
        transition: max-height 5s;
        -webkit-transition: max-height 5s;
    }
}

.swiper-lazy {
    img {
        display: inline-block;
    }
}

.swiper-button-next,
.swiper-button-prev {
    background: transparent !important;
    text-align: center;
}

.swiper-lazy-preloader::after {
    background: transparent !important;
}
.swiper-lazy-preloader {
    width: 90px;
    height: 90px;
    margin-left: -45px;
    margin-top: -45px;
    line-height: 0;
    -webkit-animation: swiper-preloader-spin 1s infinite;
    -moz-animation: swiper-preloader-spin 1s infinite;
    animation: swiper-preloader-spin 1s infinite;
}
.additionalFirst{
    p{
      margin-top: 0;
    }
}


.additional{
  div{
    p:first-of-type{
      margin-top: 0;
    }
    width:15%;
    float: left;
  }
}
</style>
<style lang="scss" >@import "../assets/scss/base.scss";

.maxWidthAdjustedToMarginX1 {
    padding-left: 70px;
    padding-right: 70px;
}
@include media("<tablet") {
    * {
        // display: none;
    }
}
</style>
