<template>
<div v-bind:style="[{position: sidebar ? 'relative' :checkdeviceposition() ,'min-height':windowheight}]" id="splashAreaWrapper">

  <div v-bind:style="{'height':setContainerHeight}" v-bind:class="{collapsedSplash:sidebar}" id="splashArea" class="">

    <div id="splashAreaInner" v-bind:style="{'min-height':windowheight}">

      <div id="bottomBar">
        <div id="projects" @click='goToProjectList()' @mouseover="mouseOverProjects()" @mouseout="mouseOffProjects()" v-bind:class="[{ isHovered: mouseOverProjectsShow }]">

          <p v-if="!hideincontact" >
            Projects
          </p>
          <div id="projectBar" :style="{'bottom':-1*(projectBarHeight+20)+'px','height':projectBarHeight+'px'}">
            <span :style="{'line-height':projectBarHeight+'px'}">A selection of projects</span>
          </div>
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
            <span>Read more about our studio</span>
          </div>
        </div>
      </div>


      <!-- <splashcontent v-bind:contentSplash="contentAll"></splashcontent> -->
      <slot   v-bind:contentSplash="contentAll"></slot>


      <!-- <router-link :to="{ path: '/studio', query: {part:'camera'}}">Camera</router-link> -->




    </div>


  </div>

  <sidebar v-on:emitSidebarHeight="function(value){setAndCheckContainers(value)}" v-bind:setSidebarHeight="setSidebarHeight" v-on:emitToggleSideBar="toggleSidebar()" v-bind:showSidebar="sidebar" v-bind:contentSidebar="contentAll"></sidebar>

</div>
</template>

<script>
import sidebar from './sidebar'
// import splashcontent from './splashcontent'

export default {
  components: {
    sidebar,
    // splashcontent
  },
  props: ['windowheight', 'itsMobile','passedAnimateSidebarAndProject','popupSidebarProp','popupProjectsProp'],
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
      mouseOverProjectsShow: false,
      projectBarHeight:0,


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


    mouseOverProjects: function() {
      // if (!this.sidebar) {
        // this.mouseOverStudioShow = true
        this.mouseOverProjectsShow = true

      // }
    },
    mouseOffProjects: function() {
      this.mouseOverProjectsShow = false
      // this.mouseOverStudioShow = true

    },


    mouseOverStudio: function() {
      if (!this.sidebar) {
        // this.mouseOverStudioShow = true
        this.mouseOverStudioShow = true

      }
    },
    mouseOffStudio: function() {
      this.mouseOverStudioShow = false
      // this.mouseOverStudioShow = true

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

        var beforesplashHeight

      if(document.querySelector("#beforesplash")){
        beforesplashHeight = document.querySelector("#beforesplash").offsetHeight
      }else{
        beforesplashHeight = 0
      }

      if (window.scrollY > window.outerHeight + beforesplashHeight - 200) {
        this.hideincontact = true
      } else {
        this.hideincontact = false

      }
    },

    setHeightProjectBar: function(){
      // this.$el
      this.projectBarHeight = this.$el.querySelector('#bottomBar').offsetHeight + 36
    }
  },

  created: function() {
    this.$http.get('http://api.template-studio.nl/wp-json/wp/v2/pages?slug=index').then(function(response) {
      this.contentAll = response.body[0]
    }).then(function() {

    })
  },



  mounted() {

    this.setContainerHeightMethod()
    this.setHeightProjectBar()

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

    'popupSidebarProp': function(){
      var vm = this
      vm.mouseOverStudioShow = true

      setTimeout(function(){
        vm.mouseOverStudioShow = false
      },2000)
    },


    'popupProjectsProp': function(){
      var vm = this
      vm.mouseOverProjectsShow = true


      setTimeout(function(){
        vm.mouseOverProjectsShow = false
      },2000)
    },

    'passedAnimateSidebarAndProject': function() {
      // alert('change')
      if(this.$route.path ==='/'){
        // var vm = this
        // setTimeout(function(){
        //   vm.mouseOverStudioShow = true
        // },2000)
        //
        // setTimeout(function(){
        //   vm.mouseOverStudioShow = false
        // },4000)
        //
        // setTimeout(function(){
        //   vm.mouseOverProjectsShow = true
        // },6000)
        //
        // setTimeout(function(){
        //   vm.mouseOverProjectsShow = false
        // },10000)
      }


    },

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
    background: #fffdf5;

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
            display: inline-block;
                height: 100%;
            // position: absolute;
            p {
              bottom: -($defaultPadding+70+8);
              padding-bottom: 70px;
              padding-left: -$defaultPadding;
                left: 0;
                margin-bottom: $defaultPadding;
                cursor: pointer;
                position: absolute;
                transition: bottom $transition-timing-a;
                -webkit-transition: bottom $transition-timing-a;

            }

            #projectBar{
              cursor: pointer;
              background: green;
              position: absolute;
              width: calc(100% + #{$defaultPadding*2};
              margin-left: -$defaultPadding;
              bottom:-($defaultPadding+$marginx1Desktop);
              height: $marginx1Desktop;
              z-index:1;
              transition: bottom $transition-timing-a;
              -webkit-transition: bottom $transition-timing-a;
              padding-left: $defaultPadding;

              span{
                color: white;
                line-height: $marginx1Desktop;
                text-align: center;
                width: 100%;
                display: block;
              }
            }

            &.isHovered{
              #projectBar{
                bottom:-$defaultPadding !important;
              }
              p {
                bottom:($marginx1Desktop - (70-10));

              }

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
              @include media("<desktop") {
                width: 50%;
              }


              float: left;
              padding-right:$defaultPadding;
            }
        }

    }
    #topBar {

        #template {
            float: left;
            position: relative;
        }

        line-height: $marginx1Desktop;

    }

    #toggleSidebar {

        #studio {
          line-height: $marginx1Desktop;

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

        cursor: pointer;

        #toggleSidebarWrapper {
            width: $defaultPadding * 2 + 30;
            // margin-left: $defaultPadding*2;
            background: green;
            color: #fffdf5;
            position: absolute;
            right: - $defaultPadding * 2 - 30 - $defaultPadding;
            height: 100vh;
            top: 0;
            padding-top: $defaultPadding;
            padding-left: $defaultPadding/2;
            padding-right: $defaultPadding/2;
            .openButton {
                // width: 50px;
                // height: 50px;
                cursor: pointer;
                // background-size: cover;
                // background-position: center;
                // background-image: url("../assets/svg/sidew.svg");
                // background-size: cover;

                span {
                    -webkit-transform: rotate(90deg);
                    -moz-transform: rotate(90deg);
                    -ms-transform: rotate(90deg);
                    -o-transform: rotate(90deg);
                     left: -$marginx1Desktop/2;
                    // margin-top: -10px;
                    left: calc(-50vh + 28px);
                    position: absolute;
                    /* text-align: center; */
                    top: calc(50vh - 14px);
                    width: 100vh;
                    text-align: center;

                }


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
      padding-right: $defaultPadding;
      padding-left: $defaultPadding;
        padding-bottom: $defaultPadding;
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
