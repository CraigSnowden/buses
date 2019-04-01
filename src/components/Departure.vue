<template>
  <div v-bind:class="{ real_time: departure.real_time }">{{ minutes }}</div>
</template>

<script>
import moment from "moment";

export default {
  name: "Departure",
  props: ["departure"],
  computed: {
    minutes: function() {
      let minutesUntil = this.departure.moment.diff(moment.utc(), "minutes");
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
  background-color: #555;
  color: white;
  border-radius: 5px;
  font-size: 2rem;
  font-weight: bold;
}

.real_time {
    background-color: black;
}
</style>
