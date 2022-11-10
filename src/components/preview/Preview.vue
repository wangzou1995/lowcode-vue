<template>
  <preview/>
</template>

<script lang="ts" setup>
import {useEditorStore} from '../../stores/editor/componentRender'
import {storeToRefs} from 'pinia'
import {h, reactive, resolveComponent} from 'vue'
import {Component} from "../../stores/types";

const editorStore = useEditorStore();
const {schema} = storeToRefs(editorStore)
import {AnalyticSlots, AnalyticEvents, AnalyticStyles} from '../../utils/RenderUtils'

/**
 * 全局变量
 */
const data_context = reactive({})


const preview = () => {
  let result: any[] = []
  const pre = (component: Component) => {
    if (!component.isContainer) {
      return h(resolveComponent(component.tag), {
        id: component.id,
        // 属性
        ...component.props,
        style: {
          // 为了解决draggableList为空时不能拖拽的问题
          // ...component._editor_auxiliary_style,
          ...AnalyticStyles(component.style)
        },
        // 事件
        ...AnalyticEvents(component.events)
      }, {...AnalyticSlots(component)})
    } else {
      return h(resolveComponent(component.tag), {
            ...component.props, style: {...AnalyticStyles(component.style)},
            ...AnalyticEvents(component.events)
          }, {
            default: () => {
              let children: any[] = [];
              if (component.children && component.children?.length > 0) {
                component.children?.forEach(e => {
                  children.push(pre(e))
                })
              }
              return children;
            },
            ...AnalyticSlots(component)
          }
      )
    }
  }

  schema.value.forEach(e => result.push(pre(e)))
  return result
}
</script>

<style lang="scss" scoped>

</style>
