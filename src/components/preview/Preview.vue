<template>
  <preview/>
</template>

<script lang="ts" setup>
import {useEditorStore} from '../../stores/editor/componentRender'
import {storeToRefs} from 'pinia'
import {h, resolveComponent} from 'vue'
import {Component} from "../../stores/types";

const editorStore = useEditorStore();
const {schema} = storeToRefs(editorStore)
import {AnalyticSlots, AnalyticEvents} from '../../utils/RenderUtils'

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
          ...component.style,
        },
        // 事件
        ...AnalyticEvents(component.events)
      }, {...AnalyticSlots(component.slots)})
    } else {
      return h(resolveComponent(component.tag), {...component.props, style: component.style,
        ...AnalyticEvents(component.events)}, {
            default: () => {
              let children: any[] = [];
              if (component.children?.length > 0) {
                component.children?.forEach(e => {
                  children.push(pre(e))
                })
              }
              return children;
            },
            ...AnalyticSlots(component.slots)
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
