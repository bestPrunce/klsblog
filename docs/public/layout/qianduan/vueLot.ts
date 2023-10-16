import vueIcon from "../../svg/vueIcon";
const jsPath = '/qianduan/Vue/';
const icon = vueIcon()
const arr = [
    'Vue简介',
    'Vue3项目搭建',
    'Vue二进制流文件下载Excel'
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