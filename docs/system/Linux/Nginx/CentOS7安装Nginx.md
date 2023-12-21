# nginx

## 安装nginx
```bash
yum install nginx
//启动nginx
nginx
//使用命令nginx -t查找nginx配置文件
并使用vi命令修改该配置文件
nginx -t
vi /etc/nginx/nginx.conf
cd /etc/nginx  //进入nginx的安装目录
```

## 查看nginx是否正常运行

```bash
ps -ef |grep nginx
netstat -lntp  //查看所有被主机监听的端口
```

## 修改配置文件

```bash
nginx -t
vi /etc/nginx/nginx.conf
nginx -s reload
```