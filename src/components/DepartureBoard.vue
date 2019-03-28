<template>
  <div>
    <transition-group name="routes" tag="div">
      <template v-for="route in routes">
        <Route :route="route" :key="route.id" />
      </template>
    </transition-group>
  </div>
</template>

<script>
import Route from "./Route.vue";
import BusTracker from "../BusTracker.js";

export default {
  name: "DepartureBoard",
  data: () => {
    return {
      routes: [],
      tracker: new BusTracker(
        ["36290128", "36245242"],
        [] //["300", "T50", "22", "400"]
      )
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
</style>
