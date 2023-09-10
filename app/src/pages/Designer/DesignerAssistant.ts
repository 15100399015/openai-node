import { subscriber } from "@/service/eventSocket";
import { eventbus } from "@/utils/index";

subscriber.on("event", function (event: any) {
  console.log(event);
  if (event.name === "createView") {
    if (event.parameter.class === "echarts_bar") {
      eventbus.emit("onDraw", {
        viewType: "echarts_bar",
      });
    }
    if (event.parameter.class === "echarts_line") {
      eventbus.emit("onDraw", {
        viewType: "echarts_line",
      });
    }
  }
});
subscriber.on("event", function (event) {});
