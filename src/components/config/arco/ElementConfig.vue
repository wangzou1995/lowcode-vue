<template>
  <div class="element-config">
    <a-form :model="componentSelected" label-align="left" size="small"
            :label-col-props="{span: 6, offset:0}" :wrapper-col-props="{span: 18, offset:0}">
      <dy-element/>
    </a-form>

  </div>

</template>

<script setup lang="ts">
import {h, resolveComponent, watch, nextTick} from 'vue'
import arcoConfig from '../../../stores/material/arco-config.json'
import {useEditorStore} from '../../../stores/editor/componentRender'
import {storeToRefs} from 'pinia'
import {Component} from "../../../stores/types";
import {FormItem} from '@arco-design/web-vue'

const editorStore = useEditorStore();
const {componentSelected} = storeToRefs(editorStore)

const dyElement = () => {
  let nodes: [] = []
  let component: Component = componentSelected.value
  let props = component.props
  let element = arcoConfig[component.tag]
  for (let prop in element) {
    let config = element[prop]
    nodes.push(
        // 不能直接使用resolveComponent(a-form-item)
        h(FormItem, {label: config.name, required: config.required}, () => h(
            resolveComponent(config.tag),
            {
              ...config.props,
              "modelValue": config.slot ? getSlotValue(prop, component.slots) : config.model === 'number' ? Number(props[prop]) : props[prop],
              'onUpdate:modelValue': (value) => {
                editorStore.updateComponentPropsByElement(prop, value, config.slot, config.slotConfig)
                setTimeout(()=> {
                  editorStore.updateRefreshBorder()
                },200)

              },
            }))
    )
  }
  return nodes
}
const getSlotValue = (slotName: string, slots: any []) => {
  if (slots) {
    let index = slots.findIndex(e => {
      return e.name === slotName
    });
    if (index >= 0) {
     return slots[index].value;
    }
  }
  return null
}
watch(componentSelected, async (newValue: Component, oldValue: Component) => {
  if (newValue.id != oldValue.id) {
    dyElement()
  }
})

</script>

<style scoped lang="scss">
.element-config {
  margin-left: 10px;
  margin-right: 10px;
  box-sizing: border-box;
}

:deep(.arco-form-item-label-col) {
  padding-right: 0;
}

:deep(.arco-form-item) {
  margin-bottom: 10px;
}
</style>
