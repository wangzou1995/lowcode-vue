import {Component} from "../stores/types";
import {h} from 'vue'

/**
 * 预览函数
 * @param schema
 */
export const  previewIE = (schema: Component []) => {
    return {
        render: () => {
            return h('div', null, 'ceshi1')
        },
        data: {
            test: 1
        }
    }

}
