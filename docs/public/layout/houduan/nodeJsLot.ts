import nodeIcon from "../../svg/nodeIcon";
const jsPath = '/houduan/Node/';
const icon = nodeIcon()
const arr = [
    'NodeJs简介',
    '常用的内置模块',
    'Express模块',
    'Web开发模式与身份认证',
    'NodeJs上传图片到服务器',
    'NodeJs操作MySQL数据库',
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
