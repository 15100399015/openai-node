import { Server } from "http";
import { Express } from "express";
import { sceneChain } from "./chains/sceneChain";
import { dataSourceChain } from "./chains/dataSourceChain";
import { genCodeChain } from "./chains/genCodeChain";

// 主进程
export default async function (app: Express, server: Server) {
  // 场景
  // const scene = "一间卧室";
  // const needModelDes = await sceneChain(scene);
  // console.log("需要用到模型的描述", needModelDes);
  const models = await dataSourceChain(
    `[{"model": "床", "number": 1}, {"model": "衣柜", "number": 1}, {"model": "书桌", "number": 1}, {"model": "椅子", "number": 2}]`
  );
  console.log("实际拿到的模型资源", models);
  // const sceneCode = await genCodeChain(scene, models);
  // console.log("生成的threejs代码", models);
}
