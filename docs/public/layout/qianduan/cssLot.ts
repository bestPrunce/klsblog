import cssIcon from "../../svg/cssIcon";
const jsPath = '/qianduan/Css/';
const icon = cssIcon()
const arr = [
    'Css简介',
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
