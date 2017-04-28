hash: 'studio', query: { plan: 'private' }


<template>
<div id="splashAreaWrapper">
  <div v-bind:style="{'height':setContainerHeight}" v-bind:class="{collapsedSplash:sidebar}" id="splashArea" class="">

    <div id="splashAreaInner" v-bind:style="{'min-height':initWindowHeight}">
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

      <!-- <router-link :to="{ path: '/studio', hash: 'camera'}">User</router-link> -->
      <router-link :to="{ path: '/studio', query: {part:'camera'}}">Camera</router-link>




    </div>


  </div>

  <sidebar v-on:emitSidebarHeight="function(value){setAndCheckContainers(value)}" v-bind:setSidebarHeight="setSidebarHeight" v-on:emitToggleSideBar="toggleSidebar()" v-bind:showSidebar="sidebar" v-bind:contentSidebar="contentAll"></sidebar>
</div>
</template>

<script>
import sidebar from './sidebar'
import splashcontent from './splashcontent'

export default {
  components: {
    sidebar,
    splashcontent
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
      contentAll: '',
      initWindowHeight: '1000px',


    }
  },
  methods: {
    toggleSidebar: function() {
      if (this.$route.path === '/studio') {
        this.$router.push({
          path: '/'
        })
        window.scroll(0,0);


      } else {
        this.$router.push({
          path: 'studio'
        })
      }
    },

    setAndCheckContainers: function(inputSidebarHeight) {


      console.log('sidebar height: ' + inputSidebarHeight)
      console.log('splashinner height: ' + this.$el.querySelector('#splashAreaInner').scrollHeight)

      if (this.$route.path === "/studio") {

        console.log('studio')

        if (this.$el.querySelector('#splashAreaInner').scrollHeight < inputSidebarHeight) {
          this.setContainerHeight = inputSidebarHeight + 'px'
          this.setSidebarHeight = inputSidebarHeight + 'px'

          console.log('small splash')

        } else {
          console.log('big splash')
          this.setContainerHeight = 'auto'

          this.setSidebarHeight = this.$el.querySelector('#splashAreaInner').scrollHeight + 'px'
        }

      } else {

        this.setContainerHeight = 'auto'

        console.log('not studio')

      }
    }
  },

  created: function() {
    this.$http.get('http://api.template-studio.nl/wp-json/wp/v2/pages').then(function(response) {
      this.contentAll = response.body[0]
      this.initWindowHeight = window.innerHeight+"px"
    }).then(function() {})
  },



  mounted() {


    if (this.$route.path === '/studio') {
      this.sidebar = true

    }

    var vm = this


  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      if (to.path === '/studio') {
        this.sidebar = true
      }
      if (to.path === '/') {
        this.sidebar = false
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
    background: rgb(242, 242, 242);

    display: flex;

}

#splashArea {

    // max-height: 1158px;
    overflow: hidden;
    float: left;

    #template {
        float: left;
        position: relative;
        top:3px;
    }

    #toggleSidebar {
        float: right;
        text-align: right;
        position: relative;
        top:3px;
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
        min-height: 1000px;
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
