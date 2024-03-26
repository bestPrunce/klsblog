# JS必备小技巧
## 1、空值合并运算符`??`
解析：用于判断运算符左侧的值为`null`或`undefined`时，才返回右侧的值(在`ECMAScript2020`中被引入)
案例：
```javaScript
const a = 0 ?? 1 // a = 0
const b = '' ?? 1 // b = ''
```
## 2、可选链操作符`?.`
解析：`?.`直接在链式调用的时候判断，判断左侧的对象是否为`null`或`undefined`，如果是的，就不再往下运算，返回`undefined`，如果不是，则返回右侧的值(在`ECMAScript2020`中被引入)

个人理解：可选链操作符(`?.`)允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。`?.` 操作符的功能类似于 `.` 链式操作符，不同之处在于，在引用为空(`nullish`) (`null`或者`undefined`) 的情况下不会引起错误，该表达式短路返回值是 `undefined`。与函数调用一起使用时，如果给定的函数不存在，则返回`undefined`。
```javaScript
// 定义一个对象
const user = {
  name: 'Alice',
  address: {
    city: 'Beijing',
    street: 'Main Street'
  }
};
// 使用可选链操作符访问嵌套属性
const city = user?.address?.city;
console.log(city); // 输出：'Beijing'
// 尝试访问不存在的属性
const age = user?.age;
console.log(age); // 输出：undefined
```
## 3、使用Array.prototype.at()简化arr.length
解析：`Array.prototype.at()`接收一个正整数或者负整数作为参数，表示获取指定位置的成员,参数正数就表示顺数第几个，负数表示倒数第几个，这可以很方便的某个数组末尾的元素
```javaScript
var arr = [1, 2, 3, 4, 5]
// 以前获取最后一位
console.log(arr[arr.length-1]) //5
// 简化后
console.log(arr.at(-1)) // 5
```
## 4、当同时声明多个变量时，可简写成一行
```javaScript
let x;
let y = 20;
//简写
let x, y = 20;
```
## 5、解构为多个变量同时赋值
```javaScript
let a, b, c;
a = 5;
b = 8;
c = 12;
//简写
let [a, b, c] = [5, 8, 12];
```
## 5、使用&&运算符简化if语句
```javaScript
if (isLoggedin) {
    goToHomepage();
}
//简写
isLoggedin && goToHomepage();
```
## 6、获取数组中的最大和最小值
```javaScript
const arr = [2, 8, 15, 4];
Math.max(...arr); // 15
Math.min(...arr); // 2
```

## 7、padstart()
padstart()方法用于将当前字符串用另一个字符串填充，以便产生一个达到给定长度的新字符串。填充从当前字符串的开始(左侧)应用。
```javaScript
const str ='5';
console.log(str.padstart(2，'0'));//输出'05‘
```