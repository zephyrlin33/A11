// app.js
// include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose
const Short = require('./models/shorten.js') // 載入 model
//const bodyParser = require('body-parser')過時
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

// setting body-parser
app.use(express.urlencoded({ extended: true }))

// setting routes
app.get('/', (req, res) => {
    //console.log('get form GET request')
    res.render('index')
})

app.post('/',(req,res) => {
  if (!req.body.url) return res.redirect("/")//錯誤處理
//const {input}=req.params
    console.log(req.params)
})

app.post('/output', (req, res) => {
    const output = generateShorten()
    res.render('output', {output})
    
    Short.create(req.body)
    .then()
    .catch(error => console.log(error))
    
  })


// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})