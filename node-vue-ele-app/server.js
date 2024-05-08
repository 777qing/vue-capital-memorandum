const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const passport = require('passport')
const app = new express()

// 引入路由users
const users = require('./routes/api/users')
// 引入profiles
const profiles = require('./routes/api/profiles')

const db = require('./config/keys').mongURL
//使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//连接mongodb数据库
mongoose.connect(db)
    .then(() => {
        console.log('ok');
    })
    .catch((err) => {
        console.log('no', err);
    })

//passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport)

app.get('/', (req, res) => {
    res.send('hello!')
})

app.use("/api/users", users)
app.use("/api/profiles",profiles)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('服务已经启动', port);
})