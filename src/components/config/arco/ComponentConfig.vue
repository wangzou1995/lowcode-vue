<template>
  <div>
    <div style="border-bottom: 1px silver solid; box-sizing: border-box;height: 40px;line-height: 40px;
    ">
      <a-breadcrumb :max-count="3">
        <template #separator>
          <icon-right/>
        </template>
        <template #more-icon>
          <a-tooltip content="more +">
            <icon-more/>
          </a-tooltip>
        </template>
        <a-breadcrumb-item>页面</a-breadcrumb-item>

        <a-breadcrumb-item @click="onClick(item.id)" v-for="(item,index) in breadcrumb">{{
            item.name
          }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class="component-config">
      <a-tabs default-active-key="1" style="width: 300px">
        <a-tab-pane key="1" title="属性" :style="{height: paneHeight}" style="overflow-y: scroll;">
          <element-config />
        </a-tab-pane>
        <a-tab-pane key="2" title="样式" :style="{height: paneHeight}" style="overflow-y: scroll;">
         <css-config />
        </a-tab-pane>
        <a-tab-pane key="3" title="事件" :style="{height: paneHeight}" style="overflow-y: scroll;">
          Content of Tab Panel 3
        </a-tab-pane>
        <a-tab-pane key="4" title="高级" :style="{height: paneHeight}" style="overflow-y: scroll;">
          Content of Tab Panel 3
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {useEditorStore} from '../../../stores/editor/componentRender'
import {storeToRefs} from 'pinia'
import { ref, watch} from 'vue'
import {getPathByKey} from "../../../utils/ToolUtils";
import CssConfig from "../css/CssConfig.vue";
import ElementConfig from "./ElementConfig.vue";
import {useGlobalContextStore} from '../../../stores/context/global'

const globalContext = useGlobalContextStore()
const {windowHeight, dragging} = storeToRefs(globalContext)
const editorStore = useEditorStore()
const {schema, componentSelected,refreshBorder} = storeToRefs(editorStore)
let breadcrumb = ref([]);

// panel高度
let paneHeight = ref((window.innerHeight - 145) + 'px')

watch(refreshBorder,()=> {
    breadcrumb.value = getPathByKey(componentSelected.value.id, schema.value)
})
watch(windowHeight, () => {
  paneHeight.value = (windowHeight.value - 145) + 'px'
})




const onClick = (id: string) => {
  if (id !== componentSelected.value.id) {
    editorStore.updateComponentSelectedById(id)
    editorStore.updateRefreshBorder()
  }

}
</script>

<style scoped lang="scss">
.component-config {

}

</style>
