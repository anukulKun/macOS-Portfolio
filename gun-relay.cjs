const express = require("express");
const Gun = require("gun");

const app = express();
const port = 8765;

const server = app.listen(port, () => {
  console.log(`Gun relay running on http://localhost:${port}/gun`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${port} already in use — relay may already be running.`);
    process.exit(0);
  }
  throw err;
});

Gun({ web: server });
