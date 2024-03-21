# CentOS7安装MySQL数据库

## 1、检查内存
5.6及以上版本的MySQL要求Linux系统虚拟内存不能小于1G，否则MySQL可能无法运行。

## 2、卸载mariadb
``` Shell
[root@localhost ~]# rpm -qa | grep mariadb
mariadb-libs-5.5.60-1.el7_5.x86_64
[root@localhost ~]# rpm -e --nodeps mariadb-libs-5.5.60-1.el7_5.x86_64
[root@localhost ~]#
```

## 3、下载mysql
下载地址：https://mirrors.aliyun.com/mysql/MySQL-8.0,

[点击下载 mysql-8.0.28-el7-x86_64.tar.gz](https://mirrors.aliyun.com/mysql/MySQL-8.0/mysql-8.0.28-el7-x86_64.tar.gz?spm=a2c6h.25603864.0.0.76a070b2JJfVQh)

## 4、上传文件到服务器
使用 `rz` 命令通过终端会话接收文件。
安装rz
```bash
sudo yum install lrzsz
```

## 5、将MySQL压缩文件解压至/usr/local目录
``` Shell
[root@localhost ~]# tar -zxvf /opt/mysql-8.0.28-el7-x86_64.tar.gz -C /usr/local
```

## 6、将MySQL根目录重命名为mysql
注意：必须重命名为mysql，否则无法启动
``` Shell
[root@localhost ~]# mv /usr/local/mysql-8.0.28-el7-x86_64 /usr/local/mysql
```

## 7、删除压缩文件

``` Shell
[root@localhost ~]# rm -f /opt/mysql-8.0.28-el7-x86_64.tar.gz
```

## 8、/usr/local/mysql根目录下创建data文件夹
``` Shell
[root@localhost ~]# mkdir /usr/local/mysql/data
```

## 9、配置环境变量
a、编辑/etc/profile文件，内容如下：
``` Shell
export PATH=/usr/local/mysql/bin:$PATH
```
b、重载/etc/profile文件：source /etc/profile

c、查看PATH值：echo $PATH

## 10、修改配置
a、查找mysql配置路径
``` Shell
[root@localhost ~]# mysql --help | grep 'my.cnf'
                      order of preference, my.cnf, $MYSQL_TCP_PORT,
/etc/my.cnf /etc/mysql/my.cnf /usr/local/mysql/etc/my.cnf ~/.my.cnf
[root@localhost ~]#
```
b、执行vi /etc/my.cnf

c、点击I键，清空原有内容后,复制并粘贴如下配置：
``` Shell
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8

[mysqld]
#设置端口
port=3306
socket=/tmp/mysql.sock
#设置mysql根目录
basedir=/usr/local/mysql
#设置数据库的数据存放目录
datadir=/usr/local/mysql/data
#设置最大连接数
max_connections=200
#设置mysql服务端字符集，默认为latin1
character-set-server=UTF8MB4
#设置默认存储引擎
default-storage-engine=INNODB
#设置密码永不过期
default_password_lifetime=0
#设置 server接受的数据包大小
max_allowed_packet=16M
```

## 11、用户与用户组
a、添加 mysql 组
``` Shell
[root@localhost ~]# groupadd mysql
```
b、添加 mysql 用户
``` Shell
[root@localhost ~]# useradd -r -g mysql mysql
```
c、变更用户和用户组
``` Shell
[root@localhost ~]# chown -R mysql:mysql /usr/local/mysql
```

## 12、初始化
``` Shell
[root@localhost ~]# mysqld --initialize --user=mysql
2022-11-17T03:34:13.745049Z 0 [System] [MY-013169] [Server] /usr/local/mysql/bin/mysqld (mysqld 8.0.28) initializing of server in progress as process 20052
2022-11-17T03:34:13.868756Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2022-11-17T03:34:15.109952Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2022-11-17T03:34:16.778334Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: pH6T0ltJ6y,N
[root@localhost ~]#
```
说明：pH6T0ltJ6y,N 为临时密码，注意看上方输出日志第四行最后边哦

注意⚠️：如果出现以下错误
`mysqld: error while loading shared libraries: libaio.so.1: cannot open shared object file: No such file or directory`
执行
``` Shell
yum install -y libaio.so.1
```
再安装
``` Shell
yum install -y libaio
```
即可解决

## 13、其它

``` Shell
# 安装SSL
[root@localhost ~]# mysql_ssl_rsa_setup --datadir=/usr/local/mysql/data
# 添加权限
[root@localhost ~]# chmod -R a+r /usr/local/mysql/data/server-key.pem
```

## 14、配置mysql
**1、开机启动**

a、复制启动脚本到资源目录
``` Shell
[root@localhost ~]# cp /usr/local/mysql/support-files/mysql.server /etc/rc.d/init.d/mysqld
```

b、mysqld文件添加执行权限
``` Shell
[root@localhost ~]# chmod +x /etc/rc.d/init.d/mysqld
```

c、mysqld服务添加至系统服务
``` Shell
[root@localhost ~]# chkconfig --add mysqld
```

d、查询mysqld服务
``` Shell
[root@localhost ~]# chkconfig --list mysqld

注：该输出结果只显示 SysV 服务，并不包含
原生 systemd 服务。SysV 配置数据
可能被原生 systemd 配置覆盖。

      要列出 systemd 服务，请执行 'systemctl list-unit-files'。
      查看在具体 target 启用的服务请执行
      'systemctl list-dependencies [target]'。

mysqld          0:关    1:关    2:开    3:开    4:开    5:开    6:关
[root@localhost ~]#
```

e、启动 mysqld服务

``` Shell
[root@localhost ~]# service mysqld start
```

**2、开放端口**

a、添加端口
``` Shell
[root@localhost ~]# firewall-cmd --zone=public --add-port=3306/tcp --permanent
```
注意⚠️：如果执行开放端口失败报错：`FirewallD is not running`，则执行下列代码
``` Shell
systemctl start firewalld.service
```

b、重新加载
``` Shell
[root@localhost ~]# firewall-cmd --reload
```

**3、修改密码**

初次登录MySQL数据库需要重置密码才能继续后面的数据库操作，步骤如下：
``` Shell
[root@localhost ~]# mysql -uroot -p
Enter password: 输入临时密码
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.28

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> alter user 'root'@'localhost' identified by '123456';
Query OK, 0 rows affected (0.01 sec)

mysql> quit
Bye
[root@localhost ~]#
```

**4、允许远程连接**

MySQL数据库默认不允许远程连接，可通过如下步骤允许远程连接：

``` Shell
[root@localhost ~]# mysql -uroot -p
Enter password: 输入密码
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.0.28 MySQL Community Server - GPL

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> use mysql;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> update user set host = '%' where user = 'root';
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> quit
Bye
[root@localhost ~]#
```