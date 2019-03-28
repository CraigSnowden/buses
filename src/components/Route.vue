<template>
  <div class="route-container">
    <div class="number" v-bind:style="{ backgroundColor: route.color }">
      <font-awesome-icon :icon="route.icon" />
      {{ route.id }}
    </div>
    <div class="route">
      {{ route.destination }}
    </div>

    <div class="departures">
      <Departure
        :departure="departure"
        :key="departure"
        v-for="departure in route.departures.slice(0, 3)"
      />
    </div>
  </div>
</template>

<script>
import Departure from "./Departure.vue";

export default {
  name: "Route",
  props: {
    route: Object
  },
  components: {
    Departure
  }
};
</script>

<style>
.route-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-items: space-between;
  border-bottom: black solid 2px;
}

.route-container:last-child {
  border-bottom: 0;
}

.route {
  flex-grow: 10;
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
}

.number {
  padding: 20px;
  margin: 10px;
  margin-right: 30px;
  display: inline-block;
  background-color: black;
  color: white;
  border-radius: 5px;
  font-size: 2rem;
  font-weight: bold;
}
</style>
