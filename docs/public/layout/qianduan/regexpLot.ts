import regexpIcon from "../../svg/regexpIcon";
const jsPath = '/qianduan/Regexp/';
const icon = regexpIcon()
const arr = [
    '正则简介',
    '正则的两种创建方式',
    'test(验证)和exec(捕获)',
    '元字符',
    '正则的贪婪性和非贪婪性',
    '字符串和正则相关的方法',
    '正则表达式的标识符',
    '正向预查和反向预查',
    '重复出现',
    '正则补充',
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