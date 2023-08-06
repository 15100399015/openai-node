import { subscriber } from "@/service/eventSocket";
import { eventbus, mm } from "@/utils/index";

subscriber.on("message", function (event: any) {
  // 事件类型为 appendChart
  if (event.name === "appendChart") {
    // 要添加的图表类型为 echarts_bar
    if (event.parameter.type === "echarts_bar") {
      eventbus.emit("onDraw", {
        viewType: "echarts_bar",
      });
    }
  }
});
subscriber.on("event", function (event) {});
