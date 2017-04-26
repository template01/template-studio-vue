
<template>
<div id="projectlist" v-bind:style="{'height':tempHeight}" class="">

  <div id="projectlistHeader">
    <div>
      <span @click="reorderByDigital()"><span v-if="orderedBy === 'original' || orderedBy === 'analog'">← Online</span><span v-if="orderedBy === 'digital'">← Reset</span></span>
    </div>
    <div>
      <transition name="fadeOpenMe">
        <span v-if="!collapsedList" @click="collapseList()"><span>Collapse List</span></span>
      </transition>
    </div>

    <div>
      <span @click="reorderByAnalog()"><span v-if="orderedBy === 'original' || orderedBy === 'digital'">Offline →</span><span v-if="orderedBy === 'analog'">Reset →</span></span>
    </div>
  </div>

  <transition-group name="list">

    <div v-bind:style="[projectlistArray[index].expanded ? projectlistArray[index].backgroundStyle : ''] " class="projectSingle list-item" v-for="(project, index) in projectlistArray" v-bind:key="projectlistArray[index]">
      <div @mouseover="mouseOverTitle(index)" @mouseout="mouseOffTitle(index)" v-bind:class="[{ isHovered: projectlistArray[index].itemHovered }]" class="projectSingleInner">
        <div @click="toggleCollapse(index)" class="projectSingleInnerTitle">


          <transition name="fadeOpenMe">
            <span v-if="projectlistArray[index].itemHovered && !projectlistArray[index].expanded" class="openMeTitle">Open Me!</span>
          </transition>

          <div v-bind:style="[{'height':projectlistArray[index].initialHeight+10+'px'},projectlistArray[index].backgroundStyle]" v-if="projectlistArray[index].position === 'fixed'" class="projectSingleInnerTitleBackground"></div>
          <div v-bind:data-scale="projectlistArray[index].typeScale" v-bind:style="{'top':'5px', 'position': projectlistArray[index].position, 'margin-left':+projectlistArray[index].marginLeft-projectlistArray[index].width+'px'}" class="projectSingleInnerTitleWrapper">


            <template v-if="projectlistArray[index].typeScale>7.5">
            <span class="projectTitle projectTitleRight" v-html="project.content.title.rendered"></span>
            <div class="projectControls projectControlsLeft">
              <div v-bind:style="" v-if="projectlistArray[index].expanded" class="projectControlsClose projectControlsButton">
              </div>
              <div v-bind:style="" v-else class="projectControlsOpen projectControlsButton">
              </div>
            </div>
</template>
          <template v-else>
<div class="projectControls projectControlsRight">
  <div v-bind:style="" v-if="projectlistArray[index].expanded" class="projectControlsClose projectControlsButton">
  </div>
  <div v-bind:style="" v-else class="projectControlsOpen projectControlsButton">
  </div>
