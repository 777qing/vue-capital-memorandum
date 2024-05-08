//登录和注册
const express = require('express')
const router = express.Router()
const passport = require('passport')



const Profile = require('../../modules/Profiles')
const keys = require('../../config/keys')

//$ router GET api/profiles/test

router.get('/test', (req, res) => {
    //由于是本地所有在线上查询不到是否保存，可以利用这种办法
    User.find({}).then(user => {
        console.log(user);
    })
    res.json({ msg: 'profiles' })
})
//$ router post api/users/add
// @desc 创建信息接口
// @access Private
router.post('/add', passport.authenticate("jwt", { session: false }), (req, res) => {
    const profileFields = { type, describe, income, expend, cash, remark, date } = req.body
    // if(req.body.type) profileFields.type = req.bodcashy.type
    // if(req.body.describe) profileFields.describe = req.body.describe
    // if(req.body.income) profileFields.income = req.body.income
    // if(req.body.expend) profileFields.expend = req.body.expend
    // if(req.body.cash) profileFields.cash = req.body.cash
    // if(req.body.remark) profileFields.remark = req.body.remark
    // if(req.body.date) profileFields.date = req.body.date
    new Profile(profileFields).save().then(profile => {
        res.json(profile)
    })

})


//$ router post api/users/edit/:id
// @desc 编辑信息接口
// @access Private
router.post('/edit/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    const profileFields = { type, describe, income, expend, cash, remark, date } = req.body
    Profile.findOneAndUpdate({_id:req.params.id},{$set:profileFields},{new:true})
    .then(profile=>{
        res.json(profile)
    })

})


//$ router post api/profiles
// @desc 获取所有信息
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find({})
        .then(profile => {
            if (!profile) {
                return res.status(404).json('没有任何内容')
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

//$ router post api/profiles/：id
// @desc 获取单个信息
// @access Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({_id:req.params.id})
        .then(profile => {
            if (!profile) {
                return res.status(404).json('没有任何内容')
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

//$ router post api/profiles/delete/：id
// @desc 删除信息接口
// @access Private
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), 
(req, res) => {
    Profile.findOneAndDelete({_id:req.params.id})
    .then(profile=>{
        // profile.save().then(profile=>{
            res.json(profile)
        // })
    })
    .catch(err=>{
        res.status(400).json('删除失败')
    })
        
})


module.exports = router