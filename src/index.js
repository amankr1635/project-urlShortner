const express = require('express')
const mongoose = require('mongoose')


const app = express()
app.use(express.json())

mongoose.connect("")
.then(() => console.log("My DB is coonected"))
.catch((err)=> console.error(err))


app.use("/", route)

app.listen(3000, () => {
      console.log("Express app running on port " + 3000);
})
