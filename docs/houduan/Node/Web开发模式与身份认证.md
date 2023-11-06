## 目前主流的Web开发模式有两种，分别是:

① 基于服务端渲染的传统Web开发模式

② 基于前后端分离的新型 Web开发模式

### 1.服务端渲染的Web开发模式

 服务端渲染的概念:服务器发送给客户端的HTML页面，是在服务器通过字符串的拼接，动态生成的。因此，客户端不需要使用Ajax这样的技术额外请求页面的数据。

**服务端渲染的优缺点**

优点:

① `前端耗时少。`因为服务器端负责动态生成HTML内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电。

② `有利于SEO。`因为服务器端响应的是完整的HTML页面内容，所以爬虫更容易爬取获得信息，更有利于SEO.

缺点:

① `占用服务器端资源。`即服务器端完成HTML页面内容的拼接，如果请求较多，会对服务器造成一定的访问压力

② `不利于前后端分离，开发效率低。`使用服务器端渲染，则无法进行分工合作，尤其对于前端复杂度高的项目，不利于项目高效开发。

**前后端分离的优缺点**

优点:

① `开发体验好。`前端专注于UI页面的开发，后端专注于api的开发，且前端有更多的选择性。

② `用户体验好。`Ajax技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新。

③ `减轻了服务器端的渲染压力。`因为页面最终是在每个用户的浏览器中生成的。

缺点:

