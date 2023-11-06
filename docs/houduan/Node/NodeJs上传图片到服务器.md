# NodeJs上传图片到服务器

## app.js
前提是要新建一个uploads文件夹，用于存放图片

```js
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 设置上传文件的存储路径和文件名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

// 创建 multer 实例，配置文件限制和存储路径等信息
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 限制文件大小为 5MB
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    console.log(file);
    if (!file) {
      return res.status(400).send('请选择要上传的图片');
    }
    res.send('图片上传成功');
  });
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

```
## 前端代码

```html
  <form action="http://localhost:3000/upload" method="POST" enctype="multipart/form-data">
    <input type="file" name="file">
    <button type="submit">上传</button>
  </form>
```
