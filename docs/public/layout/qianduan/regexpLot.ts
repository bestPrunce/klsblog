const jsPath = '/qianduan/Regexp/';
import { formatsideBar } from "../../utils/tools";
const arr = [
    {
        name: '正则简介',
    },
    {
        name: '正则的两种创建方式',
    },
    {
        name: 'test(验证)和exec(捕获)',
    },
    {
        name: '元字符',
    },
    {
        name: '正则的贪婪性和非贪婪性',
    },
    {
        name: '字符串和正则相关的方法',
    },
    {
        name: '正则表达式的标识符',
    },
    {
        name: '正向预查和反向预查',
    },
    {
        name: '重复出现',
    },
    {
        name: '正则补充',
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}