<template>
  <div v-if="routes.length">
    <transition-group name="routes" tag="div">
      <Route :route="route" :key="route.id" v-for="route in routes" />
    </transition-group>
  </div>
  <div class="empty" v-else>
    <font-awesome-icon icon="bed" size="4x" />
    <h1>No services</h1>
  </div>
</template>

<script>
import Route from "./Route.vue";
import BusTracker from "../BusTracker.js";
import config from "../../config.json";

export default {
  name: "DepartureBoard",
  data: () => {
    const tracker = new BusTracker(config.stops, config.services);
    return {
      routes: [],
      tracker: tracker
    };
  },
  components: {
    Route
  },
  mounted: function() {
    this.update();
    setInterval(() => this.update(), 60000);
  },
  methods: {
    update() {
      this.tracker.getRoutes().then(routes => {
        this.routes = [].concat
          .apply([], routes)
          .sort((a, b) =>
            a.departures[0].time > b.departures[0].time ? 1 : -1
          );
      });
    }
  }
};
</script>

<style>
.routes-move {
  transition: transform 1s;
}

.empty {
  font-size: 4rem;
  text-align: center;
}
</style>
