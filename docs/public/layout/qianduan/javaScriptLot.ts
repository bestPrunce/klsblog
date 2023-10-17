import jsIcon from "../../svg/jsIcon";
const jsPath = '/qianduan/JavaScript/';
const icon = jsIcon()
const arr = [
    'JavaScript简介',
    'JS实现复制文本内容',
    'JS扁平数据结构转Tree',
    'JS必备小技巧',
]
const ret = arr.map((item) => {
    return {
        text: `<div style="display: flex; align-items:center">
                    ${icon}
                    <div style="margin-left: 6px;">${item}</div>
                </div>`,
        link: `${jsPath}${item}.md`
    }
})
export default {
    [jsPath]: ret,
}