① `不利于SEO。`因为完整的 HTML 页面需要在客户端动态拼接完成，所以爬虫对无法爬取页面的有效信息。(解决方案：利用Vue、React等前端框架的SSR(server side render）技术能够很好的解决SEO问题! )

## 什么是身份认证

身份认证(Authentication）又称“身份验证”、“鉴权”，是指通过一定的手段，完成对用户身份的确认。

### 不同开发模式下的身份认证

对于服务端渲染和前后端分离这两种开发模式来说，分别有着不同的身份认证方案:

① 服务端渲染推荐使用`Session认证机制`

② 前后端分离推荐使用`JWT认证机制`

## Session 认证机制

### 1、HTTP协议的无状态性

HTTP协议的无状态性，指的是客户端的每次HTTP请求都是独立的，连续多个请求之间没有直接的关系，服务器不会主动保留每次HTTP请求的状态。

### 2、如何突破HTTP无状态的限制

Web开发中的专业术语叫做Cookie

### 3、什么是Cookie

Cookie是存储在用户浏览器中的一段`不超过4KB的字符串`。它由一个名称(Name)、一个值(Value)和其它几个用于控制Cookie`有效期、安全性、使用范围`的可选属性组成。
`不同域名下的Cookie各自独立`，每当客户端发起请求时，会自动把当前域名下所有未过期的Cookie一同发送到服务器。

Cookie的几大特性:

① 自动发送

② 域名独立

③ 过期时限

④ 4KB限制

### 4、Cookie在身份认证中的作用

客户端第一次请求服务器的时候，服务器通过`响应头的形式`，向客户端发送一个身份认证的Cookie，客户端会自动将Cookie保存在浏览器中。
随后，当客户端浏览器每次请求服务器的时候，浏览器会`自动`将身份认证相关的Cookie，`通过请求头的形式`发送给服务器，服务器即可验明客户端的身份。
![在这里插入图片描述](https://bestprunce.github.io/klsblog/images/houduan/Cookie在身份认证中的作用.png)

### 5、Cookie 不具有安全性

由于Cookie是存储在浏览器中的，而且浏览器也提供了读写Cookie的 API，因此`Cookie很容易被伪造`，不具有安全性。因此不建议服务器将重要的隐私数据，通过Cookie的形式发送给浏览器。

### 6、Session 的工作原理

![在这里插入图片描述](https://bestprunce.github.io/klsblog/images/houduan/Session的工作原理.png)

## 在 Express 中使用 Session 认证

### 1、安装express-session中间件

```javascript
npm install express-session
```
### 2、配置 express-session 中间件

```javascript
const express = require('express')
// 1、导入session中间件
const session = require('express-session')
// 2、配置 session 中间件
const app = express()
app.use(session({
    secret: 'lqz', // secret 属性值可以为任意字符串
    reasve: false, // 固定写法
    saveUninitialized: true // 固定写法
}))
app.listen(80, () => {
    console.log('服务器运行在http://127.0.0.1')
})
```
### 3、向session中存储数据

当express-session中间件配置成功后，即可通过 `req.session` 来访问和使用session对象，从而存储用户的关键信息

```javascript
app.post('/api/login', (req, res) => {
    // 判断用户名密码是否正确
    if(req.body.username !== 'admin' || req.body.password !== 'admin') {
        return res.status(400).send({
            code: 400,
            message: '账户名或密码错误'
        })
    }
    // 其中user和islogin为任意字段，是自定义的
    req.session.user = req.body // 将用户的信息存储到session中
    req.session.islogin = true // 将用户的登陆状态存储到session中
    res.send({
        code: 200,
        message: '登陆成功'
    })
})
```
### 4、向 session 中取数据
可以直接从req.session对象上获取之前存储的数据，示例代码如下:

```javascript
app.get('/api/uesrname', (req, res) => {
    // 判断用户是否登录
    if(req.session.islogin) {
        return res.send({
            code: 200,
            message: req.session.user.username
        })
    } else {
        res.status(401).send({
            code: 401,
            message: '您还未登录'
        })
    }
})
```
### 5、清空session

调用req.session.destroy()函数，即可清空服务器保存的session 信息。

```javascript
app.post('/api/logout', (req, res) => {
    // 清空当前客户端存储的session信息
    req.session.destroy()
    res.send({
        code: 200,
        message: '退出成功！'
    })
})
```
## JWT认证机制

Session认证机制`需要配合Cookie 才能实现`。由于`Cookie默认不支持跨域访问`，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域Session认证。

注意:

 - 当前端请求后端接口`不存在跨域问题的时候，推荐使用Session`身份认证机制。
 - 当前端需要跨域请求后端接口的时候，不推荐使用Session身份认证机制，推荐使用JWT认证机制。

### 1、什么是JWT

JWT (英文全称:JSON Web Token）是目前最流行的跨域认证解决方案。
### 2、JWT 的工作原理

![在这里插入图片描述](https://bestprunce.github.io/klsblog/images/houduan/JWT的工作原理.png)

总结:用户的信息通过Token字符串的形式，保存在客户端浏览器中。服务器通过还原Token字符串的形式来认证用户的身份。

### 3、JWT的组成部分

JWT通常由三部分组成，分别是`Header` (头部)、`Payload`(有效荷载)`Signature`(签名)，三者之间使用英文的“”分隔，格式如下:

```javascript
Header.Pay1oad.Signature
```

### 4、JWT的三个部分各自代表的含义

① `Payload`部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串。

② `Header`和`Signature`是安全性相关的部分，只是为了保证Token的安全性。

### 5、JWT的使用方式

客户端收到服务器返回的WT之后，通常会将它储存在`localStorage`或`sessionStorage`中。

此后，客户端每次与服务器通信，都要带上这个JWT的字符串，从而进行身份认证。推荐的做法是`把JWT放在HTTP请求头的Authorization字段中`，格式如下:

```javascript
Authorization: Bearer <token>
```
### 6、在Express中使用JWT

运行如下命令，安装如下两个JWT相关的包:
```javascript
npm install jsonwebtoken express-jwt
```
其中：

① `jsonwebtoken`用于**生成JWT字符串**

② `express-jwt`用于**将JWT字符串解析还原成JSON对象**

#### Ⅰ、导入JWT相关的包

```javascript
// 导入用于生成 JWT 字符串的包
const jwt = require('jsonwebtoken')
// 导入用于将客户端发送过来的 JWT 字符串，解析成 JSON 对象的包
const expressJWT = require('express-jwt')
```
#### Ⅱ、定义 secret 密钥

为了保证`JWT字符串的安全性`，防止JWT字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的secret密钥:

① 当生成JWT字符串的时候，需要使用secret密钥对用户的信息`进行加密`，最终得到加密好的JWT字符串

② 串当把JWT字符串解析还原成JSON对象的时候，需要使用secret密钥`进行解密`

```javascript
// 密钥的本质：一个字符串
const secretKey = 'lqzhah'
```
#### Ⅲ、在登录成功后生成 JWT 字符串
调用`jsonwebtoken包提供的sign()方法`，将用户的信息加密成WT字符串，响应给客户端:

```javascript
// 登录
app.post('/api/login', function(req, res) {
    // 判断用户名密码是否正确
    if(req.body.username !== 'admin' || req.body.password !== 'admin') {
        return res.status(400).send({
            code: 400,
            message: '账户名或密码错误'
        })
    } else {
        res.send({
            code: 200,
            message: '登录成功',
            // 调用 jwt.sign() 生成 JWT 字符串，三个参数分别是用户信息对象，加密密钥，配置对象
            token: jwt.sign({username: req.body.username}, secretKey, { expiresIn: '30s'})
        })
    }
})
```
#### Ⅳ、将JWT字符串还原为JSON对象
客户端每次在访问那些有权限接口的时候，都需要主动通过`请求头中的Authorization字段`，将Token字符串发送到服务器进行身份认证。
此时，服务器可以通过 `express-jwt` 这个中间件，自动将客户端发送过来的Token解析还原成JSON对象:

```javascript
// expressJWT({ secret: secretKey }) 就是用来解析 token 的中间件
// .unless({ path: [/^\/api\//]}) 用来指定哪些接口不需要访问权限
// 注意:只要配置成功了express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到req.user属性上
app.use(expressJWT({ secret:secretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }))
```
#### Ⅴ、捕获解析JWT失败后产生的错误
当使用express-jwt解析Token字符串时，如果客户端发送过来的`Token字符串过期或不合法`，会产生一个解析失败的错误，影响项目的正常运行。我们可以通过 Express的错误中间件，捕获这个错误并进行相关的处理，示例代码如下:

```javascript
app.use((err, req, res, next) => {
    // token 解析失败的错误
    if(err.name === 'UnauthorizedError') {
        return res.status(401).send({
            code: 401,
            message: '无效的token'
        })
    }
})
```
#### Ⅵ、源代码
```js
const express = require('express')
// 导入用于生成 JWT 字符串的包
const jwt = require('jsonwebtoken')
// 导入用于将客户端发送过来的 JWT 字符串，解析成 JSON 对象的包
const expressJWT = require('express-jwt')
// 密钥的本质：一个字符串
const secretKey = 'lqzhah'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('./pages'))
app.use(expressJWT({secret: secretKey, algorithms: ['HS256']}).unless({path:[/^\/api\//]}))
// 登录
app.post('/api/login', (req, res) =>{
    if(req.body.username !== 'admin' || req.body.password !== 'admin') {
        return res.status(400).send({
            code: 400,
            message: '账户名或密码错误'
        })
    } else {
        res.send({
            code: 200,
            message: '登录成功',
            token: jwt.sign({username: req.body.username}, secretKey, { expiresIn: '60s'})
        })
    }
})
app.get('/user', (req, res) =>{
    console.log(req.user);
    res.send({code: 111})
})
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        return res.status(401).send({
            code: 401,
            message: '无效的token'
        })
    }
})
app.listen(8088, () => {
    console.log('服务器运行在http://127.0.0.1/8088');
})
```
