import nodeIcon from "../../svg/linuxIcon";
const jsPath = '/system/Linux/';
const icon = nodeIcon()
const arr = [
    'Linux简介',
    'CentOS7安装MySQL数据库',
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
