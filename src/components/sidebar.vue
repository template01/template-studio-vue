<template>
<div v-bind:style="{'height':setSidebarHeight}" v-bind:class="{collapsedSidebar:!showSidebar}" id="sidebar">
  <div class="">
    <div @click="emitToggleSideBar()" class="closeButton">

    </div>

    <div v-if="contentSidebar.acf" v-html="contentSidebar.acf.indexblurb">
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
      console.log('sHIT' + this.$el.scrollHeight)
      this.$emit('emitSidebarHeight', this.$el.scrollHeight)

    }
  },


  watch: {
    contentSidebar: function(val) {
      console.log('CHANGEDDD')
      var vm = this
      console.log(vm.$el.scrollHeight)

      setTimeout(function() {
        console.log(vm.$el.scrollHeight)
        vm.$emit('emitSidebarHeight', vm.$el.scrollHeight)

      }, 100)

      setTimeout(function() {
        console.log(vm.$el.scrollHeight)
        vm.$emit('emitSidebarHeight', vm.$el.scrollHeight)

      }, 200)

      setTimeout(function() {
        console.log(vm.$el.scrollHeight)
        vm.$emit('emitSidebarHeight', vm.$el.scrollHeight)

      }, 500)

      setTimeout(function() {
        console.log(vm.$el.scrollHeight)
        vm.$emit('emitSidebarHeight', vm.$el.scrollHeight)

      }, 1000)


    },
  },

  mounted() {

    var vm = this

    setTimeout(function() {
      vm.emitSidebarHeight()
    }, 100)

    window.addEventListener('resize', _.debounce(function() {
      vm.emitSidebarHeight()
    }, 500));

    // var refreshIntervalIds = setInterval(vm.emitSidebarHeight(), 500);
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

#sidebar {

  color:rgb(242, 242, 242);
    // min-height: 100vh;
    overflow: hidden;
    height: auto;
    float: right;

    .closeButton {
        width: 50px;
        height: 50px;
        cursor: pointer;
        background-size: cover;
        background-position: center;
        background-image: url("../assets/svg/cross.svg");
        background-size: cover;
    }

    &.collapsedSidebar {
        // margin-right:-50%;
        margin-right: calc(-100% - 173px);

        max-height: 100vh;
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
