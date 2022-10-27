<template>
  <div class="left-area-visible">
    <div class="left-area-top">
      <div :class="currentMenu === 'tree'? 'active icon': 'icon'" @click="onClickIcon('tree')">
        <a-tooltip content="大纲树" position="right">
          <icon-menu size="large"/>
        </a-tooltip>
      </div>
      <div :class="currentMenu === 'component'? 'active icon': 'icon'" @click="onClickIcon('component')">
        <a-tooltip content="组件库" position="right">
          <icon-apps size="large"/>
        </a-tooltip>
      </div>
      <div :class="currentMenu === 'source'? 'active icon': 'icon'" @click="onClickIcon('source')">
        <a-tooltip content="源码面板" position="right">
          <icon-file size="large"/>
        </a-tooltip>
      </div>
    </div>
    <div class="left-area-bottom">
      <div :class="currentMenu === 'schema'? 'active icon': 'icon'" @click="onClickIcon('schema')">
        <a-tooltip content="Schema" position="right">
          <icon-file size="large"/>
        </a-tooltip>
      </div>
      <div :class="currentMenu === 'help'? 'active icon': 'icon'" @click="onClickIcon('help')">
        <a-tooltip content="帮助文档" position="right">
          <icon-question-circle size="large"/>
        </a-tooltip>
      </div>
    </div>
  </div>
  <div class="left-area-pane">
    <panel />
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {ref, watch, onMounted} from 'vue'
import {useMaterialStore} from '../../stores/material/index'
import Panel from "./Panel.vue";
const materialStore = useMaterialStore()
const {materialType, currentMenu} = storeToRefs(materialStore)
let materialData = ref();
/**
 * 图标点击事件
 *
 */
const onClickIcon = (type: string) => {
  materialStore.setCurrentMenu(type)
}
/**
 * 监听物料组件类型是否发生变更
 * 变更后重新获取物料数据
 */
watch(materialType, () => {
  console.log('物料类型变更')
  materialData.value = materialStore.getMaterialByType;
})
/**
 * 页面初始化动作
 */
onMounted(() => {
  materialData.value = materialStore.getMaterialByType;
})
</script>
<style lang="scss" scoped>
.left-area-visible {
  width: 48px;
  height: 100%;
  border-color: #f7ba1e;
  flex-direction: column;
  background-color: var(--color-white);
  display: flex;
  box-sizing: border-box;
}

.left-area-top {
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding-top: 12px;
  align-items: center;
}

.left-area-bottom {
  text-align: center;
  width: 48px;
  height: 150px;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  padding-bottom: 12px;
  bottom: 0;
}

.icon {
  height: 48px;
  cursor: pointer;
  line-height: 48px;
  text-align: center;
}

.active {
  color: blue;
}

.left-area-pane {

}
</style>
