import nodeIcon from "../../svg/linuxIcon";
import folderIcon from "../../svg/folderIcon";
import nginxIcon from "../../svg/nginxIcon";
const jsPath = '/system/Linux/';
const icon = nodeIcon()
const nIcon = nginxIcon()
const folder = folderIcon()
const arr = [
    {
        name: 'Linux简介',
        icon: icon
    },
    {
        name: 'CentOS7安装nodejs',
        icon: icon
    },
    {
        name: 'CentOS7安装git',
        icon: icon
    },
    {
        name: 'pm2启动多个node项目',
        icon: icon
    },
    {
        name: 'CentOS7安装MySQL数据库',
        icon: icon
    },
    {
        name: 'Nginx',
        icon: nIcon,
        items: [{
            name: 'Nginx简介',
            icon: nIcon
        }, {
            name: 'CentOS7安装Nginx',
            icon: nIcon
        }]
    },
]
function formatsideBar(data: any[]) {
    return data.map((item) => {
        if(item.items) {
            return {
                text: `<div style="display: flex; align-items:center">
                            ${folder}
                            <div style="margin-left: 6px;">${item.name}</div>
                        </div>`,
                collapsed: true,
                items: formatsideBar(item.items)
            }
        } else {
            // link: `${jsPath}${item.name}/${v2}.md`,
            return {
                text: `<div style="display: flex; align-items:center">
                            ${item.icon}
                            <div style="margin-left: 6px;">${item.name}</div>
                        </div>`,
                link: `${jsPath}${encodeURIComponent(item.name)}.md`
            }
        }
    })
}
// const ret = arr.map((item) => {
//     if(typeof item === 'string') {
//         return {
//             text: `<div style="display: flex; align-items:center">
//                         ${icon}
//                         <div style="margin-left: 6px;">${item}</div>
//                     </div>`,
//             link: `${jsPath}${item}.md`
//         }
//     } else {
//         return {
//             text: `<div style="display: flex; align-items:center">
//                         ${folder}
//                         <div style="margin-left: 6px;">${item.name}</div>
//                     </div>`,
//             collapsed: true,
//             items: item.items.map((v2) => {
//                 return {
//                     text: `<div style="display: flex; align-items:center">
//                                 ${nIcon}
//                                 <div style="margin-left: 6px;">${v2}</div>
//                             </div>`,
//                     link: `${jsPath}${item.name}/${v2}.md`,
//                 }
//             })
//         }
//     }
// })
export default {
    [jsPath]: formatsideBar(arr),
}
