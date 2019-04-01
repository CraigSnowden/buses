<template>
  <div v-if="routes.length">
    <transition-group name="routes" tag="div">
      <Route :route="route" :key="route.id" v-for="route in routes" />
    </transition-group>
  </div>
  <Empty v-else />
</template>

<script>
import Route from "./Route.vue";
import Empty from "./Empty.vue";
import BusTracker from "../BusTracker.js";
import config from "../../config.json";
import _ from "lodash";

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
    Route,
    Empty
  },
  mounted: function() {
    this.update();
    setInterval(() => this.update(), 60000);
  },
  methods: {
    update() {
      this.tracker.getRoutes().then(routes => {
        this.routes = _.flatten(routes).sort(
          (a, b) => a.departures[0].moment - b.departures[0].moment
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
</style>
