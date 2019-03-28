import axios from "axios";
import RouteColors from "./RouteColors.json";

class BusTracker {
  constructor(stop_codes, services = []) {
    this.stop_codes = stop_codes;
    this.services = services;
  }

  getRoutes() {
    this.stop_promises = [];
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
                    return {
                      id: route.routeName,
                      color: this.getServiceColor(route.routeName).color,
                      text_color: this.getServiceColor(route.routeName)
                        .text_color,
                      destination: route.departures[0].destination,
                      icon: route.routeName.startsWith("T") ? "train" : "bus",
                      departures: route.departures
                        .sort((a, b) =>
                          a.departureTimeUnix > b.departureTimeUnix ? 1 : -1
                        )
                        .filter(
                          dep => dep.departureTimeUnix > Date.now() / 1000
                        )
                        .map(dep => {
                          return {
                            trip_id: dep.tripId,
                            time: dep.departureTimeUnix
                          };
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

  getServiceColor(service) {
    return RouteColors.filter(route => route.service_name == service)[0];
  }
}

export default BusTracker;
