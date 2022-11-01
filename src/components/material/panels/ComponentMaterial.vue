<template>
  <div class="component-material">
    <div class="component-search">
      <a-input-search v-model="searchComponent" style="width: 260px" placeholder="搜索组件"/>
    </div>
    <div class="component-tabs">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" title="通用组件" :style="{height: paneHeight}" style="overflow-y: scroll;  ">
          <a-collapse
              :default-active-key="getAllKey(materialData)"
              expand-icon-position="right"
              :bordered="false">
            <a-collapse-item v-for="(classs, index) in materialData" :key="index" :header=" classs.name">
              <draggableComponent :list="classs.components" item-key="id"
                                  :group="{ name: 'component', pull: 'clone', put: false }"
                                  :sort="false"
                                  :clone="onClone"
                                  animation="300"
                                  @change="onChange"
                                  @start="onStart"
                                  @end="onEnd"
              >
                <template #item="{element}">
                  <div class="drag-component" v-show="!searchComponent || !(element.name.indexOf(searchComponent) < 0)">
                    <!-- 实现物料组件过滤 -->
                    <div class="drag-component-img">
                      <a-image :width="70" :height="70" fit="contain" :src="getSvg(element.tag)"/>
                    </div>
                    <div class="drag-component-text">
                      {{ element.name }}
                    </div>
                  </div>
                </template>
              </draggableComponent>
            </a-collapse-item>
          </a-collapse>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useMaterialStore} from "../../../stores/material";
import {useGlobalContextStore} from "../../../stores/context/global"
import {useEditorStore} from "../../../stores/editor/componentRender"
import {storeToRefs} from "pinia";
import {onMounted, ref, watch, onUnmounted, reactive} from "vue";
import draggableComponent from "../../draggable/vuedraggable";
import {nanoid} from 'nanoid'
// 物料pinia
const materialStore = useMaterialStore()
const {materialType, currentMenu} = storeToRefs(materialStore)
const globalContext = useGlobalContextStore()
const {windowHeight, dragging} = storeToRefs(globalContext)
const editorStore = useEditorStore()
const {} = storeToRefs(editorStore);
const tempComponent = ref();


// 物料组件数据
let materialData = reactive(materialStore.getMaterialByType);
// panel高度
let paneHeight = ref((window.innerHeight - 195) + 'px')
// 搜索组件的数值
let searchComponent = ref();

/**
 * 获取图标
 */
const getSvg = (tag: string) => {
  return `./src/assets/imgs/${materialType.value}/${tag}.png`
}
/**
 * 搜索物料组件
 */
const onSearch = (value: any) => {
}
const getAllKey = (data: any) => {
  let result = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      result.push(i)
    }
  }

  return result;
}

/**
 * 克隆物料时触发
 */
const onClone = (evt: any) => {
  let cloneComponent = JSON.parse(JSON.stringify(evt))
  cloneComponent.id = `component_${nanoid(6)}`
  tempComponent.value = cloneComponent;
  return cloneComponent
}

/**
 * 克隆物料时触发
 */
const onChange = (evt: any) => {
  editorStore.updateComponentSelected(tempComponent.value)

}

const onStart = () => {
  globalContext.updateDragStatus(true)
}

const onEnd = (val: any) => {
  globalContext.updateDragStatus(false)
}

/**
 * 监听物料组件类型是否发生变更
 * 变更后重新获取物料数据
 */
watch(materialType, () => {
  materialData.value = materialStore.getMaterialByType;
})
watch(windowHeight, () => {
  paneHeight.value = (windowHeight.value - 195) + 'px'
})

</script>

<style lang="scss" scoped>
.component-material {
  width: 100%;
}

.component-search {
  text-align: center;
}

.component-tabs {
  margin-top: 12px;

}

::v-deep(.arco-tabs-content) {
  padding-top: 0;
}

::v-deep(.arco-collapse-item-content) {
  padding: 0;
  background-color: white;
}

::v-deep(.arco-collapse-item-content-box) {
  padding: 0;
}

.drag-component {
  height: 100px;
  width: 100px;
  float: left;
  box-sizing: border-box;
  border: 1px solid #edeff3;
}

.drag-component:hover {
  box-shadow: 6px 6px 6px 0 rgb(31 50 88 / 8%);
}

.drag-component-img {
  width: 100px;
  height: 70px;
  text-align: center;
  line-height: 70px;
}

.drag-component-text {
  width: 100%;
  height: 30%;
  text-align: center;
}

// 拖拽选中时的样式
.chosenClass {
  //background-color: red;
}

// 拖拽过程中的样式
.ghostClass {
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

.dragClass {


}
</style>
