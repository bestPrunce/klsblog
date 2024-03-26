const jsPath = '/qianduan/JavaScript/';
import { formatsideBar } from "../../utils/tools";
const arr = [
    {
        name: 'JavaScript简介',
    },
    {
        name: 'JS实现复制文本内容',
    },
    {
        name: 'JS扁平数据结构转Tree',
    },
    {
        name: 'JS必备小技巧',
    },
    {
        name: '如何解决图片防盗链',
    },
    {
        name: 'js改变页面上输入框的值',
    },
    {
        name: 'MutationObserver',
        items: [
            {
                name: 'MutationObserver简介',
            },
            {
                name: '构造器',
            },
            {
                name: '实例方法',
            },]
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}
