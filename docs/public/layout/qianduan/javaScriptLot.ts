import folderIcon from "../../svg/folderIcon";
import jsIcon from "../../svg/jsIcon";
const jsPath = '/qianduan/JavaScript/';
import { formatsideBar } from "../../utils/tools";
const icon = jsIcon()
const folder = folderIcon()
const arr = [
    {
        name: 'JavaScript简介',
        icon: icon
    },
    {
        name: 'JS实现复制文本内容',
        icon: icon
    },
    {
        name: 'JS扁平数据结构转Tree',
        icon: icon
    },
    {
        name: 'JS必备小技巧',
        icon: icon
    },
    {
        name: 'MutationObserver',
        icon: folder,
        items: [
            {
                name: 'MutationObserver简介',
                icon: icon
            },
            {
                name: '构造器',
                icon: icon
            },
            {
                name: '实例方法',
                icon: icon
            },]
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}
