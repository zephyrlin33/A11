const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose
const Short = require('./models/shorten') // 載入 model
const generateShorten = require('./generate_shorten.js')

const app = express()
const port = 3000

//MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

// setting routes
app.get('/', (req, res) => {
  //console.log('get form GET request')
  res.render('index')
})


app.post('/output', (req, res) => {
  if (!req.body.input) {
    return res.redirect("/")
  }
  const input = req.body.input
  //console.log(input)

  Short.findOne({ input })
    .then(data => {
      if (data) {
        console.log('already exist')
        return data.output
      } else {
        const output = generateShorten()
        req.body.output = output
        Short.create(req.body)
        return output
      }
    })
    .then(output => res.render('output', { output }))
    .catch(error => console.log(error))

})

app.get('/:newURL', (req, res) => {

  const { newURL } = req.params
  Short.findOne({ output: newURL })
    .then(data => res.redirect(data.input))
    .catch(error => console.log(error))
})

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})