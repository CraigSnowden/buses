<template>
  <div id="app">
    <DepartureBoard />
  </div>
</template>

<script>
import DepartureBoard from "./components/DepartureBoard.vue";

export default {
  name: "app",
  components: {
    DepartureBoard
  }
};
</script>

<style>
html {
  font-size: 25px;
  background-color: #bbbbbb;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
