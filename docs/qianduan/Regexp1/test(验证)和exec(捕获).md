# 正则表达式中有两个核心方法
## 1. test 验证 ===> 验证我们的字符串是否符合正则表达式这个规则
语法：`reg.test('你要检测的对象')`
返回值：布尔类型（true符合规则， false不符合规则）
## 2. exec 捕获 ===> 从一个字符串中获取符合我们规则的一个字符串
语法：`reg.exec('你要检测的对象')`
返回值：null ===> 被检测对象中没有符合条件的字符; 数组：[0] 就是捕获到的片段，不管你有多个少片段，都是是捕获第一个片段.....
```javascript
    // test 验证
    let reg = /123/
    console.log(reg.test('234')); //false
    console.log(reg.test('123456')); //true
    console.log(reg.test('456123')); //true
	// exec 捕获
    let reg = /123/
    console.log(reg.exec('abc123'));
    console.log(reg.exec('abc123abc123s'));
```