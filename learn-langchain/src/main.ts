import path from "path";
import { Server } from "http";
import { Express } from "express";
import { DataSource } from "typeorm";
import { Photo } from "./Entity/Photo";
import { SqlDatabase } from "langchain/sql_db";
import { SqlDatabaseChain } from "langchain/chains/sql_db";
import { OpenAI } from "langchain/llms/openai";

const dbFile = path.resolve("src/Chinook.db");
export default async function (app: Express, server: Server) {
  const datasource = new DataSource({
    type: "sqlite",
    database: dbFile,
    entities: [Photo],
    synchronize: true,
  });
  await datasource.initialize();

  // for (let id = 0; id < 100; id++) {
  //   const photo = new Photo();
  //   photo.description = "我的肖像画";
  //   photo.filename = "a.png";
  //   photo.name = "ylp" + id;
  //   photo.views = 100;
  //   photo.isPublished = false;
  //   datasource.manager.save(photo);
  // }

  // const firstUser = await datasource
  //   .getRepository(Photo)
  //   .createQueryBuilder("photo")
  //   .getCount();

  // console.log(firstUser);

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });

  const chain = new SqlDatabaseChain({
    llm: new OpenAI({ temperature: 0 }),
    database: db,
  });

  const res = await chain.run("How many Photo are there?");
  console.log(res);
}
