<template>
  <editor
      width="100%"
      style="height: 200px"
      :options="options"
      :value="json2css(componentSelected.style)"
      theme='vs-light'
      defaultLanguage="css"/>
</template>

<script setup lang="ts">
import Editor, {useMonaco} from '@guolao/vue-monaco-editor'
import {useEditorStore} from '../../../stores/editor/componentRender'
import {storeToRefs} from 'pinia'
import {ref, onMounted, onUnmounted, nextTick} from 'vue'
import {json2css} from '../../../utils/CssUtils'
const editorStore = useEditorStore();
const {componentSelected} = storeToRefs(editorStore)

const {monacoRef, unload} = useMonaco()
const options = {
  formatOnType: true
}
/*
   当组件被卸载时, 如果 monaco 实例没有加载完, 你需要手动取消加载。
 */
onUnmounted(() => !monacoRef.value && unload())

onMounted(async () => {
})


</script>

<style lang="scss" scoped></style>
