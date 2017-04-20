<template>
<div id="projectlist" class="">
  <div id="projectlistHeader">
    <div>
      <span>Digital</span>
    </div>
    <div>
      <span>Hybrid</span>
    </div>
    <div>
      <span>Analog</span>
    </div>
  </div>
  <div class="projectSingle" v-for="(project, index) in projectlistArray">
    <div class="projectSingleInner">
      <div class="projectSingleInnerTitle">
        <div v-bind:style="{'height':projectlistArray[index].initialHeight+'px'}" v-if="projectlistArray[index].position === 'fixed'" class="projectSingleInnerTitleBackground"></div>
        <div v-bind:data-scale="projectlistArray[index].typeScale" v-bind:style="{'top':'5px', 'position': projectlistArray[index].position, 'margin-left':+projectlistArray[index].marginLeft-projectlistArray[index].width+'px'}" class="projectSingleInnerTitleWrapper">


          <template v-if="projectlistArray[index].typeScale>7.5">
            <span @click="toggleCollapse(index)" class="projectTitle projectTitleRight" v-html="project.content.title.rendered"></span>
            <div class="projectControls projectControlsLeft">
              <div v-bind:style="{'background':returnColor(index)}" @click="toggleCollapse(index)" v-if="projectlistArray[index].expanded" class="projectControlsClose projectControlsButton">
              </div>
              <div v-bind:style="{'background':returnColor(index)}" @click="toggleCollapse(index)" v-else class="projectControlsOpen projectControlsButton">
              </div>
            </div>

          </template>
          <template v-else>
            <div class="projectControls projectControlsRight">
              <div v-bind:style="{'background':returnColor(index)}" @click="toggleCollapse(index)" v-if="projectlistArray[index].expanded" class="projectControlsClose projectControlsButton">
              </div>
              <div v-bind:style="{'background':returnColor(index)}" @click="toggleCollapse(index)" v-else class="projectControlsOpen projectControlsButton">
              </div>
            </div>
            <span @click="toggleCollapse(index)" class="projectTitle" v-html="project.content.title.rendered"></span>
          </template>
        </div>



      </div>
      <!-- <button @click="toggleCollapse(index)">toggle</button> -->

      <transition name="fade">
        <div v-if="project.expanded" class="projectSingleInnerContent" v-bind:style="{'margin-top': projectlistArray[index].marginTop}">
          <projectitem v-bind:projectContent="project.content"></projectitem>
        </div>
      </transition>

    </div>
  </div>
</div>
</template>

<script>
import projectitem from './projectitem'
import lodash from 'lodash'

