const jsPath = '/houduan/Node/';
import { formatsideBar } from "../../utils/tools";
const arr = [
    {
        name: 'NodeJs简介',
    },
    {
        name: '常用的内置模块',
    },
    {
        name: 'Express模块',
    },
    {
        name: 'Web开发模式与身份认证',
    },
    {
        name: 'NodeJs上传图片到服务器',
    },
    {
        name: 'NodeJs操作MySQL数据库',
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}
