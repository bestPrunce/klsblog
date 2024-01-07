const jsPath = '/qianduan/React/';
import { formatsideBar } from "../../utils/tools";
const arr = [
    {
        name: 'React简介',
    },
    {
        name: 'vite搭建React项目',
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}