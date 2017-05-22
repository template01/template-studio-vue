<template>
<div v-bind:style="[{position: sidebar ? 'relative' :checkdeviceposition() ,'min-height':windowheight}]" id="splashAreaWrapper">




  <div v-bind:style="{'height':setContainerHeight}" v-bind:class="{collapsedSplash:sidebar}" id="splashArea" class="">

    <div id="splashAreaInner" v-bind:style="{'min-height':windowheight}">



      <div id="bottomBar">
        <div id="projects">

          <p v-if="!hideincontact" @click='goToProjectList()'>
            Projects
          </p>
        </div>
        <div class="smallText" id="contact">
          <p>
            Get in touch:
            <br /> hi@template-studio.nl
            <br /> +31 (0)6 57 77 28 91<br />
          </p>
          <p>
            Studio address:
            <br /> Mathenesserdijk 416h
            <br />Rotterdam (NL)
          </p>
        </div>
      </div>

      <div id="topBar">
        <div id="template">
          <span>
              TEMPLATE
            </span>
        </div>

      </div>

      <div id="toggleSidebar" @click="toggleSidebar()" @mouseover="mouseOverStudio()" @mouseout="mouseOffStudio()" v-bind:class="[{ isHovered: mouseOverStudioShow }]">
        <span id="studio">
          STUDIO
        </span>
        <div id="toggleSidebarWrapper">
          <div class="openButton">
          </div>
        </div>
      </div>


      <splashcontent v-bind:contentSplash="contentAll"></splashcontent>



      <!-- <router-link :to="{ path: '/studio', query: {part:'camera'}}">Camera</router-link> -->




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
  props: ['windowheight', 'itsMobile'],
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
      hideincontact: false,
      mouseOverStudioShow: false,


    }
  },
  methods: {

    goToProjectList: function() {
      document.querySelector("#projectlist").scrollIntoView({
        behavior: "smooth"
      })
    },

    checkdeviceposition: function() {
      if (this.itsMobile) {
        return 'relative'

      } else {
        return 'fixed'

      }
    },


    mouseOverStudio: function() {
      if (!this.sidebar) {
        this.mouseOverStudioShow = true
      }
    },
    mouseOffStudio: function() {
      this.mouseOverStudioShow = false

    },
    toggleSidebar: function() {
      if (this.$route.path === '/studio') {
        if (window.scrollY > window.outerHeight / 2) {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
          var vm = this
          setTimeout(function() {
            vm.$router.push({
              path: '/'
            })
          }, 500)
        } else {
          window.scroll(0, 0);
          this.$router.push({
            path: '/'
          })
        }


      } else {

        if (window.scrollY > window.outerHeight / 2) {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
          var vm = this
          setTimeout(function() {
            vm.mouseOverStudioShow = false

            vm.$router.push({
              path: 'studio'
            })
          }, 500)
        } else {
          window.scroll(0, 0);
          this.mouseOverStudioShow = false

          this.$router.push({
            path: 'studio'
          })
        }



      }
    },

    setAndCheckContainers: function(inputSidebarHeight) {

      if (this.$route.path === "/studio") {

        if (this.$el.querySelector('#splashAreaInner').scrollHeight < inputSidebarHeight) {
          this.setContainerHeight = inputSidebarHeight + 'px'
          this.setSidebarHeight = inputSidebarHeight + 'px'


        } else {
          this.setContainerHeight = 'auto'
          this.setSidebarHeight = this.$el.querySelector('#splashAreaInner').scrollHeight + 'px'
        }

      } else {

        this.setContainerHeight = 'auto'

      }
    },

    setContainerHeightMethod: function() {
      this.$emit('setContactAreaHeight', this.$el.querySelector("#contact").offsetHeight + 20)

    },

    checkHidersContact: function() {
      if (window.scrollY > window.outerHeight - 200) {
        this.hideincontact = true
      } else {
        this.hideincontact = false

      }
    }
  },

  created: function() {
    this.$http.get('http://api.template-studio.nl/wp-json/wp/v2/pages').then(function(response) {
      this.contentAll = response.body[0]
    }).then(function() {

    })
  },



  mounted() {

    this.setContainerHeightMethod()
    if (this.$route.path === '/studio') {
      this.sidebar = true

    }


    //
    // if(!this.itsMobile){
    //   // alert(this.itsMobile)
    //   window.addEventListener('scroll', _.throttle(function() {
    //     vm.checkHidersContact()
    //   }, 100));
    // }



  },
  watch: {

    'sidebar': function() {
      if (this.sidebar) {
        this.$emit('inStudio', true)
      } else {
        this.$emit('inStudio', false)
      }
    },

    'itsMobile': function() {
      // alert('changed')
      var vm = this

      window.addEventListener('scroll', _.throttle(function() {
        vm.checkHidersContact()
      }, 100));
    },
    '$route' (to, from) {
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
<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@include media("<tablet") {
    * {
        // display: none;
    }
}

#splashAreaWrapper {
    background: rgb(242, 242, 242);

    display: flex;

    // position: fixed;
    width: 100%;
    top: 0;

}

#splashArea {

    // max-height: 1158px;
    overflow: hidden;
    float: left;
    position: relative;

    #bottomBar {
        position: absolute;
        width: calc(100% - 40px);
        // bottom: calc(50% + -30px);
        bottom: $defaultPadding;
        p {
            margin: 0;
        }
        #projects {
            float: left;
            width: 33.333%;
            p {
                position: absolute;
                bottom: 0;
                cursor: pointer;

            }
        }

        #contact {
            // float: right;
            width: 66.666%;

            float: right;
            // text-align: right;
            position: relative;

            p{
              width: 33.333%;
              float: left;
              padding-right:$defaultPadding;
            }
        }

    }
    #topBar {

        #template {
            float: left;
            position: relative;
            top: 3px;
        }

    }

    #toggleSidebar {

        #studio {
            padding-right: $defaultPadding;
            margin-right: -$defaultPadding;

            padding-top: $defaultPadding;
            margin-top: -$defaultPadding;

            padding-bottom: $defaultPadding;
        }
        &.isHovered {
            margin-right: $defaultPadding * 2 + 30;
        }

        transition: margin-right $transition-timing-a/2;
        -webkit-transition: margin-right $transition-timing-a/2;

        float: right;
        text-align: right;
        position: relative;
        top: 3px;

        cursor: pointer;

        #toggleSidebarWrapper {
            width: $defaultPadding * 2 + 30;
            // margin-left: $defaultPadding*2;
            background: green;
            color: rgb(242, 242, 242);
            position: absolute;
            right: - $defaultPadding * 2 - 30 - $defaultPadding;
            height: 100vh;
            top: -$defaultPadding - 3px;
            padding-top: $defaultPadding;
            padding-left: $defaultPadding/2;
            padding-right: $defaultPadding/2;
            .openButton {
                width: 50px;
                height: 50px;
                cursor: pointer;
                background-size: cover;
                background-position: center;
                background-image: url("../assets/svg/sidew.svg");
                background-size: cover;
            }
        }
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
