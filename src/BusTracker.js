import axios from "axios";
import RouteColors from "./RouteColors.json";
import moment from "moment";

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
            .get(
              `https://tfeapp.com/api/Unified.3.0/departure_boards.php?stops=${code}`
            )
            .then(response => {
              if (response.data == null) {
                return;
              }
              resolve(
                response.data[0].services
                  .filter(route => {
                    return (
                      this.services.length === 0 ||
                      this.services.includes(route.service_name)
                    );
                  })
                  .map(route => {
                    return {
                      id: route.service_name,
                      color: this.getServiceColor(route.service_name).color,
                      text_color: this.getServiceColor(route.service_name)
                        .text_color,
                      destination: route.departures[0].destination,
                      icon: route.service_name.startsWith("T")
                        ? "train"
                        : "bus",
                      departures: route.departures
                        .sort(
                          (a, b) =>
                            a.departure_time_unix - b.departure_time_unix
                        )
                        .map(dep => {
                          dep.moment = moment.unix(dep.departure_time_unix);
                          return dep;
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
