export const MouseOver = (e: MouseEvent) => {
    console.log(e);
}

export const getPathByKey = (cueKey: string, data: any) => {
    let result: any [] = [];
    let traverse = (curKey: string, path: any [], data: any) => {
        if (data.length === 0) {
            return;
        }
        for (let item of data) {
            path.push(item);
            if (item.id === curKey) {
                result = JSON.parse(JSON.stringify(path));
                return;
            }
            const children = Array.isArray(item.children) ? item.children : [];
            traverse(curKey, path, children)
            path.pop()
        }
    }
    traverse(cueKey, [], data);
    return result;
}

export const searchTree = (tree: any, id: string) => {
    let res = ""
    let state = false

    function readTree(tree: any, id: string) {
        if (state) return
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].id == id) {
                state = true
                res = tree[i]
            } else {
                if (tree[i].children != null) {
                    readTree(tree[i].children, id)
                }
            }
        }
    }

    readTree(tree, id)
    return res
}

/**
 * 删除对象空属性值
 * @param obj
 */
export const removeProperty = (obj: any) => {
    Object.keys(obj).forEach(item => {
        if (obj[item] === '' || obj[item] === null || obj[item] === undefined || obj[item] === 'null') {
            delete obj[item]
        }
    })
    return obj
}

const pxContainer: string [] = ['margin', 'width', 'height', 'padding', 'fontSize', 'lineHeight','left','bottom'
    ,'top'
    ,'borderRadius'
    ,'borderTopLeftRadius'
    ,'borderTopRightRadius'
    ,'borderBottomLeftRadius'
    ,'borderBottomRightRadius'
]
/**
 * 是否添加 px
 * @param el
 */
export const isAddPx = (el: string): boolean => {

    return pxContainer.findIndex(e => {
        return el.startsWith(e)
    }) === -1
}
