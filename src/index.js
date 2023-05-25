const express = require('express')
const mongoose = require('mongoose')
const router = require("./routers/router")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.set('strictQuery', true)
mongoose.connect(process.env.URI)
      .then(() => console.log("My DB is coonected"))
      .catch((err) => console.error(err))


app.use("/", router)

app.listen(process.env.PORT, () => {
      console.log("Express app running on port " + process.env.PORT);
})
