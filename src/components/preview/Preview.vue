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
import {AnalyticSlots} from '../../utils/RenderUtils'

const preview = () => {
  let result: any[] = []
  const pre = (component: Component) => {
    return h(resolveComponent(component.tag), {...component.props,style:component.style}, {
          default: () => {
            let children: any[] = [];
            if (component.isContainer && component.children?.length > 0) {
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
  schema.value.forEach(e => result.push(pre(e)))
  return result
}
</script>

<style lang="scss" scoped>

</style>
