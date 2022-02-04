var temperature, humidity, alerts, current_load;

AFRAME.registerComponent("temperature", {
  init: function() {
    temperature = this.el;
  }
});

AFRAME.registerComponent("alerts", {
  init: function() {
    alerts = this.el;
  }
});

AFRAME.registerComponent("current_load", {
  init: function() {
    current_load = this.el;
  }
});

AFRAME.registerComponent("humidity", {
  init: function() {
    humidity = this.el;
  }
});

setInterval(() => {
  console.log("2 seconds");

  $.ajax({
    type: "GET",
    url: "/testDevice",
    success: function(result) {
      var el = this.el;
      res = JSON.parse(result);
      temperature.setAttribute("text", {
        value: "Temp:" + res.tempetature
      });

      alerts.setAttribute("text", {
        value: "Alerts:" + res.alerts
      });

      humidity.setAttribute("text", {
        value: "humidity" + res.humidity
      });

      current_load.setAttribute("text", {
        value: "load" + res.currentLoad
      });
    }.bind(this),
    error: function(err) {}
  });
}, 2000);
