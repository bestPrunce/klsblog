const jsPath = '/qianduan/CSS/';
import { formatsideBar } from "../../utils/tools";
const arr = [
    {
        name: 'CSS简介',
    },
    {
        name: 'CSS变量',
    },
    {
        name: 'CSS小技巧',
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}