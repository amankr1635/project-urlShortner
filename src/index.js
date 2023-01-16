const express = require('express')
const mongoose = require('mongoose')
const router = require("./routers/router")

const app = express()
app.use(express.json())

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://Amankr:pwwELCe59UIUh9mj@cluster0.oxwexg5.mongodb.net/group15Database")
      .then(() => console.log("My DB is coonected"))
      .catch((err) => console.error(err))


app.use("/", router)

app.listen(3000, () => {
      console.log("Express app running on port " + 3000);
})
