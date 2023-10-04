require("dotenv").config();
const axios = require("axios");

const _client = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function setSessionId(sessionId) {
  _client.defaults.headers.common["X-Metabase-Session"] = sessionId;
}

module.exports = { ..._client, setSessionId };
