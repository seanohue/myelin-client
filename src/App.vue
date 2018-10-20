<template>
  <div id="app" class="crt">
    <router-view/>
  </div>
</template>

<style lang="less">
body {
    background-color: gray;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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

.main {
  width: 100vw;
  height: 100vh;
  background-color: gray;
  display: flex;
}

.crt::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(70, 74, 69, 0) 50%, rgba(134, 126, 126, 0.25) 50%);
  z-index: 2;
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
}

.crt::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(16, 18, 16, 0.1);
  opacity: 0;
  z-index: 2;
  pointer-events: none;
}
</style>
