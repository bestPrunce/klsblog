# MutationObserver简介

## 简介：
MutationObserver接口提供了监视DOM树所做更改的功能。它被设计为旧的Mutation Events特性的替代品，后者是DOM3 Events规范的一部分。

## 构造函数
`MutationObserver()`
创建并返回一个新的`MutationObserver`，该MutationObserver将在DOM发生更改时调用指定的回调函数。

## 实例方法

### `disconnect()`
停止`MutationObserver`实例接收进一步的通知，除非再次调用`observe()`。

### `observe()`
配置`MutationObserver`，使其在DOM发生与给定选项匹配的更改时，通过回调函数开始接收通知。

### `takeRecords()`
从`MutationObserver`的通知队列中移除所有挂起的通知，并将它们返回到一个新的`MutationRecord`对象数组中。

### Example
```javaScript
// Select the node that will be observed for mutations
const targetNode = document.getElementById("some-id");

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
    } else if (mutation.type === "attributes") {
      console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
observer.disconnect();

```