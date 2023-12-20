import nodeIcon from "../../svg/linuxIcon";
import nginxIcon from "../../svg/nginxIcon";
import { formatsideBar } from "../../utils/tools";
const jsPath = '/system/Linux/';
const icon = nodeIcon()
const nIcon = nginxIcon()
const arr = [
    {
        name: 'Linux简介',
        icon: icon
    },
    {
        name: 'CentOS7安装nodejs',
        icon: icon
    },
    {
        name: 'CentOS7安装git',
        icon: icon
    },
    {
        name: 'pm2启动多个node项目',
        icon: icon
    },
    {
        name: 'CentOS7安装MySQL数据库',
        icon: icon
    },
    {
        name: 'Nginx',
        icon: nIcon,
        items: [{
            name: 'Nginx简介',
            icon: nIcon
        }, {
            name: 'CentOS7安装Nginx',
            icon: nIcon
        }]
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}
