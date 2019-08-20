const express = require('express')
const app = express()
require("./db") // database connection

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

require('./routes/main')(app) // all routes imported

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})
