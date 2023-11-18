const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const colors = require("colors");

// Handling Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log(
    `Shutting down the server due to Uncaught exceptions`.inverse.red
  );

  process.exit(1);
});

// Config
dotenv.config({ path: "backend/config/config.env" });

// Database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log(
    `Shutting down the server due to unhandled rejection`.inverse.red
  );

  server.close(() => {
    process.exit(1);
  });
});
