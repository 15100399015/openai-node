/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { useMemoizedFn } from "ahooks";
import { eventbus, mm } from "@/utils";
import { SolidScenaDataType } from "@/types";
import Header from "./Header/Header";
import Aside from "./Aside/Aside";
import Scena from "./Scena/Scena";
import Properties from "./Properties/Properties";
import "../../assets/styles/designer.less";

function Dashboard() {
  const handleLoad = useMemoizedFn(async () => {
    const scenes: SolidScenaDataType[] = [
      {
        id: "1",
        parentId: "0",
        title: "场景1",
        pages: [
          {
            id: "2",
            parentId: "1",
            title: "页1",
            views: [],
            size: {
              width: 600,
              height: 600,
            },
          },
        ],
      },
    ];
    const model = {
      id: "111",
      title: "baseui",
      description: "description",
      createUser: "admin",
      createTime: "2023-07-05 13:38:49",
      scenas: scenes,
      size: { width: 0, height: 0 },
      frame: {},
      style: {},
    };
    mm.attach(model);
    eventbus.emit("onModelLoad", { model });
  });

  React.useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <div id="dashboard">
      <Header />
      <Aside />
      <Scena />
      <Properties />
    </div>
  );
}

export default Dashboard;
