const jsPath = '/qianduan/Vue/';
import { formatsideBar } from "../../utils/tools";
const arr = [
    {
        name: 'Vue简介',
    },
    {
        name: 'Vue3项目搭建',
    },
    {
        name: 'Vue二进制流文件下载Excel',
    },
    {
        name: 'Vue全局路由设置',
    },
    {
        name: 'Vue中优雅的使用Echarts',
    },
    {
        name: 'ElementPlus修改主题色',
    }
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}