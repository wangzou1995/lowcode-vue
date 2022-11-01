<template>
  <div class="element-config">
    <a-form :model="componentSelected" label-align="left" size="small"
            :label-col-props="{span: 6, offset:0}" :wrapper-col-props="{span: 18, offset:0}">
      <dy-element/>
    </a-form>

  </div>

</template>

<script setup lang="ts">
import {h, resolveComponent, watch} from 'vue'
import arcoConfig from '../../../stores/material/arco-config.json'
import {useEditorStore} from '../../../stores/editor/componentRender'
import {storeToRefs} from 'pinia'
import {Component} from "../../../stores/types";

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
        h(resolveComponent('a-form-item'), {label: config.name, required: config.required}, () => h(
            resolveComponent(config.tag),
            {
              ...config.props, "modelValue": config.model === 'number' ? Number(props[prop]) : props[prop],
              'onUpdate:modelValue': (value) => {
                editorStore.updateComponentPropsByElement(prop, value, config.slot)
                editorStore.updateRefreshBorder()
              },
            }))
    )
  }
  return nodes
}
watch(componentSelected, (newValue: Component, oldValue: Component) => {
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
