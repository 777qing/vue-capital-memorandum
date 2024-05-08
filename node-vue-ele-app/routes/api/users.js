//登录和注册
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport = require('passport')



const User = require('../../modules/User')
const keys = require('../../config/keys')

//$ router GET api/users/test

router.get('/test', (req, res) => {
    //由于是本地所有在线上查询不到是否保存，可以利用这种办法
    User.find({}).then(user => {
        console.log(user);
    })
    res.json({ msg: 'login' })
})

//$ router POST api/users/register
// @desc 返回的请求的json数据
// @access public
router.post('/register', (req, res) => {
    //查询数据库中是否拥有邮箱
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json("邮箱已被注册")
            } else {
                var avatar = gravatar.url('emerleite@gmail.com', { s: '200', r: 'pg', d: 'mm' })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    identity: req.body.identity,
                    avatar,
                    password: req.body.password
                })
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })

            }
        })
})

//$ router POST api/users/login
// @desc 返回 token jwt passport
// @access public
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    //查询数据库
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json("用户不存在！")
            }
            //密码匹配
            bcrypt.compare(password, user.password)
                .then(isMath => {
                    if (isMath) {
                        const rule = { id: user.id, name: user.name, avatar: user.avatar, identity: user.identity }
                        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                        // jwt.sign("规则","加密名字","过期时间","箭头函数")
                        // res.json({msg:"success"})
                    } else {
                        return res.status(400).json("密码错误")
                    }

                })

        })
        .catch((err) => {
            console.log(err);
        })
})

//$ router GET api/users/current
// @desc return current user
// @access Private
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })
})

module.exports = router