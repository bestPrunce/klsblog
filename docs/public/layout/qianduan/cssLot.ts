import cssIcon from "../../svg/cssIcon";
const jsPath = '/qianduan/CSS/';
import { formatsideBar } from "../../utils/tools";
const icon = cssIcon()
const arr = [
    {
        name: 'CSS简介',
        icon: icon
    },
    {
        name: 'CSS变量',
        icon: icon
    },
    {
        name: 'CSS小技巧',
        icon: icon
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}