<template>
  <div>{{ minutes }}</div>
</template>

<script>
export default {
  name: "Departure",
  props: ["departure"],
  computed: {
    minutes: function() {
      let minutesUntil = (this.departure.time - Date.now() / 1000) / 60;
      if (minutesUntil < 3) {
        return "DUE";
      }
      return Math.floor(minutesUntil);
    }
  }
};
</script>

<style scoped>
div {
  padding: 20px;
  margin: 10px;
  display: inline-block;
  background-color: black;
  color: white;
  border-radius: 5px;
  font-size: 2rem;
  font-weight: bold;
}
</style>
