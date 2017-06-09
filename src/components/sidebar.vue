<template>
<div v-bind:style="{'height':setSidebarHeight}" v-bind:class="{collapsedSidebar:!showSidebar}" id="sidebar">
  <div id="sidebarInnerWrapper">

    <div id="sidebarToggle">
      <div @click="emitToggleSideBar()" class="closeButton"> </div>
    </div>
    <div id="sidebarInnerContent">
      <div id="sidebarNav">
        <!-- <span>About</span>
        <span>Services</span>
        <span>Contact</span> -->

        <span @click="setQueryAndScroll('sidebarWho')">Who</span>
        <span @click="setQueryAndScroll('sidebarWhat')">What</span>
        <span @click="setQueryAndScroll('sidebarWhere')">Where</span>

      </div>
      <div id="sidebarWhat" class="sidebarElement" v-if="contentSidebar.acf">

        <div v-for="item in contentSidebar.acf.sidebar_what">
          <div v-if="item.acf_fc_layout==='text'" v-html="item.text">
          </div>
          <div class="circularImage" v-if="item.acf_fc_layout==='image'">
            <img :src="item.image_circular.url"/>
          </div>
        </div>
      </div>
      <div id="sidebarWho" class="sidebarElement" v-if="contentSidebar.acf">

        <div v-for="item in contentSidebar.acf.sidebar_who">
          <div v-if="item.acf_fc_layout==='text'" v-html="item.text">
          </div>
          <div class="circularImage" v-if="item.acf_fc_layout==='image'">
            <img :src="item.image_circular.url"/>
          </div>
        </div>
      </div>

      <div id="sidebarWhere" class="sidebarElement" v-if="contentSidebar.acf">

        <div v-for="item in contentSidebar.acf.sidebar_where">
          <div v-if="item.acf_fc_layout==='text'" v-html="item.text">
          </div>
          <div class="circularImage" v-if="item.acf_fc_layout==='image'">
            <img :src="item.image_circular.url"/>
          </div>
        </div>
      </div>
      <!-- <span id="camera">camera</span> -->

    </div>
    <div id="sidebarBackground">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: '',
  props: ['showSidebar', 'setSidebarHeight', 'contentSidebar'],
  data() {
    return {
      // content:''

    }
  },


  methods: {
    emitToggleSideBar: function() {
      this.$emit('emitToggleSideBar')

    },

    emitResizeSidebar: function() {
      this.emitSidebarHeight()
      this.$emit('emitResizeSidebar')

    },

    emitSidebarHeight: function() {
      this.$emit('emitSidebarHeight', this.$el.querySelector('#sidebarInnerContent').scrollHeight + 40)

    },

    setQueryAndScroll: function(id) {
      this.$router.push({
        path: 'studio',
        query: {
          part: id
        }
      })

      // router.replace(...)
      // this.smoothScrollToId(id, 0)
    },

    smoothScrollToId: function(id, timeout) {
      var vm = this
      if (Number.isInteger(id)) {
        setTimeout(function() {

          vm.$el.querySelector("#" + id).scrollIntoView({
            behavior: 'smooth'
          });


          // vm.$SmoothScroll(id, 500);
        }, timeout)

      } else {
        setTimeout(function() {
          vm.$el.querySelector("#" + id).scrollIntoView({
            behavior: 'smooth'
          });

          // vm.$SmoothScroll(vm.$el.querySelector("#" + id), 500);
        }, timeout)
      }

    },

  },


  watch: {

    '$route' (to, from) {
      if (to.path === '/studio') {
        this.$emit('emitSidebarHeight', this.$el.querySelector('#sidebarInnerContent').scrollHeight + 40)

      }

      if (to.query.part && this.$route.path === '/studio') {
        var vm = this
        if (from.path === '/studio') {
          this.smoothScrollToId(to.query.part, 0)
        } else {
          this.smoothScrollToId(to.query.part, 500)
        }
      }

      if (!to.query.part && this.$route.path === '/studio') {
        // this.smoothScrollToId(0, 0)
      }


      if (from.path === '/studio') {
        this.$emit('emitSidebarHeight', this.$el.querySelector('#sidebarInnerContent').scrollHeight + 40)

      }


    },

    contentSidebar: function(val) {
      var vm = this
      vm.$emit('emitSidebarHeight', vm.$el.querySelector('#sidebarInnerContent').scrollHeight + 40)

      //
      setTimeout(function() {
        vm.$emit('emitSidebarHeight', vm.$el.querySelector('#sidebarInnerContent').scrollHeight + 40)

      }, 100)

      setTimeout(function() {
        vm.$emit('emitSidebarHeight', vm.$el.querySelector('#sidebarInnerContent').scrollHeight + 40)

      }, 200)

      setTimeout(function() {
        vm.$emit('emitSidebarHeight', vm.$el.querySelector('#sidebarInnerContent').scrollHeight + 40)
        // vm.$el.querySelector("#"+vm.$route.query.part).scrollIntoView({ behavior: 'smooth' });
      }, 500)



      // setTimeout(function() {
      //   vm.$emit('emitSidebarHeight', vm.$el.querySelector('#sidebarInnerContent').scrollHeight+40)
      //
      // }, 1000)


    },
  },

  mounted() {

    var vm = this

    // setTimeout(function() {
    //   vm.emitSidebarHeight()
    // }, 100)

    window.addEventListener('resize', _.debounce(function() {
      // vm.emitSidebarHeight()
      if (vm.showSidebar) {

        vm.$emit('emitSidebarHeight', vm.$el.querySelector('#sidebarInnerContent').scrollHeight + 40)
      }

    }, 500));



    // var refreshIntervalIds = setInterval(vm.emitSidebarHeight(), 500);
  },

  created() {

    // if (this.$route.query.part && this.$route.path === '/studio') {
    //   var vm = this
    //   this.$el.querySelector("#"+this.$route.query.part).scrollIntoView({ behavior: 'smooth' });
    //   // this.smoothScrollToId(this.$route.query.part, 800)
    // }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@include media("<tablet") {
    * {
        // display: none;
    }
}

