<!--
    SPA主页面
    -author:david
-->
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

<style>
    body{margin: 0;}
    #app {
      min-width: 1200px;
      margin: 0 auto;
      font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
    }
</style>
