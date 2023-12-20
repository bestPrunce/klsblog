import regexpIcon from "../../svg/regexpIcon";
const jsPath = '/qianduan/Regexp/';
import { formatsideBar } from "../../utils/tools";
const icon = regexpIcon()
const arr = [
    {
        name: '正则简介',
        icon: icon
    },
    {
        name: '正则的两种创建方式',
        icon: icon
    },
    {
        name: 'test(验证)和exec(捕获)',
        icon: icon
    },
    {
        name: '元字符',
        icon: icon
    },
    {
        name: '正则的贪婪性和非贪婪性',
        icon: icon
    },
    {
        name: '字符串和正则相关的方法',
        icon: icon
    },
    {
        name: '正则表达式的标识符',
        icon: icon
    },
    {
        name: '正向预查和反向预查',
        icon: icon
    },
    {
        name: '重复出现',
        icon: icon
    },
    {
        name: '正则补充',
        icon: icon
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}