#sidebar {

    #sidebarBackground {
        // background: red;
        background: green;
        position: fixed;
        width: calc(100% - 173px);
        height: 90px;
        margin-top: -$defaultPadding;
        margin-left: -$defaultPadding;
        @include media("<tablet") {
            width: 100%;

        }

    }

    .sidebarElement {

        padding-top: $marginx1Desktop;
        margin-top: -$defaultPadding*2;

    }

    #sidebarInnerWrapper {
        width: 100%;
        position: relative;
    }

    #sidebarNav {
        position: fixed;
        z-index: 9999;

    }

    #sidebarToggle {
        position: fixed;
        z-index: 9999;
        float: left;
        .closeButton {
            width: 50px;
            height: 50px;
            cursor: pointer;
            background-size: cover;
            background-position: center;
            background-image: url("../assets/svg/crossw.svg");
            background-size: cover;
        }
    }

    #sidebarInnerContent {
        position: relative;
        width: calc(100% - 70px);
        float: left;
        padding-right: $marginx1Desktop;
        margin-left: $marginx1Desktop;

        .circularImage{
          width: 100%;
          img{
            width: 100%;
            
            margin: 0 auto;
            display: block;
            border-radius: 100%;
          }
        }
    }

    #sidebarInnerContentActual {}

    color: #fffdf5;
    // min-height: 100vh;
    overflow: hidden;
    height: auto;
    float: right;

    &.collapsedSidebar {
        // margin-right:-50%;
        margin-right: calc(-100% - 173px);

        // max-height: 100vh;
        overflow: hidden;
        // overflow-x: scroll;
        @include media("<tablet") {
            margin-right: -100%;
        }

    }

    transition: margin-right $transition-timing-a;
    -webkit-transition: margin-right $transition-timing-a;

    padding: $defaultPadding;
    margin-right: 0;
    // width: 50%;
    width: calc(100% - 173px);
    @include media("<tablet") {
        width: 100%;
    }
    right: 0;
    position: absolute;
    // min-height: 100%;
    background: green;
    z-index: 9;
}
</style>
<style lang="scss">
@import "../assets/scss/base.scss";

#sidebarInnerContentActual {
    & > *:first-child {
        margin-top: 0;
    }
}

.sidebarElement {
    & > *:first-child {
        margin-top: $marginx1Desktop;
    }
}
</style>
