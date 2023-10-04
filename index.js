require("dotenv").config();
const auth = require("./auth");
const request = require("./request");
const utils = require("./utils");

auth(async () => {
  const collectionId = await utils.getCollectionId(process.env.COLLECTION_SLUG);
  const databaseId = await utils.getDatabaseId(process.env.MYSQL_DATABASE_NAME);

  //create new dashboard
  const { data: dashboard } = await request.post("/dashboard", {
    collection_id: collectionId,
    name: "new dashboard",
    description: "new dashboard for testing",
  });

  //create new question (card)
  const { data: card } = await request.post("/card", {
    name: "All Rides Count test",
    dataset_query: {
      database: databaseId,
      type: "query",
      query: {
        "source-table": 29,
        aggregation: [["count"]],
      },
    },
    display: "scalar",
    description: "the count for all  rides test",
    visualization_settings: {},
    collection_id: 1,
    collection_position: null,
    result_metadata: null,
  });

  // add card to dashboard
  await request.put(`dashboard/${dashboard.id}/cards`, {
    cards: [
      {
        card_id: card.id,
        id: card.id,
        dashboard_tab_id: null,
        row: 0,
        col: 0,
        size_x: 4,
        size_y: 3,
        series: [],
        visualization_settings: {},
        parameter_mappings: [],
      },
    ],
    ordered_tabs: [],
  });
});
