import nodeIcon from "../../svg/linuxIcon";
import folderIcon from "../../svg/folderIcon";
import nginxIcon from "../../svg/nginxIcon";
const jsPath = '/system/Linux/';
const icon = nodeIcon()
const nIcon = nginxIcon()
const folder = folderIcon()
const arr = [
    'Linux简介',
    'CentOS7安装nodejs',
    'CentOS7安装git',
    'pm2启动多个node项目',
    'CentOS7安装MySQL数据库',
    {
        name: 'Nginx',
        icon: nIcon,
        items: ['Nginx简介', 'CentOS7安装Nginx']
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
                                ${nIcon}
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
