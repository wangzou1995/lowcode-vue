<template>


    {{component.tag}}
    <component v-if="!component.isContainer" :is="component.tag"  v-bind="component.props" :style="component.style"/>

  <template v-if="component.isContainer">

    <draggableComponent itemKey="id"
                        :group="{name: 'component'}"
                        ghostClass="ghostClass"
                        animation="300"
                        sort: true
                        :list="component.children"
                        :tag="component.tag"
                        :component-data="{...component.props, style: {...component._editor_auxiliary_style,
                ...component.style}}">
      <template #item="element">
          <component-render-nest :component="element"/>
      </template>
    </draggableComponent>
  </template>


</template>

<script lang="ts" setup>
// import {Component} from "../../stores/types";
import {render} from "../../utils/RenderUtils";
import {storeToRefs} from 'pinia'
import {useEditorStore} from "../../stores/editor/componentRender"
import draggableComponent from "vuedraggable";
import { resolveComponent} from 'vue'
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
</style>
