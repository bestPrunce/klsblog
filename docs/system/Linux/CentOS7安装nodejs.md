# 安装node.js

## 1、查看node.js版本安装node.js

https://nodejs.org/dist/

### 1-1 进行安装目录：cd /opt/software (如果目录不存在，请先创建目录)

### 1-2 在命令行中输入以下命令

https://nodejs.org/dist/  在这个网站查看版本

```bash
wget https://nodejs.org/dist/v16.5.0/node-v16.5.0-linux-x64.tar.xz
```
```bash
//解压：
tar xvJf node-v16.5.0-linux-x64.tar.xz
//删除二进制包：
rm -rf node-v16.5.0-linux-x64.tar.xz
// 修改文件夹名称 ‘node-v16.5.0-linux-x64’ 为 ‘node’
mv node-v16.5.0-linux-x64 node
```

## 2、配置环境变量

### 2-1 vim中配置环境变量

```bash
//编辑环境变量文件：
vi /etc/profile
export PATH=$PATH:/opt/software/node/bin/
```
vim命令
```bash
vi /etc/profile //编辑文件
i  //插入
:q //退出
:q! 不保存退出
:wq 保存退出
```

### 2-2 命令行中保存环境变量

```bash
source /etc/profile
```

### 2-3 检查安装版本

```bash
node -v
npm -v
```

## 3、更换镜像

```bash
npm install -g cnpm --registry=https://registry.npmmirror.com
```
```bash
cnpm i yarn -g
yarn config set registry https://registry.npmmirror.com
```
```bash
cnpm i pnpm -g
//查看源
pnpm config get registry
//切换淘宝源
pnpm config set registry https://registry.npmmirror.com
```