import jsIcon from "../../svg/jsIcon";
const jsPath = '/qianduan/css1/';
const icon = jsIcon()
const arr = [
    'CSS简介',
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
