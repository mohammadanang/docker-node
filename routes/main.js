const verifyToken = require("../middlewares/verify_token.middleware")
const users = require("./users")
const index = require("./index")
const books = require("./books")
const shops = require("./shop.route")
const auth = require("./auth.route")
const verifyBearerToken = require("../middlewares/verify_bearer_token.middleware")

const routes = (app) => {
    app.use("/", index)
    app.use("/auth", auth)
    app.use("/book", verifyBearerToken(), books)
    app.use("/shop", shops)
    app.use("/user", verifyToken(), users)
}

module.exports = routes
