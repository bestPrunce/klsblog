import { formatsideBar } from "../../utils/tools";
const jsPath = '/system/Linux/';
const arr = [
    {
        name: 'Linux简介',
    },
    {
        name: 'CentOS7安装nodejs',
    },
    {
        name: 'CentOS7安装git',
    },
    {
        name: 'pm2启动多个node项目',
    },
    {
        name: 'CentOS7安装MySQL数据库',
    },
    {
        name: 'Nginx',
        items: [{
            name: 'Nginx简介',
        }, {
            name: 'CentOS7安装Nginx',
        }]
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}
