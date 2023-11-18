const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/Error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// Route import
const product = require("./routes/productRoutes");
const user = require("./routes/userRouters");
const orders = require("./routes/orderRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", orders);

// Middleware for error handling
app.use(errorMiddleware);

module.exports = app;
