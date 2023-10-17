# js实现复制文本内容

```javaScript
const copyText = (value) => {
    // 判断当前页面是否在安全上下文中运行。如果是 HTTPS 或者其他安全来源加载的页面
  if (window.isSecureContext) {
    navigator.clipboard.writeText(value).then((res) => {
        alert('复制成功！')
    });
  } else {
    // http或不安全来源可以用此方法复制文本
    const textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.textContent = value;
    textArea.select();
    document.execCommand && document.execCommand("copy");
    textArea.remove();
    alert('复制成功！')
  }
};
```
