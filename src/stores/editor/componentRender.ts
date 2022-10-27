// 引入定义store函数
import {defineStore} from 'pinia'
import {Component} from "../types";
import {searchTree} from "../../utils/ToolUtils";


const componentSelected: any = {};

export const useEditorStore = defineStore('editor', {
    state: () => {
        return {
            // 当前选中的组件
            componentSelected: componentSelected,
            // 编辑器数据
            schema: [],
            // 窗口滑动高度
            scrollTop: 0,
            refreshBorder: 1
        }
    },
    actions: {
        /**
         * 更新当前选中的组件数据
         * @param data 当前选中组件
         */
        updateComponentSelected(data: Component) {
            this.componentSelected = data;
        },


        /**
         * 更新top位置
         * @param top
         */
        updateScrollTop(top: number) {
            this.scrollTop = top
        },
        updateRefreshBorder() {
            this.refreshBorder = -this.refreshBorder
        },
        updateComponentSelectedById(id: string) {
            this.componentSelected = searchTree(this.schema, id)
        }
    },
    getters: {}

})
