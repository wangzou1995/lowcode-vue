<template>
  <editor
      width="100%"
      :options="options"
      :value="JSON.stringify(schema, null, 2)"
      theme='vs-light'
      defaultLanguage="json"/>
</template>

<script setup lang="ts">
import Editor, {useMonaco} from '@guolao/vue-monaco-editor'
import {useEditorStore} from '../../../stores/editor/componentRender'
import {storeToRefs} from 'pinia'
import {ref, onMounted, onUnmounted, nextTick} from 'vue'

const editorStore = useEditorStore();
const {schema} = storeToRefs(editorStore)

const {monacoRef, unload} = useMonaco()
const options = {
  formatOnType: true
}
/*
   当组件被卸载时, 如果 monaco 实例没有加载完, 你需要手动取消加载。
 */
onUnmounted(() => !monacoRef.value && unload())
const schemaFnc = () => {
  return JSON.stringify(schema, null, 2)
}

onMounted(async () => {

})


</script>

<style lang="scss" scoped></style>
