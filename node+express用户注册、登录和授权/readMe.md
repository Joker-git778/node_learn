# 记录

## 1. npm init

## 2. npm i express@next --save

## 3. npm i mongoose --save 操作服务器

## 4. REST Client 安装插件

1. vscode的HTTP插件相当于postman

2. 使用创建.http eg: test.http  详情查看

## 5. 定义mongoose  models.js

## 6. 用户名密码判断存在、重复 加密 token

1. npm i bcrypt --save 或者 npm i bcryptjs --save  密码加密

2. npm i jsonwebtoken --save 生成token jsonwebtoken包

## 7. ssh-keygen -t rsa -b 2048 -f private.key生成秘钥

1. 获取签发 JWT 时需要用的密钥 <br>
   const privateKey = fs.readFileSync('./private.key');