</div>
<span class="projectTitle" v-html="project.content.title.rendered"></span>
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

  </transition-group>
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
      projectlistArrayOrg: [],
      activeItem: {},
      isActive: true,
      orderedBy: 'original',
      tempHeight: 'auto',
      collapsedList: true,

      // itemHovered: false
    }
  },
  created: function() {
    this.$http.get('http://api.template-studio.nl/wp-json/wp/v2/posts').then(function(response) {
      // this.projectlist = response.body
      // this.projectlistArray.push(video)
      var vm = this
      response.body.forEach(function(entry, index) {
        console.log(entry.title.rendered)
        console.log(entry.acf.item_type)

        // var scale = [0,3.3333,6.6666,10]
        var scale = [0, 2.5, 5, 7.5, 10]
        vm.projectlistArray.push({
          'expanded': false,
          'content': entry,
          // 'typeScale': 10,
          'typeScale': parseFloat(entry.acf.item_type),
          // 'widthSet': "initial",
          'width': 0,
          'marginOffset': '0px',
          // 'offsetTop': 0,
          'position': 'initial',
          'initialIndex': index,
          'marginTop': '0px',
          'initialHeight': 0,
          'marginLeft': '',
          'itemHovered': false,
          'backgroundStyle': {
            // active: true,
            // 'text-danger': false
            'background': '#ffe268'
          }
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
      vm.positionTitles()

    }, 500));





  },



  methods: {

    collapseList: function() {

      this.collapsedList = true

      this.projectlistArray.forEach(function(expandedElement, index) {
        expandedElement.expanded = false
        expandedElement.itemHovered = false

      })

    },

    setTempHeightProjectlist: function() {

      this.tempHeight = this.$el.offsetHeight + "px"
      console.log(this.$el.offsetHeight)
      var vm = this
      setTimeout(function() {
        vm.tempHeight = 'auto'
      }, 500)
    },

    reorderByOriginal: function() {
      this.orderedBy = 'original'
      this.projectlistArray = _.orderBy(this.projectlistArray, 'content.date', 'desc')
    },

    reorderByAnalog: function() {
      this.setTempHeightProjectlist()
      if (this.orderedBy === 'analog') {
        this.reorderByOriginal()
      } else {
        this.orderedBy = 'analog'
        this.projectlistArray = _.orderBy(this.projectlistArray, 'typeScale', 'desc')
      }
    },

    reorderByDigital: function() {
      this.setTempHeightProjectlist()
      if (this.orderedBy === 'digital') {
        this.reorderByOriginal()
      } else {
        this.orderedBy = 'digital'
        this.projectlistArray = _.orderBy(this.projectlistArray, 'typeScale', 'asc')
      }
    },

    mouseOverTitle: function(index) {
      var vm = this
      this.$set(this.projectlistArray[index], 'itemHovered', true)


      setTimeout(function() {
        if (vm.projectlistArray[index].itemHovered) {
          console.log('hye')
          vm.$set(vm.projectlistArray[index], 'itemHovered', true)
          // vm.$set(vm.projectlistArray[index], 'marginLeft', 0 )


        }

      }, 500)
    },

    mouseOffTitle: function(index) {
      // if(!this.projectlistArray[index].itemHovered){
      // this.$set(this.projectlistArray[index], 'marginLeft', 5000 )
      // }
      if (!this.projectlistArray[index].expanded) {

        this.$set(this.projectlistArray[index], 'itemHovered', false)
      }


    },

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


      // var expandedElements = _.filter(this.projectlistArray, {
      //   'expanded': true
      // })

      var scrollTop = window.scrollY

      var vm = this

      this.projectlistArray.forEach(function(expandedElement, index) {
        if (expandedElement.expanded) {


          var initOffsetTopList = vm.$el.offsetTop


          var initOffsetTopElement = vm.$el.querySelectorAll('.projectSingleInnerTitle')[index].offsetTop


          var initHeightExpandedElement = vm.$el.querySelectorAll('.projectSingleInner')[index].clientHeight

          var initHeightElementHeight = vm.$el.querySelectorAll('.projectSingleInnerTitle')[index].clientHeight

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
      var marginAndPadding = 40
      // var windowWidth = window.innerWidth - marginAndPadding
      var windowWidth = document.querySelectorAll('.projectSingleInnerTitle')[0].clientWidth

      this.projectlistArray.forEach(function(entry, index) {
        var elementWidthControls = vm.$el.querySelectorAll('.projectTitle')[index].offsetWidth
        var elementWidth = vm.outerWidth(vm.$el.querySelectorAll('.projectControls')[index])
        var elementWidthTotal = elementWidth + elementWidthControls

        if (vm.projectlistArray[index].typeScale == 0) {
          vm.$set(vm.projectlistArray[index], 'marginLeft', vm.projectlistArray[index].typeScale * (windowWidth / 10))
        }

        if (vm.projectlistArray[index].typeScale == 2.5) {
          vm.$set(vm.projectlistArray[index], 'marginLeft', vm.projectlistArray[index].typeScale * (windowWidth / 10) - 10)
        }

        if (vm.projectlistArray[index].typeScale == 5) {
          vm.$set(vm.projectlistArray[index], 'marginLeft', vm.projectlistArray[index].typeScale * (windowWidth / 10) - 20)
        }

        if (vm.projectlistArray[index].typeScale == 7.5) {
          vm.$set(vm.projectlistArray[index], 'marginLeft', vm.projectlistArray[index].typeScale * (windowWidth / 10) - 30)
        }

        if (vm.projectlistArray[index].typeScale == 10) {
          vm.$set(vm.projectlistArray[index], 'marginLeft', vm.projectlistArray[index].typeScale * (windowWidth / 10))
        }

        var diff = windowWidth - (elementWidthTotal + vm.projectlistArray[index].marginLeft + vm.getScrollBarWidth() - 14)

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

      this.collapsedList = false

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

.list-move {
    transition: transform $transition-timing-a/3;
}
.fade-enter-active,
.fade-leave-active {
    // transition: opacity .5s, max-height .5s
    transition: opacity $transition-timing-a, max-height $transition-timing-b;
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

.fadeOpenMe-enter-active,
.fadeOpenMe-leave-active {
    // transition: opacity .5s, max-height .5s
    transition: opacity $transition-timing-a;
    -webkit-transition-delay: $transition-timing-b;
    /* Safari */
    transition-delay: $transition-timing-b;
}
/* .fade-leave-active in <2.1.8 */
.fadeOpenMe-enter,
.fadeOpenMe-leave,
.fadeOpenMe-leave-to {
    opacity: 0;
    -webkit-transition-delay: $transition-timing-a;
    /* Safari */
    transition-delay: $transition-timing-a;
}
// /* .fade-leave-active in <2.1.8 */
// .fadeOpenMe-enter-to,
// .fadeOpenMe-leave {
//     max-height: 5000px;
// }
@include media("<tablet") {
    * {
        // display: none;
    }
}

#projectlist {
    clear: both;
    overflow: hidden;
    background: rgb(245, 245, 245);
    // position: relative;
    // height: 100%;
    // display: grid;

    #projectlistHeader {
        width: 100%;
        display: flex;

        border-top: 3px solid black;
        border-bottom: 3px solid black;
        padding: 20px;
        div {
            width: 33.33333%;
            float: left;
            display: flex;
            justify-content: center;
            align-content: center;
            span {
                position: relative;
                top: 1px;
                line-height: 40px;
                cursor: pointer;
            }
            &:first-of-type {
                justify-content: flex-start;

            }
            &:last-of-type {
                justify-content: flex-end;

            }
        }
    }

    .projectSingle {

        background: rgb(245, 245, 245);

        width: 100%;
        border-bottom: 3px solid black;
        &:first-of-type {
            // border-top: 4px solid black;
        };

        .projectSingleInner {

            &.isHovered {

                .projectSingleInnerTitle {
                  z-index: 99999999999999;
                }
                .projectSingleInnerTitleWrapper {
                    margin-left: 0 !important;

                }
                .projectTitleRight {
                    text-align: left !important;
                }
                .projectTitle {
                    max-width: 2000px !important;

                }
            };

            padding: 15px 20px 10px;

            .projectSingleInnerContent {
                // max-height: 500px;
                overflow: hidden;
            }

            // display: inline-block;

            .projectSingleInnerTitle {
                cursor: pointer;
                position: relative;

                .openMeTitle {
                    position: absolute;
                    pointer-events: none;
                    right: 0;
                    top: 6px;
                    @include media("<desktop") {
                        display: none;
                    }

                }

                .projectTitle {
                    float: left;
                    max-width: 360px;
                    // width: 360px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;

                    -webkit-transition: max-width $transition-timing-b;
                    transition: max-width $transition-timing-b;
                    -webkit-transition-delay: $transition-timing-a;
                    /* Safari */
                    transition-delay: $transition-timing-a;

                }
                .projectTitleRight {
                    text-align: right;
                }

                .projectControlsRight {
                    margin-right: 20px;
                }

                .projectControlsLeft {
                    margin-left: 20px;
                }

                .projectControls {
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
                        // -webkit-mask-size: cover;
                        // mask-size: cover;
                        background-size: cover;
                        // background-color: black;
                        background-position: center;
                    }

                    .projectControlsClose {
                        background-image: url("../assets/svg/cross.svg");
                        //
                        // -webkit-mask: url("../assets/svg/cross.svg") no-repeat 50% 50%;
                        // mask: url("../assets/svg/cross.svg") no-repeat 50% 50%;
                        // -webkit-mask-size: cover;
                        // mask-size: cover;
                        background-size: cover;

                    }

                    .projectControlsOpen {
                        background-image: url("../assets/svg/circle.svg");

                        // -webkit-mask: url("../assets/svg/circle.svg") no-repeat 50% 50%;
                        // mask: url("../assets/svg/circle.svg") no-repeat 50% 50%;
                        // -webkit-mask-size: cover;
                        // mask-size: cover;
                        background-size: cover;

                    }
                }

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
                    pointer-events: none;
                    // display: inline-flex;
                    width: initial;
                    // display: flex;
                    white-space: nowrap;
                    overflow: hidden;
                    padding-bottom: 12px;
                    -webkit-transition: margin-left $transition-timing-a;
                    transition: margin-left $transition-timing-a;
                    -webkit-transition-delay: $transition-timing-b;
                    /* Safari */
                    transition-delay: $transition-timing-b;
                    span {
                        &:first-of-type {
                            // margin-right: 14px;
                        }
                        top: 6px;
                        margin: 0;
                        position: relative;

                    }
                }
            }
        }
    }
}
</style>
