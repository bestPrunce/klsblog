export function formatsideBar(data: any[], path) {
    return data.map((item) => {
        if(item.items) {
            const childPath = `${path}/${item.name}/`
            return {
                text: `${item.name}`,
                collapsed: true,
                items: formatsideBar(item.items, childPath)
            }
        } else {
            return {
                text: `${item.name}`,
                link: `${path}${encodeURIComponent(item.name)}.md`
            }
        }
    })
}