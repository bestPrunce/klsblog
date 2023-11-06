# Express模块

## Express模块介绍

`Express`是一个基于Node.js平台的Web应用开发框架，提供了一系列的API来构建Web应用。它简化了Node.js的HTTP服务器的编程，使得开发者可以更加专注于业务逻辑的实现。

使用Express，可以轻松地创建Web应用程序，包括处理请求、路由控制、模板渲染、中间件管理、错误处理等功能，同时也支持许多第三方中间件和插件。

### 创建一个Express应用

创建一个Express应用的步骤如下：

1. 安装Express模块：`npm install express --save`

2. 在代码中引入Express模块：

```javascript
const express = require('express');
const app = express();
```

3. 启动服务器：

```javascript
app.listen(3000, () => {
  console.log('服务器已启动');
});
```

### 设置路由

在Express中，可以使用`app.get()`、`app.post()`、`app.put()`、`app.delete()`等方法设置对应的HTTP请求方法和路由。例如：

```javascript
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', (req, res) => {
  // 处理POST请求
});

app.put('/users/:id', (req, res) => {
  // 处理PUT请求
});

app.delete('/users/:id', (req, res) => {
  // 处理DELETE请求
});
```

### 使用中间件

Express中的中间件是一种具有特殊功能的函数，它可以访问请求对象（`req`）、响应对象（`res`）和应用程序的中间件堆栈中的下一个中间件函数（`next`）。常用的中间件有以下几种：

#### 解析请求体

- `express.json()`：解析`application/json`类型的请求体。
- `express.urlencoded()`：解析`application/x-www-form-urlencoded`类型的请求体。

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

#### 提供静态文件服务

- `express.static()`：提供静态文件服务。

```javascript
app.use(express.static('public'));
```

#### 使用cookie和session

- `cookie-parser`：解析cookie。
- `express-session`：使用session。

```javascript
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(session({ secret: 'secret-key' }));
```

### 渲染模板

在Express中，可以使用模板引擎来渲染动态页面。常用的模板引擎有`EJS`、`Pug`、`Handlebars`等。

#### 配置模板引擎

```javascript
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
```

#### 渲染模板

```javascript
app.get('/', (req, res) => {
  const data = { title: 'Express应用', message: 'Hello World!' };
  res.render('index', data);
});
```

### 处理错误

在Express中，可以使用`app.use()`方法设置错误处理中间件。

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('服务器错误');
});
```

## 总结

以上是Express模块的详细介绍和常用方法。使用Express，可以快速构建Web应用程序，提高开发效率。除了以上方法外，还有许多其他的方法可以满足不同的需求，可以查看官方文档进行学习和深入了解。

[Express官网传送门](https://www.expressjs.com.cn/)