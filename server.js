const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { router } = require('./routes/auth')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extends : true,
}))

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})