<template>
  <div class="component-tree">
    <div class="component-search">
      <a-input-search style="width: 260px" placeholder="过滤节点"/>
    </div>
    <div class="component-tabs" :style="{height: treeHeight}" style="overflow-y: scroll;">
      <div class="page-tree">
        <icon-layout/>
        page
      </div>
      <tree-draggable :nodes="schema"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useEditorStore} from '../../../stores/editor/componentRender'
import {storeToRefs} from 'pinia'

import {ref, watch, defineProps} from 'vue'
import {useGlobalContextStore} from "../../../stores/context/global";
import TreeDraggable from "./TreeDraggable.vue";

const globalContext = useGlobalContextStore()
const {windowHeight} = storeToRefs(globalContext)
const {config} = defineProps<{ config: boolean }>()
const treeHeight = ref((window.innerHeight - (config ? 105 : 155)) + 'px')
const editorStore = useEditorStore();
const {schema} = storeToRefs(editorStore)



watch(windowHeight, () => {
  treeHeight.value = (windowHeight.value - (config ? 105 : 155)) + 'px'
})
</script>

<style lang="scss" scoped>
.component-tree {
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.component-search {
  text-align: center;
  border-bottom: 1px silver solid;
  box-sizing: border-box;
  padding-bottom: 12px;
}

.component-tabs {
  user-select: none;
}

.page-tree {
  box-sizing: border-box;
  padding-left: 10px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
