import folderIcon from "../../svg/folderIcon";
import jsIcon from "../../svg/jsIcon";
const jsPath = '/qianduan/JavaScript/';
const icon = jsIcon()
const folder = folderIcon()
const arr = [
    'JavaScript简介',
    'JS实现复制文本内容',
    'JS扁平数据结构转Tree',
    'JS必备小技巧',
    'MutationObserver',
    {
        name: 'MutationObserver',
        items: ['MutationObserver简介', '构造器', '实例方法']
    },
]
const ret = arr.map((item) => {
    if(typeof item === 'string') {
        return {
            text: `<div style="display: flex; align-items:center">
                        ${icon}
                        <div style="margin-left: 6px;">${item}</div>
                    </div>`,
            link: `${jsPath}${item}.md`
        }
    } else {
        return {
            text: `<div style="display: flex; align-items:center">
                        ${folder}
                        <div style="margin-left: 6px;">${item.name}</div>
                    </div>`,
            collapsed: true,
            items: item.items.map((v2) => {
                return {
                    text: `<div style="display: flex; align-items:center">
                                ${icon}
                                <div style="margin-left: 6px;">${v2}</div>
                            </div>`,
                    link: `${jsPath}${item.name}/${v2}.md`,
                }
            })
        }
    }
})
export default {
    [jsPath]: ret,
}
