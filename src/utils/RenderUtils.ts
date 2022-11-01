import {h, RendererElement, RendererNode, resolveComponent, VNode} from 'vue'
import {Component, Slot} from "../stores/types";
import draggableComponent from "../components/draggable/vuedraggable";
import ComponentRender from "../components/editor/ComponentRender.vue";

import {useEditorStore} from "../stores/editor/componentRender";
import {storeToRefs} from 'pinia'

const editor = useEditorStore()
/**
 * 渲染
 * @param component 组件数据
 */
export const render = (component: Component) => {
    // data,methods,props,emits
    console.log('开始渲染')
    return !component.isContainer ? RenderComponent(component) : RenderList(component)
}

/**
 * 渲染时解析组件属性
 * @param props 组件属性
 * @param events 组件事件
 * @constructor
 */
const AnalyticProps = (props: { [key: string]: any }, events: { [key: string]: any }): { [key: string]: any } => {
    return {}
}
/**
 * 渲染时解析插槽属性
 * @constructor
 * @param component
 */
export const AnalyticSlots = (component: Component) => {
    let slotsComponent: any = {};
    let slots = component.slots
    if (slots) {
        for (let i = 0; i < slots.length; i++) {
            let slot = slots[i]
            if ('component' === slot.type) {
                // @ts-ignore
                slotsComponent[slot.name] = () => h(resolveComponent(slot.value, true), slot.props, null)
            } else {
                slotsComponent[slot.name] = () => slot.value
            }
        }
    }
    if (component.tag === 'a-tabs') {
        slotsComponent.default = () => {
            let nodes: VNode<RendererNode, RendererElement, { [key: string]: any; }>[] = []
            if (component.children && component.children?.length > 0) {
                component.children.forEach(e => {
                    nodes.push(h(ComponentRender, {component: e}))
                })

            }
            return nodes
        }
    }
    return slotsComponent;
}

/**
 * 非容器组件渲染
 * @param component
 * @constructor
 */
function RenderComponent(component: Component) {

    return h(resolveComponent(component.tag), {
        id: component.id,
        // 属性
        ...component.props,
        style: {
            // 为了解决draggableList为空时不能拖拽的问题
            // ...component._editor_auxiliary_style,
            ...component.style,
        },
        // 事件
        ...AnalyticEvents(component.events)
    }, {
        ...AnalyticSlots(component),
    });
}

export const AnalyticEvents = (events: any) => {
    let methods: any = {}
    for (let event in events) {

        let script = events[event]

        methods[event] = new Function(script.args, script.script)
    }

    return methods
}

/**
 * 解析容器内组件
 * @param component 容器组件
 * @constructor
 */
const RenderList = (component: Component) => {
    // 最外层包裹拖拽组件
    return h(draggableComponent, {
        id: component.id,
        list: component.children,
        tag: component.tag,
        tagDragClass: component._tagDragClass,
        componentData: {
            ...component.props, style: {
                // 为了解决draggableList为空时不能拖拽的问题
                ...component._editor_auxiliary_style,
                ...component.style,
            },
        },
        itemKey: 'id',
        group: {
            name: 'component',
        },
        class: 'item',
        ghostClass: 'ghostClass',
        animation: "300",
        sort: true,
        draggable: '.item',
        direction: 'horizontal',
        onclick: (evt: any) => {
            editor.updateComponentSelected(component)
            editor.updateRefreshBorder()
            evt.stopPropagation()
        },
        onChange: (evt: any) => {
            if (evt.added) {
                editor.updateComponentSelected(evt.added.element)
            }
            if (!evt.removed) {
                editor.updateRefreshBorder()
            }
        },
        onStart: (evt: any) => {
            console.log('onStart')
            console.log(evt)
        }
    }, {
        // 解决容器内不能进行拖拽的问题
        item: ({element, index}: any) => {
            if (element.isContainer) {
                return RenderList(element)
            } else {
                return h("div", {
                    id: element.id,
                    class: 'item',
                    style: {width: '100%', ...element._editor_auxiliary_style,},
                    onclick: (evt: any) => {
                        editor.updateComponentSelected(element)
                        editor.updateRefreshBorder()
                        evt.stopPropagation()
                    }
                }, h(ComponentRender, {component: element}, () => null))
            }
        },
        default: () => {

        }
    })

}

/**
 * 获取容器最小高度
 * @param component
 */
function getListMinHeight(component: Component) {
    return component.children && component.children.length > 0 ? {} :
        {'min-height': component._drag_minHeight || '100px'}

}
