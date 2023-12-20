export function formatsideBar(data: any[], path) {
    return data.map((item) => {
        if(item.items) {
            const childPath = `${path}/${item.name}/`
            return {
                text: `<div style="display: flex; align-items:center">
                            ${item.icon}
                            <div style="margin-left: 6px;">${item.name}</div>
                        </div>`,
                collapsed: true,
                items: formatsideBar(item.items, childPath)
            }
        } else {
            return {
                text: `<div style="display: flex; align-items:center">
                            ${item.icon}
                            <div style="margin-left: 6px;">${item.name}</div>
                        </div>`,
                link: `${path}${encodeURIComponent(item.name)}.md`
            }
        }
    })
}