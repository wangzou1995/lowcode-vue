<template>
  <div class="layout-demo">
    <a-layout style="height:100vh; width: 100vw">
      <a-layout-header style="height: 48px;">
        <index-header/>
      </a-layout-header>
      <a-layout>
        <material/>
        <a-layout-content>
          <editor/>
        </a-layout-content>

        <a-layout-sider :width="300">
          <context-config/>
        </a-layout-sider>
        <!--        schema编辑器-->
      </a-layout>
    </a-layout>
  </div>
  <a-modal hide-cancel title-align="start" :footer="false" :visible="preview" @ok="handleOk" @cancel="handleCancel" fullscreen>
    <template #title>
      页面预览
    </template>
    <Preview/>
  </a-modal>
</template>

<script setup lang="ts">
import Material from "../components/material/Material.vue";
import Editor from "../components/editor/Editor.vue";
import {onMounted, onUnmounted, ref} from "vue";
import {useGlobalContextStore} from '../stores/context/global'
import {useEditorStore} from '../stores/editor/componentRender'
import {storeToRefs} from 'pinia'
import ContextConfig from "../components/config/ContextConfig.vue";
import SchemaEditor from "../components/material/panels/SchemaEditor.vue";
import IndexHeader from "../components/header/IndexHeader.vue";
import Preview from "../components/preview/Preview.vue";

/**
 * myResizeHandler窗口变化事件，设置panel高度
 */
const globalContext = useGlobalContextStore();
const {windowHeight, preview} = storeToRefs(globalContext)
const myResizeHandler = () => {
  globalContext.updateWindowHeight(window.innerHeight)
  useEditorStore().updateRefreshBorder()
}
const handleOk = () => {
  globalContext.updatePreview(true)
}
const handleCancel = () => {
  globalContext.updatePreview(false)
}
onMounted(() => {
  console.log('监听窗口变化事件')
  globalContext.updateWindowHeight(window.innerHeight)
  window.addEventListener("resize", myResizeHandler);
})
onUnmounted(() => {
  window.removeEventListener("resize", myResizeHandler);
})

</script>

<style scoped lang="scss">
.layout-demo {
  background-color: $basic-background-color;
}

.layout-demo :deep(.arco-layout-header) {
  height: 48px;
  margin-bottom: 2px;
  padding: 8px 12px 8px 16px;
  z-index: 4;
}

.layout-demo :deep(.arco-layout-header) {
  background-color: var(--color-white);
}

.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-stretch: condensed;
  padding: 5px;
}


.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  border-color: var(--color-white);
}

.layout-demo :deep(.arco-layout-sider) {
  background-color: var(--color-white);
}

.layout-demo :deep(.arco-layout-content) {

}
</style>
