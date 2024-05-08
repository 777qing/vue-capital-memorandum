1. 创建配置文件 .conf 
```
#数据库文件保存路径
dbpath =D:\data\db
#日志保存路径
logpath=D:\qianduan\mongodb-win32-x86_64-windows-6.0.14\log\mongo.log
#打开日志的输出操作
logappend=true
noauth=true
#设置端口
port=27097
```

2. 执行指令 cmd 管理员
--config 参数指定了MongoDB的配置文件路径，这里我们使用了MongoDB默认的配置文件
--install 参数用于将MongoDB安装为Windows服务，这样系统会在启动时自动启动MongoDB。
```
mongod --config D:\qianduan\mongodb-win32-x86_64-windows-6.0.14\mongodb.conf --install
```

3. 启动/停止/删除
```powershell
net start MongoDB

net stop MongoDB

mongod --remove

#shell 测试 
mongosh 127.0.0.1:27097
```
