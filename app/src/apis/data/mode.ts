export const modelData = {
  id: "1",
  title: "baseui",
  description: "description",
  createUser: "admin",
  createTime: "2023-07-05 13:38:49",
  scenas: [
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
  ],
  size: { width: 0, height: 0 },
  frame: {},
  style: {},
};

export const pageData = {
  projectId: "1",
  page: {
    name: null,
    id: 2,
  },
  size: {
    width: "1024",
    height: "768",
  },
  views: [
    // 视图项
    {
      id: 6,
      title: "bar",
      position: {
        top: "220",
        left: "88",
      },
      size: {
        width: "560",
        height: "250",
      },
      type: "echarts_bar",
      options: null,
      data: {
        dataSourceId: 1,
        dataSourceName: "localhost",
        dataSourceTypeId: 1,
        dataSourceTypeName: "mysql",
        sql: "select  name,val  from table1",
        table: "test",
      },
    },
  ],
};
