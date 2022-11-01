<template>

    <componentRender  />

</template>

<script lang="ts" setup>
import {Component} from "../../stores/types";
import {render} from "../../utils/RenderUtils";
import {storeToRefs} from 'pinia'
import {useEditorStore} from "../../stores/editor/componentRender"

const editorStore = useEditorStore();
const {componentSelected} = storeToRefs(editorStore)

const props = defineProps<{
  component: Component
}>()

const {component} = props
/**
 * 组件渲染
 */
const componentRender = () => {
  return render(component);
}
/**
 * 组件点击事件
 */
const onClick = () => {
  editorStore.updateComponentSelected(component)
}
</script>

<style scoped lang="scss">

.component {
  box-sizing: border-box;
  border: 1px silver dashed;
  padding: 5px;
}

.component-active {
  box-sizing: border-box;
  border: 2px blue solid;
  padding: 5px;
}

.component-toolbar-list {
  display: none;

}

.component-toolbar-list-active {
  position: absolute;
  box-sizing: border-box;
  text-align: right;
  margin-top: -28px;
  background-color: blue;
  width: 150px;
  color: white;
}

.component-title-active {
  position: absolute;
  box-sizing: border-box;
  text-align: right;
  margin-bottom: -40px;
  background-color: blue;
  width: 150px;
  color: white;
  z-index: 1000;
}

.component-title {
  display: none;


}
.chosenClass{
  border: 1px  blue solid;
  background-color: black !important;
}

</style>
