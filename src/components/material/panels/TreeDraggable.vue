<template>


  <draggableComponent :list="nodes" group="component" ghostClass="ghostClass"
                      animation="300" item-key="id" @start="onStart" @end="onEnd" @change="onChange">
    <template #item="{element}">
      <div class="tree-node" @click.stop="onClick(element)">
        <div :class="componentSelected.id === element.id ? 'item-node-text active': 'item-node-text'">
          <template v-if="element.children">
            <!--              <icon-right />-->
            <!--              <icon-down/>-->
          </template>
          {{ element.name }}
        </div>
        <template v-if="element.children" >
          <tree-draggable style="box-sizing: border-box"
                          :style="{backgroundColor: element.children && element.children.length === 0? '#edeff3': '',borderLeft: dragging? '1px blue solid': '1px silver solid'
          }"
                          :nodes="element.children"></tree-draggable>
        </template>
      </div>
    </template>
  </draggableComponent>


</template>

<script lang="ts" setup>
import {defineProps} from 'vue'
import draggableComponent from "vuedraggable";
import {useEditorStore} from '../../../stores/editor/componentRender'
import {useGlobalContextStore} from '../../../stores/context/global'
import {storeToRefs} from 'pinia'
const {nodes} = defineProps<{
  nodes: any[]
}>()
const editorStore = useEditorStore()
const {componentSelected} = storeToRefs(editorStore)

const globalContext = useGlobalContextStore()
const {dragging} = storeToRefs(globalContext)
const onClick = (element: any) => {
  editorStore.updateComponentSelected(element)
  editorStore.updateRefreshBorder()
}
/**
 * 克隆物料时触发
 */
const onEnd = (evt: any) => {
  globalContext.updateDragStatus(false)
}

const onStart = () => {
  console.log("start")
  globalContext.updateDragStatus(true)
}
const onChange = (evt: any) => {
  if (evt.added) {
    editorStore.updateComponentSelected(evt.added.element)
  }
  if(!evt.removed) {
    editorStore.updateRefreshBorder()
  }
}
</script>

<style lang="scss" scoped>
.ghostClass {
  cursor: move !important;
  //background: #F56C6C;
  border: 1px dashed blue;
  outline-width: 0;
  height: 30px;
  box-sizing: border-box;
  font-size: 0;
  content: '';
  overflow: hidden;
  padding: 0;
  width: 100%;

}

.item-node-icon {
  text-align: center;
  width: 20%;

}

.item-node-text {
  width: 100%;
  text-align: left;
  padding-left: 10px;
  color: rgba(0, 0, 0, 0.6);
}
.active{
  background-color: #edeff3;
}

.tree-node {
  flex-direction: column;
  display: flex;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.6);
  padding: 2px;
  box-sizing: border-box
}

.tree-node:hover {
  cursor: move !important;
}

.child-area {
  height: 20px;
  background-color: #edeff3;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
  content: '子组件区域';
}
</style>
