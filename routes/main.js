const verifyToken = require("../middlewares/verify_token.middleware")
const users = require("./users")
const index = require("./index")
const books = require("./books")
const shops = require("./shop.route")
const auth = require("./auth.route")

const routes = (app) => {
    app.use("/", index)
    app.use("/auth", auth)
    app.use("/book", books)
    app.use("/shop", verifyToken(), shops)
    app.use("/user", users)
}

module.exports = routes
