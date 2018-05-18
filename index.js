const mongoose = require("mongoose");
const ng = require("name-generator-mongoose");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const schema = require("./graphql-name");
const cors = require("cors");

// Private config file. See config-example.js
const config = require("./config");

const PORT = 3000;

// Connect to MongoDB
mongoose.connect(config.dburl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  var app = express();
  app.use(cors());
  app.listen(PORT, () => {
    console.log(`Webserver started. Port: ${PORT}`);
  });
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema.schema
    })
  );
});