export default {

  components: {
    projectitem
  },
  data() {
    return {
      projectlistArray: [],
      activeItem: {}
    }
  },
  created: function() {
    this.$http.get('http://api.template-studio.nl/wp-json/wp/v2/posts').then(function(response) {
      // this.projectlist = response.body
      // this.projectlistArray.push(video)
      var vm = this
      response.body.forEach(function(entry, index) {

        // var scale = [0,3.3333,6.6666,10]
        var scale = [0,2.5,5,7.5,10]
        var randomTypeScale = scale[Math.floor(Math.random() * scale.length)];
        vm.projectlistArray.push({
          'expanded': false,
          'content': entry,
          // 'typeScale': 10,
          'typeScale': randomTypeScale,
          // 'widthSet': "initial",
          'width': 0,
          'marginOffset': '0px',
          // 'offsetTop': 0,
          'position': 'initial',
          'initialIndex': index,
          'marginTop': '0px',
          'initialHeight': 0,
          'marginLeft': '',
          // 'marginLeft': ((Math.floor(Math.random() * 11)) * 1) * (window.innerWidth / 10),
        })
      });

    }).then(function() {
      this.positionTitles()
    })
  },

  mounted: function() {
    var vm = this
    window.addEventListener('scroll', _.throttle(function() {
      vm.scrollSpy()
    }, 100));

    window.addEventListener('resize', _.debounce(function() {
      // setTimeout(function(){
      vm.positionTitles()
      // setInterval(function(){
      // vm.positionTitlesResize()
      // },500)
      // }, 1000)
    }, 500));





  },
  methods: {

    offset: function(el) {
      var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      }
    },

    scrollSpy: function() {

      var expandedElements = _.filter(this.projectlistArray, {
        'expanded': true
      })

      var scrollTop = window.scrollY

      var vm = this

      expandedElements.forEach(function(expandedElement, index) {
        // console.log(expandedElement)
        // console.log(expandedElement.initialIndex)

        var initOffsetTopList = vm.$el.offsetTop
        var initOffsetTopElement = vm.$el.querySelectorAll('.projectSingleInnerTitle')[expandedElement.initialIndex].offsetTop

        var initHeightExpandedElement = vm.$el.querySelectorAll('.projectSingleInner')[expandedElement.initialIndex].clientHeight

        var initHeightElementHeight = vm.$el.querySelectorAll('.projectSingleInnerTitle')[expandedElement.initialIndex].clientHeight

        var initOffsetBottomElement = initOffsetTopList + initOffsetTopElement + initHeightExpandedElement - initHeightElementHeight

        if (scrollTop > initOffsetTopList + initOffsetTopElement && scrollTop < initOffsetBottomElement - expandedElement.initialHeight) {

          expandedElement.position = 'fixed'
          // expandedElement.widthSet = '50%'
          expandedElement.marginTop = expandedElement.initialHeight + 'px'
          expandedElement.marginOffset = '20px'
          // vm.$el.querySelectorAll('.projectSingleInnerTitle')[expandedElement.initialIndex].style.marginLeft = '-20px'
        } else {

          expandedElement.position = 'initial'
          // vm.$el.querySelectorAll('.projectSingleInnerTitle')[expandedElement.initialIndex].style.marginLeft = '0px'
          expandedElement.marginTop = '0px'
          expandedElement.marginOffset = '0px'



        }
      })

    },

    outerWidth: function(el) {
      var width = el.offsetWidth;
      var style = getComputedStyle(el);

      width += parseInt(style.marginLeft) + parseInt(style.marginRight);
      return width;
    },


    positionTitles: function() {
      var vm = this
      var marginAndPadding = 50
      var windowWidth = window.innerWidth - marginAndPadding

      this.projectlistArray.forEach(function(entry, index) {
        var elementWidthControls = vm.$el.querySelectorAll('.projectTitle')[index].offsetWidth
        var elementWidth = vm.outerWidth(vm.$el.querySelectorAll('.projectControls')[index])
        var elementWidthTotal = elementWidth + elementWidthControls

        if(vm.projectlistArray[index].typeScale == 5){

          vm.$set(vm.projectlistArray[index], 'marginLeft', vm.projectlistArray[index].typeScale * (window.innerWidth / 10) - marginAndPadding + 10 )
        }else{
          vm.$set(vm.projectlistArray[index], 'marginLeft', vm.projectlistArray[index].typeScale * (window.innerWidth / 10) )

        }

        var diff = windowWidth - (elementWidthTotal + vm.projectlistArray[index].marginLeft + vm.getScrollBarWidth() - 24)
        console.log(vm.projectlistArray[index].marginLeft)

        if (diff < 0) {
          vm.$set(vm.projectlistArray[index], 'width', Math.abs(diff))
        }
      });
    },


    // positionTitlesResize: function() {
    //   console.log('//////////////// positionTitlesResize /////////////////')
    //
    //   var vm = this
    //   var marginAndPadding = 50
    //   var windowWidth = window.innerWidth - marginAndPadding
    //
    //   this.projectlistArray.forEach(function(entry, index) {
    //     var elementWidthControls = vm.$el.querySelectorAll('.projectTitle')[index].offsetWidth
    //     var elementWidth = vm.outerWidth(vm.$el.querySelectorAll('.projectControls')[index])
    //     var elementWidthTotal = elementWidth + elementWidthControls
    //
    //     vm.$set(vm.projectlistArray[index], 'marginLeft', vm.projectlistArray[index].typeScale * (window.innerWidth / 10))
    //
    //     var diff = windowWidth - (elementWidthTotal + vm.projectlistArray[index].marginLeft + vm.getScrollBarWidth() - 24)
    //     console.log(vm.projectlistArray[index].marginLeft)
    //
    //     if (diff < 0) {
    //       vm.$set(vm.projectlistArray[index], 'width', Math.abs(diff))
    //     }
    //   });
    // },



    getScrollBarWidth: function() {
      var inner = document.createElement('p');
      inner.style.width = "100%";
      inner.style.height = "200px";

      var outer = document.createElement('div');
      outer.style.position = "absolute";
      outer.style.top = "0px";
      outer.style.left = "0px";
      outer.style.visibility = "hidden";
      outer.style.width = "200px";
      outer.style.height = "150px";
      outer.style.overflow = "hidden";
      outer.appendChild(inner);

      document.body.appendChild(outer);
      var w1 = inner.offsetWidth;
      outer.style.overflow = 'scroll';
      var w2 = inner.offsetWidth;
      if (w1 == w2) w2 = outer.clientWidth;

      document.body.removeChild(outer);

      return (w1 - w2);
    },

    // returnMargin: function(index) {
    //   return this.projectlistArray[index].typeScale * (window.innerWidth / 10)
    // },

    returnColor: function(index) {
      var color1 = 'FF0000';
      var color2 = '0000FF';
      var ratio = this.projectlistArray[index].typeScale / 10;
      var hex = function(x) {
        x = x.toString(16);
        return (x.length == 1) ? '0' + x : x;
      };

      var r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
      var g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
      var b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));

      // return 'rgb(255,255,' + this.projectlistArray[index].typeScale + ')'
      var middle = hex(r) + hex(g) + hex(b);
      return "#" + middle;
    },


    scrollToTopofProject: function(index) {
      // var elementsOffsetTop = offset(this.$el.querySelectorAll('.projectSingle')[index]).top
      var vm = this
      setTimeout(function() {
        vm.$SmoothScroll(vm.$el.querySelectorAll('.projectSingle')[index], 800);
      }, 200)
      // this.$SmoothScroll(this.offset(this.$el.querySelectorAll('.projectSingle')[index]).top, 500);
      // this.$SmoothScroll(0,500,callback,context);
    },
    toggleCollapse: function(index) {
      this.projectlistArray[index].expanded = !this.projectlistArray[index].expanded


      this.projectlistArray[index].initialHeight = this.$el.querySelectorAll('.projectSingleInnerTitle')[index].clientHeight


      // var vm = this
      // var vmindex = index
      // var listener = function() {
      //   // vm.scrollSpy(vmindex)
      // };

      if (this.projectlistArray[index].expanded) {
        console.log('expanded')
        this.scrollToTopofProject(index)

        // window.addEventListener('scroll', this.handleScroll);
      } else {
        // window.removeEventListener('scroll', this.handleScroll);
        console.log('closed')
        this.projectlistArray[index].position = 'initial'
        this.scrollToTopofProject(index)
      }

      // setTimeout(function() {
      //   window.removeEventListener('scroll', listener, false);
      // }, 3000);

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../assets/scss/base.scss";

.fade-enter-active,
.fade-leave-active {
    // transition: opacity .5s, max-height .5s
    transition: opacity 0.5s, max-height 0.8s;
}
/* .fade-leave-active in <2.1.8 */
.fade-enter,
.fade-leave-to {
    opacity: 0;
    max-height: 0;
}
/* .fade-leave-active in <2.1.8 */
.fade-enter-to,
.fade-leave {
    max-height: 5000px;
}
@include media("<tablet") {
    * {
        // display: none;
    }
}

#projectlist {
    background: rgb(245, 245, 245);
    position: relative;
    // display: grid;

    #projectlistHeader {
        width: 100%;
        display: flex;

        border-top: 4px solid black;
        border-bottom: 4px solid black;
        padding: 20px;
        div {
            width: 33.333%;
            float: left;
            display: flex;
            justify-content: center;
            align-content: center;
            &:first-of-type {
                justify-content: flex-start;

            }
            &:last-of-type {
                justify-content: flex-end;

            }
        }
    }

    .projectSingle {

        width: 100%;
        border-bottom: 4px solid black;
        &:first-of-type {
            // border-top: 4px solid black;
        }
        .projectSingleInner {
            padding: 15px 20px 10px;

            .projectSingleInnerContent {
                // max-height: 500px;
                overflow: hidden;
            }

            // display: inline-block;

            .projectSingleInnerTitle {

                .projectTitle {
                    float: left;
                    cursor: pointer;
                    max-width: 360px;
                    width: 360px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                }
                .projectTitleRight{
                  text-align: right;
                }

                .projectControlsRight{
                  margin-right: 20px;
                }

                .projectControlsLeft{
                  margin-left: 20px;
                }

                .projectControls {
                    color: red;
                    clear: none;
                    width: 50px;
                    height: 100%;
                    display: inline-block;
                    position: relative;
                    top: 5px;
                    float: left;
                    .projectControlsButton {
                        width: 50px;
                        height: 50px;
                        -webkit-mask-size: cover;
                        mask-size: cover;
                        background-size: cover;
                        background-color: black;
                        background-position: center;
                    }

                    .projectControlsClose {

                        -webkit-mask: url("../assets/svg/cross.svg") no-repeat 50% 50%;
                        mask: url("../assets/svg/cross.svg") no-repeat 50% 50%;
                        -webkit-mask-size: cover;
                        mask-size: cover;
                        background-size: cover;
                        cursor: pointer;

                    }

                    .projectControlsOpen {
                        -webkit-mask: url("../assets/svg/circle.svg") no-repeat 50% 50%;
                        mask: url("../assets/svg/circle.svg") no-repeat 50% 50%;
                        -webkit-mask-size: cover;
                        mask-size: cover;
                        background-size: cover;
                        cursor: pointer;

                    }
                }

                top: 20px;
                // display: inline-block;

                .projectSingleInnerTitleBackground {
                    background: rgb(245, 245, 245);
                    left: 0;
                    position: fixed;
                    top: 0;
                    height: inherit;
                    width: 100%;
                    // z-index: ;
                }

                .projectSingleInnerTitleWrapper {
                    // display: inline-block;
                    display: inline-flex;
                    width: initial;
                    // display: flex;
                    white-space: nowrap;
                    overflow: hidden;
                    padding-bottom: 5px;

                    span {
                        &:first-of-type {
                            // margin-right: 14px;
                        }
                        top: 8px;
                        margin: 0;
                        position: relative;

                    }
                }
            }
        }
    }
}
</style>
