<template>
  <div class="editor-pay" id="-1" :style="{width: width}">
    <draggableComponent :list="schema"
                        group="component"
                        item-key="id"
                        class="editor"
                        :style="{height: editorHeight}"
                        ghostClass="ghostClass"
                        animation="300"
                        @scroll="myScroll"
                        @change="onChange"
    >
      <template #item="{element}">
        <div  class='item' :style="!element.isContainer?{...element._editor_auxiliary_style}: {}"
             @click="onClick($event, element)">
          <component-render :id="element.id" :component="element"/>
        </div>
      </template>
    </draggableComponent>
  </div>


  <!--  {{ componentSelectedPosition }}-->
  <!--  通过定位实现选中效果和工具栏效果-->

    <tool-bar/>


</template>

<script lang="ts" setup>
import draggableComponent from "../draggable/vuedraggable";
import {storeToRefs} from 'pinia'
import {useEditorStore} from "../../stores/editor/componentRender";
import {useGlobalContextStore} from "../../stores/context/global"
import {useHeaderStore} from "../../stores/header"

import ComponentRender from "./ComponentRender.vue";
import {ref, watch, onMounted, h} from "vue";
import ToolBar from "./ToolBar.vue";

// 编辑器数据Store
const editorStore = useEditorStore();
const globalContext = useGlobalContextStore();
const headerStore = useHeaderStore()

const {componentSelected, schema} = storeToRefs(editorStore)
const {windowHeight} = storeToRefs(globalContext)
const {width} = storeToRefs(headerStore)

const editorHeight = ref();
const editorRef = ref<HTMLElement>()

watch(width, () => {
  editorStore.updateRefreshBorder()
})

watch(windowHeight, () => {
  editorHeight.value = (windowHeight.value - 60) + 'px'
})

const onClick = (evt: any, element: any) => {
  editorStore.updateComponentSelected(element)
  editorStore.updateRefreshBorder()
  evt.stopPropagation();
}

const myScroll = (evt: any) => {
  editorStore.updateScrollTop(evt.target.scrollTop)
}

const onChange = (evt: any) => {
  if (evt.added) {
    editorStore.updateComponentSelected(evt.added.element)
  }
  if(!evt.removed) {
    editorStore.updateRefreshBorder()
  }

}
const r= () => {
  return h(draggableComponent, {

  })
}

</script>


<style lang="scss" scoped>
.editor {
  background-color: white;
  z-index: 1;
  box-sizing: border-box;
  box-shadow: 6px 6px 6px 0 rgb(31 50 88 / 8%);
  overflow-y: scroll;
}

.ghostClass {
  background: #F56C6C;
  border: 2px solid #F56C6C;
  outline-width: 0;
  height: 3px;
  box-sizing: border-box;
  font-size: 0;
  content: '';
  overflow: hidden;
  padding: 0;
  cursor: move;
}

.editor-pay {
  margin: 0 auto;
}

</style>
