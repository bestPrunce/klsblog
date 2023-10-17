- 原数组
```javaScript
const list = [
    { label: "1-1-1", id: 7, parentId: 4 },
    { label: "1", id: 1, parentId: 0 },
    { label: "2", id: 2, parentId: 0 },
    { label: "3", id: 3, parentId: 0 },
    { label: "1-1", id: 4, parentId: 1 },
    { label: "2-1", id: 5, parentId: 2 },
    { label: "3-1", id: 6, parentId: 3 },
];
```

- 解决方案1(递归)
```javaScript
function getTree(list) {
    const map = new Map(list.map(item => [item.id, item]));
    const result = [];
    for (const item of list) {
        const parent = map.get(item.parentId);
        if (parent) {
        (parent.children || (parent.children = [])).push(item);
        } else {
        result.push(item);
        }
    }
    return result;
}
```

- 解决方案2(--)
```javaScript
function getTree(list, parentId) {
  const obj = {};
  const result = [];

  list.forEach(e => {
    obj[e.id] = { ...e, children: [] };
  });

  list.forEach(e => {
    if (e.parentId === parentId) {
      result.push(obj[e.id]);
    } else if (obj[e.parentId]) {
      obj[e.parentId].children.push(obj[e.id]);
    }
  });

  return result;
}
```