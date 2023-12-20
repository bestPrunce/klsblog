import nodeIcon from "../../svg/nodeIcon";
const jsPath = '/houduan/Node/';
import { formatsideBar } from "../../utils/tools";
const icon = nodeIcon()
const arr = [
    {
        name: 'NodeJs简介',
        icon: icon
    },
    {
        name: '常用的内置模块',
        icon: icon
    },
    {
        name: 'Express模块',
        icon: icon
    },
    {
        name: 'Web开发模式与身份认证',
        icon: icon
    },
    {
        name: 'NodeJs上传图片到服务器',
        icon: icon
    },
    {
        name: 'NodeJs操作MySQL数据库',
        icon: icon
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}
