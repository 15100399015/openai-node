import { message } from "antd";
import React, { useEffect } from "react";

const ws = new WebSocket("ws://localhost:8080/api/ws");

export function EventSocketPanel() {
  const [line, setLine] = React.useState<any[]>([]);

  const handleOpen = React.useCallback(() => {
    message.info("连接成功");
  }, [ws]);

  const handleMessage = React.useCallback(
    (msg: any) => {
      setLine([...line, msg.data]);
    },
    [ws]
  );

  useEffect(() => {
    ws.addEventListener("open", handleOpen);
    ws.addEventListener("message", handleMessage);
    return () => {
      ws.removeEventListener("open", handleOpen);
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws]);
  return (
    <div className="fixed right-0 top-[50%] mt-[-100px] p-[10px] bg-slate-900 overflow-auto h-[200px] w-[200px] border border-sky-500">
      {line.map((item,index) => {
        return <p key={index}>{item}</p>;
      })}
    </div>
  );
}
