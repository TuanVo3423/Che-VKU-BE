const siteRoute = require("./site");
const productRoute = require("./product");
const authRoute = require("./auth");
const adminRoute = require("./admin");
const meRoute = require("./me");
const commentRoute = require("./comment");
const userRoute = require("./users");
const chatRoute = require("./chat");

function Routes(app) {
  app.use("/products", productRoute);
  app.use("/comments", commentRoute);
  app.use("/auth", authRoute);
  app.use("/admin", adminRoute);
  app.use("/me", meRoute);
  app.use("/users", userRoute);
  app.use("/chat", chatRoute);
  app.use("/", siteRoute);
}

module.exports = Routes;
