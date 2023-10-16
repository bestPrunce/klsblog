import jsIcon from "../../svg/jsIcon";
const jsPath = '/qianduan/JavaScript/';
const icon = jsIcon()
const arr = [
    'JavaScript简介',
    '闭包',
    'promise'
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