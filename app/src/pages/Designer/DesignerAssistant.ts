import { subscriber } from "@/service/eventSocket";
import { eventbus } from "@/utils/index";

subscriber.on("event", function (event: any) {
  console.log(event);
  // 事件类型为 appendChart
  if (event.name === "createView") {
    // 要添加的图表类型为 echarts_bar
    if (event.parameter.class === "echarts_bar") {
      eventbus.emit("onDraw", {
        viewType: "echarts_bar",
      });
    }
  }
});
subscriber.on("event", function (event) {});
