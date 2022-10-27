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
    console.log(result)
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
