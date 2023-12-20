import pythonIcon from "../../svg/pythonIcon";
const jsPath = '/houduan/Python/';
import { formatsideBar } from "../../utils/tools";
const icon = pythonIcon()
const arr = [
    {
        name: 'python简介',
        icon: icon
    },
]
export default {
    [jsPath]: formatsideBar(arr, jsPath),
}
