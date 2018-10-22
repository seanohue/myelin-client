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
  background: linear-gradient(rgba(70, 74, 69, 0) 80%, rgba(9, 0, 87, 0.25) 20%);
  z-index: 2;
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
}

@keyframes flicker {
  0% {
  opacity: 0.27861;
  }
  20% {
  opacity: 0.18128;
  }
  40% {
  opacity: 0.26559;
  }
  60% {
  opacity: 0.20313;
  }
  80% {
  opacity: 0.51428;
  }

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
  animation: flicker 0.75s infinite;
}
</style>
