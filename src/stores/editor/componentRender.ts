// 引入定义store函数
import {defineStore} from 'pinia'
import {Component} from "../types";
import {removeProperty, searchTree} from "../../utils/ToolUtils";
import {nanoid} from "nanoid";
import {nextTick} from "vue";


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
            refreshBorder: 1,
            elementPath: []
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
         * 更新组件属性
         * @param element 属性名称
         * @param value 属性值
         * @param isSlot 是否slot
         * @param slotConfig slot配置
         */
        updateComponentPropsByElement(element: string, value: any, isSlot: boolean | undefined, slotConfig: any) {
            if (isSlot) {
                let slots = this.componentSelected.slots
                if (slots) {
                    let ok = false;
                    for (let i = 0; i < slots.length; i++) {
                        let slot = slots[i]
                        if (slot.name === element) {
                            if (value) {
                                slot.value = value
                            } else {
                                slots.splice(i, 1)
                            }
                            ok = true
                            return
                        }
                    }
                    if (!ok) {

                        slots.push({
                            ...slotConfig,
                            "value": value,
                        })
                    }
                }
            } else {
                this.componentSelected.props[element] = value
            }

        },


        /**
         * 更新top位置
         * @param top 滑动位置
         */
        updateScrollTop(top: number) {
            this.scrollTop = top
        },
        /**
         * 更新边框位置
         */
        updateRefreshBorder() {
            this.refreshBorder = -this.refreshBorder
        },
        /**
         * 更新当前选择的组件
         * @param id
         */
        updateComponentSelectedById(id: string) {
            this.componentSelected = searchTree(this.schema, id)
        },
        /**
         * 通过id删除组件
         * @param id
         */
        deleteComponentById(id: string) {

            const del = (data: Component [], id: string, parentCallback: Function) => {
                for (let i = 0; i < data.length; i++) {
                    let component = data[i];
                    if (component.id === id) {
                        if (i > 0) {
                            this.componentSelected = data[i - 1]
                        } else {
                            this.componentSelected = parentCallback()
                        }
                        data.splice(i, 1)

                        return
                    }
                    if (component.children) {
                        del(component.children, id, () => {
                            return component
                        })
                    }
                }
            }
            del(this.schema, id, () => {
                return {id: -1}
            })
            // 更新边框
            this.updateRefreshBorder();
        },
        /**
         * 添加标签页
         */
        addTabs() {
            let tabPane = {
                "id": `component_${nanoid(6)}`,
                "name": "TabPane",
                "tag": "a-tab-pane",
                "code": "aTabPane",
                "isContainer": true,
                "props": {
                    key: this.componentSelected.children.length,
                    "title": "标签"
                },
                "children": [],
                "_editor_auxiliary_style": {
                    "box-sizing": "border-box",
                    "minHeight": "30px"
                },
                "_tagDragClass": "arco-tabs-pane"

            }

            this.componentSelected.children.push(tabPane)
            this.updateRefreshBorder()
        },
        /**
         * 添加列
         */
        addCol() {
            let col = {
                "id": `component_${nanoid(6)}`,
                "name": "列容器",
                "tag": "a-col",
                "code": "aCol",
                "isContainer": true,
                "props": {
                    "span": 8,
                    "offset": null,
                    "order": null,
                    "flex": "",
                    "wrap": true
                },
                "style": {},
                "_editor_auxiliary_style": {
                    "minHeight": "30px",
                    "box-sizing": "border-box"
                },
                "children": []
            }

            this.componentSelected.children.push(col)
            this.updateRefreshBorder()
        },
        /**
         * 更新Css
         * @param css
         */
        updateCss(css: any) {
            this.componentSelected.style = removeProperty(JSON.parse(JSON.stringify(css)))
        }
    },
    getters: {}

})
