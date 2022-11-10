<template>

  <componentRender/>

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

.chosenClass {
  border: 1px blue solid;
  background-color: black !important;
}

// 拖拽过程中的样式
.ghostClass {
  display: block;
  cursor: move !important;
  background: #F56C6C;
  border: 1px solid #F56C6C;
  outline-width: 0;
  height: 5px;
  box-sizing: border-box;
  font-size: 0;
  content: '';
  overflow: hidden;
  padding: 0;
  width: 100%;
}
</style>
