# CentOS7下清除挖矿病毒
登录用户系统，显示系统被爆破了33万次了，结果用户的服务器密码改的很简单，极大可能是被爆破成功了。

执行top命令，显示 kswapd0 的CPU占用异常。基本100%占用。记下该进程ID 5081

执行查找命令 find / -name kswapd0

显示查找结果：

/proc/3316/.X2c4-unix/.rsync/a/kswapd0
/root/.configrc5/a/kswapd0
/tmp/.X2c4-unix/.rsync/a/kswapd0

用 rm -rf 命令逐条删除。

杀掉进行 kill -9 5081

查看服务器的任务计划 crontab -e

回显：

5 6 * * 0 /root/.configrc5/a/upd>/dev/null 2>&1
@reboot /root/.configrc5/a/upd>/dev/null 2>&1
5 8 * * 0 /root/.configrc5/b/sync>/dev/null 2>&1
@reboot /root/.configrc5/b/sync>/dev/null 2>&1
0 0 */3 * * /tmp/.X2c4-unix/.rsync/c/aptitude>/dev/null 2>&1

这些都是和病毒后台下载运行有关的，按 insert 键，进入编辑模式，全部清空

再按":“后，出现提示符”:" ,输入wq 然后回车保存。

最后修改服务器密码。
附上另外一个很常见的挖矿木马

![在这里插入图片描述](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/direct/c7b9d8b27a784e5b9aca35d32f99d515.png)
![在这里插入图片描述](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/direct/5234e995ac8b44898926424e805f8e13.png)