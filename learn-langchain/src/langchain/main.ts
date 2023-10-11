import { Server } from "http";
import { Express } from "express";
import { dataSourceChain } from "./chains/dataSourceChainTest";
import { sceneChain } from "./chains/sceneChain";

// 主进程
export default async function (app: Express, server: Server) {
  // 场景
  // const scene = "病房";
  // const needModelDes = await sceneChain(scene);
  // console.log("需要用到模型的描述", needModelDes);
  const models = await dataSourceChain();
  console.log("实际拿到的模型资源", models);
  // const sceneCode = await genCodeChain(scene, models);
  // console.log("生成的threejs代码", models);
}
