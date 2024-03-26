方案一（大众方案包含vue和原生js的输入框）

```javascript
// 填写输入框内容，并且赋值给输入框
function fillInput(input, value) {
    input.value = value;
    input.dispatchEvent(new Event('input', {
        bubbles: true,
        cancelable: true,
        composed: true
    }));
    input.dispatchEvent(new Event('change', {
        bubbles: true,
        cancelable: true,
        composed: true
    }));
}
```
方案二（针对react框架）、
如果你确定 input 元素存在，并且没有语法错误或其他JavaScript错误导致代码未能执行，但是值仍然没有设置，可能有以下原因：
**输入框可能有保护措施：**
一些前端框架或自定义JavaScript代码可能会阻止非用户交互的值变更，以避免潜在的XSS攻击或不当操作。
**输入框可能是由React或其他现代JavaScript框架管理的：**
这些框架通常不会监听 DOM 元素的直接变更，而是有自己的状态管理系统。如果你直接更改 DOM，框架的状态不会更新，因此它将在下一次状态同步时覆盖你的变更。

**输入框可能有额外的事件监听器：**
可能有其他事件监听器（如 keyup, keydown, focus, blur 等）对值变更有影响。
如果你怀疑这个输入框是由React或类似的框架管理的，你可以尝试模拟更像用户的行为。下面是一个针对React管理的输入框的示例代码：

```javascript
function setReactInputValue(input, value) {
    let lastValue = input.value;
    input.value = value;
    let event = new Event('input', { bubbles: true });
    // React 15的hack
    event.simulated = true;
    // React 16的hack
    let tracker = input._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    input.dispatchEvent(event);
}
```
