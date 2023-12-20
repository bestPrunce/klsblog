import vueIcon from "../../svg/vueIcon";
const jsPath = '/qianduan/Vue/';
import { formatsideBar } from "../../utils/tools";
const icon = vueIcon()
const arr = [
    {
        name: 'Vue简介',
        icon: icon
    },
    {
        name: 'Vue3项目搭建',
        icon: icon
    },
    {
        name: 'Vue二进制流文件下载Excel',
        icon: icon
    },
    {
        name: 'Vue全局路由设置',
        icon: icon
    },
    {
        name: 'Vue中优雅的使用Echarts',
        icon: icon
    },
    {
        name: 'ElementPlus修改主题色',
        icon: icon
    }
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}