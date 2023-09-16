import { DataSource } from "typeorm";
import { Model } from "./entity/model";
import { Texture } from "./entity/texture";
import path from "path";

const dbFile = path.resolve("src/Chinook.db");

export const dataSource = new DataSource({
  type: "sqlite",
  database: dbFile,
  entities: [Texture, Model],
  synchronize: true,
});
