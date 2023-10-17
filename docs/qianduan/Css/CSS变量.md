# CSS 变量

## CSS 变量声明
解释：由自定义属性标记设定值（比如： `--main-color: black;`），由 `var()` 函数来获取值（比如：`color: var(--main-color);`）

```css
:root {
    --primary: #0288d1;
}
```
上段代码中我们定义了一个`primary`变量，需要注意的是我们需要在自定义属性前面加上`--`才算是变量，这是`CSS`变量的声明规则。上面的`:root`是一个伪类，它相当于一个全局作用域，我们都知道变量是有作用域的概念的，声明在`:root`伪类中的变量可以在全局`CSS`代码中使用。

## CSS 变量使用
解释：`CSS`变量的使用需要使用到一个`CSS`内置函数`var()`，代码如下：
```css
div {
    color: var(--primary);
}
```

## 变量命名规则
- 不能包含`$，[，^，(，%`等字符
- 普通字符局限在只要是数字`[0-9]`字母`[a-zA-Z]`下划线`_`和短横线`-`这些组合
- 可以是中文，日文或者韩文
- 无论是变量的定义和使用只能在声明块`{}`里面

## var函数使用
```css
var( <custom-property-name> , <declaration-value>? )
```
参数解释：
- `<custom-property-name>`：自定义属性名，也就是我们自定义的变量。
- `<declaration-value>`：可选参数，如果我们自定义的变量值无效的话，该参数就作为回退值使用，也就是 var 函数的默认值。
```css
    color: var(--primary, blue);
```

## 全局变量
将`CSS`变量声明在了`:root`伪类中，这个时候的变量就是全局变量，即所有`CSS`样式代码中都可以使用到该变量。
```css
:root {
  --bgColor: rgb(82, 70, 70);
}
```

## 局部变量
我们也可以将变量的声明放在某一个选择器内部，这个时候该变量就是一个局部变量，属于该元素的所有子元素都可以使用到该变量。
```scss
div {
    --primary: blue;
}
div p {
    color: var(--color);
}
```

## 变量的拼接
变量是数值时
```css
:root {
    --color: yellow;
    --height: 100;
}
/* 2 种错误的写法 */
div {
    height: var(--height)px;
    height: var(--height) + 'px';
}
/* 正确的写法 */
div {
    height: calc(var(--height) * 1px);
}
```

## 换肤原理
换肤是 CSS 变量实践的一个典型场景，我们通常使用 Less 或者 Sass 与 CSS 变量结合的方式来实现换肤，我们这里直接使用 CSS 变量来演示换肤最简单的原理。

```html
<head>
    <style>
        :root {
            --theme: yellow;
        }
        .box {
            width: 100px;
            height: 100px;
            background-color: var(--theme);
        }
    </style>
</head>
<body>
  <div class="box"></div>
  <button id="btn1">切换黑色主题</button>
  <button id="btn2">切换黄色主题</button>
</body>
<script>
  let box = document.getElementsByClassName('box')[0];
  let btn1 = document.getElementById('btn1');
  let btn2 = document.getElementById('btn2');
  btn1.addEventListener('click', () => {
    box.style.setProperty('--theme','#000'); 
  })
  btn2.addEventListener('click', () => {
    box.style.setProperty('--theme','yellow'); 
  })
</script>
```