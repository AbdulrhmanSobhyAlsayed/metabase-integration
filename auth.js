require("dotenv").config();

const request = require("./request");

module.exports = async (asyncFunc) => {
  const response = await request.post("/session", {
    username: process.env.LOGIN_USERNAME,
    password: process.env.LOGIN_PASSWORD,
  });

  request.setSessionId(response.data.id);

  await asyncFunc();
};
