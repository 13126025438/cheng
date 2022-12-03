<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<style>
 @import url('./assets/css/public.css');
 @import url('//at.alicdn.com/t/c/font_3713524_nflb57vbz8j.css');
 @import url('https://at.alicdn.com/t/c/font_3714492_f4lh3tawfqs.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
  background-color: #121212;
}
.faultfont {
    /* text-shadow: -2px 0 rgb(0 255 255 / 50%), 2px 0 rgb(255 0 0 / 50%);
    animation: shake-it .5s reverse infinite cubic-bezier(0.68, -0.55, 0.27, 1.55); */

  }
@keyframes shake-it {
  from{

  }
  to{

  }
}
.container{
  width: 80%;
  margin: 0 auto;
}
/* shake-it {
  cubic-bezier(0.68, -0.55, 0.27, 1.55);
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: reverse;
    animation-fill-mode: none;
    animation-play-state: running;
    animation-name: shake-it;
} */

</style>
