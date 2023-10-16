import reactIcon from "../../svg/reactIcon";
const jsPath = '/qianduan/React/';
const icon = reactIcon()
const arr = [
    'React简介',
    'vite搭建React项目',
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