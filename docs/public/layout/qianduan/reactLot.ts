import reactIcon from "../../svg/reactIcon";
const jsPath = '/qianduan/React/';
import { formatsideBar } from "../../utils/tools";
const icon = reactIcon()
const arr = [
    {
        name: 'React简介',
        icon: icon
    },
    {
        name: 'vite搭建React项目',
        icon: icon
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}