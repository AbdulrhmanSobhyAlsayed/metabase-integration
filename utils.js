const request = require("./request");

exports.getDatabaseId = async (databaseName) => {
  const response = await request.get("/database");

  return response.data.data.filter((item) => item.name === databaseName)[0].id;
};

exports.getCollectionId = async (collectionSlug) => {
  const response = await request.get("/collection");
  return response.data.filter((item) => item.slug === collectionSlug)[0].id;
};
