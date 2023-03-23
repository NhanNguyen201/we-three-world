const PORT = process.env.PORT || 5000

const express = require("express")
const setSafeHeader = require('./middlewares/safeHeader')
const dotenv = require('dotenv')
dotenv.config()
const memoliaController =  require('./controllers/memolia')

const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(setSafeHeader)

app.set("view engine", "ejs")




app.get("/", (req, res) => {
    res.send("Hi there !")
})
app.get("/m", memoliaController.getWorld)
app.listen(PORT, () => console.log(`Server runing at ${PORT}`))