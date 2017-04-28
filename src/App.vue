<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>


<style src="./assets/fonts/CourierPrime/stylesheet.css"></style>
<style>
#app {
}

*{
  box-sizing: border-box;
}

body,html{
  margin: 0;
  overflow-x: hidden;
  position:relative;
  /*overflow-y: scroll;*/
},
html{
  overflow-y: scroll;

}
body{
  overflow: hidden;
  /*overflow-y: scroll;*/
  /*height: 100%;*/
}
</style>
