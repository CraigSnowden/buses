import axios from "axios";
import { timingSafeEqual } from "crypto";

class BusTracker {
  constructor(stop_codes, services = []) {
    this.stop_codes = stop_codes;
    this.services = services;
    this.route_colors = {};
  }

  getRoutes() {
    this.stop_promises = [];
    let randomColor = require("randomcolor");
    this.stop_codes.forEach(code => {
      this.stop_promises.push(
        new Promise((resolve, reject) => {
          axios
            .get(`https://tfe-opendata.com/api/v1/live_bus_times/${code}`)
            .then(response => {
              if (response.data == null) {
                return;
              }
              resolve(
                response.data
                  .filter(route => {
                    if (this.services.length == 0) {
                      return true;
                    } else {
                      return this.services.includes(route.routeName);
                    }
                  })
                  .map(route => {
                    if (this.route_colors[route.routeName] == undefined) {
                      this.route_colors[route.routeName] = randomColor({
                        luminosity: "dark"
                      });
                    }
                    return {
                      id: route.routeName,
                      color: this.route_colors[route.routeName],
                      destination: route.departures[0].destination,
                      departures: route.departures
                        .sort((a, b) =>
                          a.departureTimeUnix > b.departureTimeUnix ? 1 : -1
                        )
                        .map(dep => {
                          return dep.departureTimeUnix;
                        })
                    };
                  })
              );
            })
            .catch(reason => {
              reject(reason);
            });
        })
      );
    });
    return Promise.all(this.stop_promises);
  }
}

export default BusTracker;
