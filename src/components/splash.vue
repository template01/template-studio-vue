
<template>
<div id="splashAreaWrapper">
  <div v-bind:style="{'height':setContainerHeight}" v-bind:class="{collapsedSplash:sidebar}" id="splashArea" class="">

    <div id="splashAreaInner">
      <div id="topBar">
        <div id="template">
          <span>
              TEMPLATE
            </span>
        </div>


        <div id="toggleSidebar">
          <span @click="toggleSidebar()">
              STUDIO
            </span>
        </div>
      </div>

        <splashcontent v-bind:contentSplash="contentAll"></splashcontent>




    </div>


  </div>

  <sidebar v-on:emitSidebarHeight="function(value){ sidebarHeight = value+'px'; setAndCheckContainers()}" v-bind:setSidebarHeight="setSidebarHeight" v-on:emitToggleSideBar="toggleSidebar()" v-bind:showSidebar="sidebar" v-bind:contentSidebar="contentAll"></sidebar>
</div>
</template>

<script>
import sidebar from './sidebar'
import splashcontent from './splashcontent'

export default {
  components: {
    sidebar, splashcontent
  },

  name: '',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      sidebar: false,
      sidebarHeight: '0px',
      containerHeight: '0px',
      setContainerHeight: 'auto',
      setSidebarHeight: 'auto',
      contentAll:''


    }
  },
  methods: {
    toggleSidebar: function() {
      if (this.$route.hash === '#studio') {
        this.$router.push({
          hash: ''
        })
      } else {
        this.$router.push({
          hash: 'studio'
        })
      }
    },

    setAndCheckContainers: function() {

      if (this.containerHeight < parseFloat(this.sidebarHeight)) {
        this.setContainerHeight = this.sidebarHeight
      } else {
        this.containerHeight = this.$el.querySelector('#splashArea').scrollHeight
        this.setSidebarHeight = this.containerHeight + 'px'
      }

    }
  },

  created: function() {
    this.$http.get('http://api.template-studio.nl/wp-json/wp/v2/pages').then(function(response) {
      this.contentAll = response.body[0]
    }).then(function() {
      this.containerHeight = this.$el.querySelector('#splashArea').scrollHeight
      var vm = this

      setTimeout(function() {
        vm.containerHeight = vm.$el.querySelector('#splashArea').scrollHeight
        console.log(vm.$el.querySelector('#splashArea').scrollHeight)
        console.log(vm.sidebarHeight)
      }, 100)

    })
  },



  mounted() {


    if (this.$route.hash === '#studio') {
      this.sidebar = true

    }

    var vm = this
    window.addEventListener('resize', _.debounce(function() {
      if (vm.$route.hash === '#studio') {
        vm.setAndCheckContainers()
      }
    }, 500));


  },
  watch: {
    '$route' (to, from) {
      if (to.hash === '#studio') {
        this.sidebar = true
        // this.setAndCheckContainers()
      }
      if (from.hash === '#studio') {
        this.sidebar = false
        this.setContainerHeight = 'auto'
      }
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

#splashAreaWrapper {
    min-height: 100vh;
    background: rgb(242, 242, 242);

    display: flex;

}

#splashArea {

    // max-height: 1158px;
    overflow: hidden;
    float: left;

    #template {
        float: left;
    }

    #toggleSidebar {
        float: right;
        text-align: right;
    }
    // position: relative;
    &.collapsedSplash {
        // margin-left: -50%;
        margin-left: calc(-100% + 173px);
        @include media("<tablet") {
            margin-left: -100%;
        }
    }
    width: 100%;
    height: auto;
    transition: margin-left $transition-timing-a;
    -webkit-transition: margin-left $transition-timing-a;
    #splashAreaInner {
        padding: $defaultPadding;
        // min-height: 100vh;
        min-height: 100vh;

        // background: rgb(242, 242, 242) ;

        width: 100%;
        top: 0;
        // display: flex;
        // align-content: center;
        // justify-content: center;

        // p{
        // align-self: center;
        // }
    }
}
</style>
