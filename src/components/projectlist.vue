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
        <div v-bind:style="{'top':'0px', 'width': projectlistArray[index].widthSet, 'position': projectlistArray[index].position, 'margin-left':'calc('+returnMargin(index)+'px - '+projectlistArray[index].width+'px)'}" class="projectSingleInnerTitleWrapper" @click="toggleCollapse(index)">
          <span>●</span><span v-html="project.content.title.rendered">
        </span>
        </div>
      </div>
      <!-- <button @click="toggleCollapse(index)">toggle</button> -->
      <div v-if="project.expanded" class="projectSingleInnerContent" v-bind:style="{'margin-top': projectlistArray[index].marginTop}">
        <projectitem v-bind:projectContent="project.content"></projectitem>
      </div>
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
      response.body.forEach(function(entry,index) {
        vm.projectlistArray.push({
          'expanded': false,
          'content': entry,
          'typeScale': (Math.floor(Math.random() * 11)) * 1,
          'widthSet': "initial",
          'width': 0,
          'marginOffset':'0px',
          // 'offsetTop': 0,
          'position': 'initial',
          'initialIndex':index,
          'marginTop':'0px',
          'initialHeight':0
        })
      });

    }).then(function() {
      this.positionTitles()
    })
  },

  mounted:function(){
    window.addEventListener('scroll', this.scrollSpy);

  },
  methods: {

    // scrollSpy: function(elementIndex) {
    //   var scrollTop = window.scrollY
    //   var initOffsetTopElement = this.$el.querySelectorAll('.projectSingleInnerTitle')[elementIndex].offsetTop
    //   var initHeightExpandedElement = this.$el.querySelectorAll('.projectSingleInner')[elementIndex].clientHeight
    //   var initHeightElementHeight = this.$el.querySelectorAll('.projectSingleInnerTitle')[elementIndex].clientHeight
    //   var initOffsetTopList = this.$el.offsetTop
    //   var initOffsetBottomElement = initOffsetTopList + initOffsetTopElement + initHeightExpandedElement - initHeightElementHeight
    //   console.log(initHeightExpandedElement)
    //   if (scrollTop > initOffsetTopList + initOffsetTopElement && scrollTop < initOffsetBottomElement) {
    //     var diff = scrollTop - (initOffsetTopList + initOffsetTopElement)
    //     this.projectlistArray[elementIndex].offsetTop = diff
    //   } else {
    //     this.projectlistArray[elementIndex].offsetTop = 0
    //   }
    // },

    scrollSpy: function() {
      var expandedElements = _.filter(this.projectlistArray, {  'expanded': true } )

      var scrollTop = window.scrollY

      var vm = this

      expandedElements.forEach(function(expandedElement, index) {
        console.log(expandedElement)
        console.log(expandedElement.initialIndex)

        var initOffsetTopList = vm.$el.offsetTop
        var initOffsetTopElement = vm.$el.querySelectorAll('.projectSingleInnerTitle')[expandedElement.initialIndex].offsetTop

        var initHeightExpandedElement = vm.$el.querySelectorAll('.projectSingleInner')[expandedElement.initialIndex].clientHeight

        var initHeightElementHeight = vm.$el.querySelectorAll('.projectSingleInnerTitle')[expandedElement.initialIndex].clientHeight

        var initOffsetBottomElement = initOffsetTopList + initOffsetTopElement + initHeightExpandedElement - initHeightElementHeight

        if (scrollTop > initOffsetTopList + initOffsetTopElement && scrollTop < initOffsetBottomElement - expandedElement.initialHeight) {

          expandedElement.position = 'fixed'
          // expandedElement.widthSet = '50%'
          expandedElement.marginTop = expandedElement.initialHeight+'px'
          expandedElement.marginOffset ='20px'
          // vm.$el.querySelectorAll('.projectSingleInnerTitle')[expandedElement.initialIndex].style.marginLeft = '-20px'
        } else {

          expandedElement.position = 'initial'
          // vm.$el.querySelectorAll('.projectSingleInnerTitle')[expandedElement.initialIndex].style.marginLeft = '0px'
          expandedElement.marginTop = '0px'
          expandedElement.marginOffset = '0px'



        }
      })

      // var scrollTop = window.scrollY
      // var initOffsetTopElement = this.$el.querySelectorAll('.projectSingleInnerTitle')[elementIndex].offsetTop
      // var initHeightExpandedElement = this.$el.querySelectorAll('.projectSingleInner')[elementIndex].clientHeight
      // var initHeightElementHeight = this.$el.querySelectorAll('.projectSingleInnerTitle')[elementIndex].clientHeight
      // var initOffsetTopList = this.$el.offsetTop
      // var initOffsetBottomElement = initOffsetTopList + initOffsetTopElement + initHeightExpandedElement - initHeightElementHeight
      // console.log(initHeightExpandedElement)
      // if (scrollTop > initOffsetTopList + initOffsetTopElement && scrollTop < initOffsetBottomElement) {
      //   var diff = scrollTop - (initOffsetTopList + initOffsetTopElement)
      //   this.projectlistArray[elementIndex].offsetTop = diff
      // } else {
      //   this.projectlistArray[elementIndex].offsetTop = 0
      // }
    },



    positionTitles: function() {
      // console.log('mounted')
      var vm = this
      var marginAndPadding = 50
      var windowWidth = window.innerWidth - marginAndPadding

      this.projectlistArray.forEach(function(entry, index) {
        setTimeout(function() {
          // console.log(vm.projectlistArray[index].content.title.rendered)
          var elementWidth = vm.$el.querySelectorAll('.projectSingleInnerTitleWrapper')[index].offsetWidth
          var style = window.getComputedStyle(vm.$el.querySelectorAll('.projectSingleInnerTitleWrapper')[index], null);
          var elementMarginLeft = parseInt(style.marginLeft)
          var diff = windowWidth - (elementWidth + elementMarginLeft)
          if (diff < 0) {
            vm.$set(vm.projectlistArray[index], 'width', (-1 * diff))
          }

        }, 100)
      });
    },

    returnMargin: function(index) {
      return this.projectlistArray[index].typeScale * (window.innerWidth/10)
    },
    //
    // handleScrolle:function() {
    //  console.log(_.filter(this.projectlistArray, {  'expanded': true } ))
    //
    //
    //
    // },

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
        // window.addEventListener('scroll', this.handleScroll);
      } else {
        // window.removeEventListener('scroll', this.handleScroll);
        console.log('closed')
        this.projectlistArray[index].position = 'initial'

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
@include media("<tablet") {
    * {
        display: none;
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

            // display: inline-block;

            .projectSingleInnerTitle {

                top: 20px;
                cursor: pointer;

                .projectSingleInnerTitleWrapper {
                    display: inline-block;
                    white-space: nowrap;
                    overflow: hidden;
                    padding-bottom: 5px;
                    span {
                        &:first-of-type {
                            margin-right: 14px;
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
