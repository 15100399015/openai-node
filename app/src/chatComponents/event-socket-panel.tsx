import { message } from "antd";
import React, { useEffect, useRef } from "react";
import { getConnection } from "../service/eventSocket";

export function EventSocketPanel() {
  const ws = useRef(getConnection()).current;
  const [line, setLine] = React.useState<any[]>([]);

  const handleOpen = () => {
    message.info("调试面板连接成功");
  };

  const handleMessage = (msg: any) => {
    message.success("收到消息");
    const newLine = [...line, msg.data];
    console.log(newLine);

    setLine(newLine);
  };

  useEffect(() => {
    ws.addEventListener("open", handleOpen);
    ws.addEventListener("message", handleMessage);
    return () => {
      ws.removeEventListener("open", handleOpen);
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws, handleOpen, handleMessage]);
  return (
    <div className="fixed right-0 top-[50%] mt-[-100px] p-[10px] bg-slate-900 overflow-auto h-[200px] w-[200px] border border-sky-500">
      {line.map((item, index) => {
        return (
          <p
            className="text-white"
            style={{ borderBottom: "1px solid #fff" }}
            key={index}
          >
            {item}
          </p>
        );
      })}
    </div>
  );
}
