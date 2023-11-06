## 步骤：
① 安装操作MySQL数据库的第三方模块(`mysql`)
② 通过 mysql模块连接到MySQL 数据库
③ 通过mysql模块执行SQL语句
### 1、安装mysql模块
```js
npm install mysql
```
### 2、配置mysql模块

```javascript
// 导入MySQL模块
const mysql = require('mysql')
// 建立与MySQL数据库的连接
const db = mysql.createPool({
    host: '127.0.0.1', // 数据库的IP地址
    user: 'root', // 登录数据库的账号
    password: 'admin', // 登录数据库的密码
    database: 'my_db_01' // 指定要操作哪个数据库
})
```
### 3、测试mysql模块是否能正常工作

```javascript
// 检测mysql模块是否能正常工作
db.query('select 1', (err, res) => {
    if(err) return console.log(err.message)
    // 只要能打印出[ RowDataPacket {'1': 1} ]的结果，就证明数据库连接正常
    console.log(res)
})
```
## 查询数据

```javascript
// 查询数据
db.query('select * from users', (err, res) => {
    if(err) return console.log(err.message)
    // 成功
    console.log(res)
})
```
## 新增数据
向users 表中新增数据，其中 `username`为`Spider-Man`，`password`为 `pcc321`。示例代码如下

```javascript
// 1、要插入到users表中的数据对象
const user = {username: 'Spider-Man', password: 'pcc321'}
// 2、待执行的SQL语句，其中英文的 ? 表示占位符
const sqlStr = 'insert into users (username, password) values (?, ?)'
// 3、使用数组的形式，依次为 ? 占位符指定具体的值
db.query(sqlStr, [user.username, user.password], (err, res) => {
    if(err) return console.log(err.message)
    // 成功
    if(res.affectedRows === 1) console.log('插入数据成功！')
})
```
## 新增数据的便捷方式
向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速插入数据

```javascript
const user = {username: 'atm', password: 'pcc321'}
// 2、set ?
const sqlStr = 'insert into users set ?'
db.query(sqlStr, user, (err, res) => {
    if(err) return console.log(err.message)
    // 成功
    if(res.affectedRows === 1) console.log('插入数据成功！')
})
```
## 更新数据

```javascript
// 要更新的数据对象
const user = { id: 7, username: 'aaa', password: '000' }
// 要执行的SQL语句
const sqlStr = 'update users set username=?, password=? where id=?'
db.query(sqlStr, [user.username, user.password, user.id], (err, res) => {
    if(err) return console.log(err.message)
    // 成功
    if(res.affectedRows === 1) console.log('更新数据成功')
})
```
## 更新数据的便捷方式

```javascript
// 要更新的数据对象
const user = { id: 7, username: 'bbb', password: '000' }
// 要执行的SQL语句
const sqlStr = 'update users set ? where id=?'
db.query(sqlStr, [user, user.id], (err, res) => {
    if(err) return console.log(err.message)
    // 成功
    if(res.affectedRows === 1) console.log('更新数据成功')
})
```
## 删除数据

```javascript
// 要执行的语句
const sqlStr = 'delete from users where id=?'
// 注意：如果 SQL 语句中有多个占位符，则必须使用数组为占位符指定具体的值
//      如果 SQL 语句中只有一个占位符可以省略数组
db.query(sqlStr, 7, (err, res) => {
    if(err) return console.log(err.message)
    // 成功
    if(res.affectedRows === 1) console.log('删除数据成功')
})
```

## 逻辑删除
使用`DELETE`语句，会把真正的把数据从表中删除掉。为了保险起见，推荐使用标记删除的形式，来模拟删除的动作。
所谓的标记删除，就是在表中设置类似于`status`这样的状态字段，来标记当前这条数据是否被删除。
当用户执行了删除的动作时，我们并没有执行`DELETE`语句把数据删除掉，而是执行了`UPDATE`语句，将这条数据对应的`status`字段标记为删除即可。
