<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #aad5ff;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #1ab874;
    &.router-link-exact-active {
      color: #07b667;
    }
  }
}
</style>
