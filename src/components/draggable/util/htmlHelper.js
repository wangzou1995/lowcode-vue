function removeNode(node) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}

function insertNodeAt(fatherNode, node, position) {
  const refNode =
    position === 0
      ? fatherNode.children[0]
      : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}

/**
 * 通过class获取dom元素
 * @param dom
 * @param tagClass
 */
const getFirstElementByClass = (dom, tagClass) => {
  let elements = dom.getElementsByClassName(tagClass);
  if (elements) {
    return elements[0];
  } else {
    throw new Error('当前tagClass 未查询到dom元素');
  }
}
export { insertNodeAt, removeNode ,getFirstElementByClass};


