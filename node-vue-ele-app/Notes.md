1. 新建文件夹
2. npm init (创建package.json文件)
3. 搭建服务器
    (1) 使用express插件：npm i express 
    (2) 创建导入文件(npm init 时候选择的),该项目用的是server.js
    (3) 写入服务端代码，终端node server.js  启动
    (4) 避免每一次写代码都需要重新启动node.js，可以安装nodemon (npm i nodemon)
    (5) 修改package.json启动代码：命令变成(npm run start / npm run server)
        ```
        "scripts": {
           "start": "node server.js",
          "server":"nodemon server.js"
         },
        ```
    (6) 访问http://localhost:5000/可以看到效果
4. 采用的是本地的mongodb,所以需要自行下载
5. 创建config文件和key.js文件，在里面写入数据库的服务端地址
6. 在server.js 引入mongoose 导入服务端地址
7. 创建连接
       ```
       mongoose.connect(db)
        .then(() => {
            console.log('ok');
            
        })
        .catch((err)=>{
            console.log('no',err);
        })
       ```
8. 完成user用户模块（modules>user.js）并导出
9. 路由user导入添加post 注册请求
    (1) 校验该邮箱是否已经被注册
    (2) 可以给密码进行加密，npm i bcrypt 加密
    ```
      bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(newUser.password,salt,function(err,hash){
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                    .then(user=>res.json(user))
                    .catch(err=>console.log(err))
                })
            })
    ```
    (3) 由于该数据库在本地且没有安装更为细致的检查插件，可以在暂时查询
     ```
        router.get('/test',(req,res)=>{
        //由于是本地所有在线上查询不到是否保存，可以利用这种办法
        // User.find({}).then(user=>{
        //     console.log(user);
        // })
        res.json({msg:'login'})
        })
     ```
10. 头像暂时使用第三方库 gravatar(npm i gravatar)
    ```
     var avatar = gravatar.url('emerleite@gmail.com',{s:'200',r:'pg',d:'mm'})
    ```
11. 创建登陆路由，判断邮箱和密码是否相同，由于保存时候使用加密，所以对照的时候需要解开密码
12. 实现返回token （npm i jsonwebtoken）
    (1) jwt.sign("规则","加密名字","过期时间","箭头函数")
13. 验证token (npm install passport-jwt passport )
    (1) server.js 导入const passport = require('passport')
    (2) 创建passport文件新型配置
14. 回到module的user中添加新的字段identity
    (1) 将router中的user也都添加上identity
15. 创建新页面数据接口的数据验证
    (1) 在module文件创建Profiles
16. 路由创建proflie页面
17. 创建新的数据库 use profiles
    (1) 配置post添加接口
    (2) 配置查询数据接口
    (3) 配置编辑接口
    (4) 配置删除接口
        findOneAndRemove 已经被换 findOneAndDelete
        findOneAndDelete 自带返回被删除的数据，所以save不在被需要
       ```
        router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), 
        (req, res) => {
            Profile.findOneAndDelete({_id:req.params.id})
            .then(profile=>{
              //  profile.save().then(profile=>{
                    res.json(profile)
              //  })
            })
            .catch(err=>{
                res.status(400).json('删除失败')
            })
                
        })

       ```

前后端连载:
1. concurrently(npm install concurrently)
2. 前端package.json
   ```
     "scripts": {
       "serve": "vue-cli-service serve",
       "build": "vue-cli-service build",
       "start":"npm run serve"
     },
   ```
3. 后端package.json
   ```
     "scripts": {
       "client-install":"npm install --prefix client",
       "client":"npm start --prefox client",
       "start": "node server.js",
       "server": "nodemon server.js",
     },
   ```
   配置之后 npm run dev 就可以启动了


前端
1. 前端页面的准备工作
   (1) vue create client
   (2) 删除多余的页面和代码
   (3) 创新新的页面index.vue 配置响应的路由
   (4) 引入公共的css样式
   (5) 安装element (npm install element-plus --save)
   (6) 引入样式
2. 搭建注册页面和404
   (1) 创建注册页面并且配置路由
   (2) 404 同上
   (3) 引入element 的form
   (4) 进行页面样式规则的设定
3. axios
   (1) 下载axios (npm i axios)
   (2) main.js 导入并绑定在app上
   (3) 创建接口请求的接口server/http.js
   (4) 导入element-ui 的加载动画，创建开始函数和结束函数
   (5) 写上基本的请求拦截、相应拦截
   (6) 前端解决跨域问题 vue.config.js

4. 注册页面进行注册请求，和跳转页面
5. 创建登录页面
   (1) 创建登录页面，修改登录页面样式代码
   (2) 配置登录接口请求
   (3) 配置登录路由
   (4) 请求成功读取token，将token保存在浏览器存储
6. 设置路由守卫
   (1) 根据是否存在token， 来制定路由的位置
   (2) 接口根据token 配置拦截
7. 安装解析token 插件(npm i jwt-decode)，登陆页面引入并且解析
8. 配置store内的内容
   (1) 设置初始值和改变值得方法
   (2) 在登陆的时候将token保存在store
9. 刷新的时候可能会有丢失token的可能，在APP里面解决一下(created)
10. 设置顶部导航
    (1) 样式
    (2) 引入头像下拉框
    (3) 配置个人信息和退出跳转（退出清楚信息封装在store中）
11. 设置个人信息页面
    (1) 页面、样式
    (2) 配置路由等等
12. 其他一些简单的资金流水页面和侧边栏不多做解释步骤基本无差别

注意：自己做的时候有些插件之类的，可能写法有所改变需要自行查询