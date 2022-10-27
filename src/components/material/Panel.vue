<template>

  <div :class="fixed ? currentMenu ? 'panel-fixed': 'panel-fixed hidden' :currentMenu ? 'panel': 'panel hidden'"
       :style="{width: paneWidth}">
    <div :class="currentMenu? 'title': 'title hidden'">
      <div class="ltitle">
        {{ title }}
      </div>
      <div class="tool">
        <div class="icon" @click="onFixed">
          <a-tooltip :content="fixed?'解除固定': '固定位置'" position="right">
            <icon-pushpin size="large" :rotate="fixed ? -45: 0"/>
          </a-tooltip>
        </div>
        <div class="icon" @click="onClosePane">
          <a-tooltip content="关闭" position="right">
            <icon-close size="large"/>
          </a-tooltip>
        </div>
      </div>
    </div>
    <div :class="currentMenu? 'body': 'body hidden'">
      <!--组件物料-->
      <component-material v-show="currentMenu ==='component'"/>
      <!--大纲树-->
      <component-tree v-show="currentMenu ==='tree'" :config="false"/>
      <!--schema-->
      <schema-editor v-show="currentMenu ==='schema'"/>
      <!--schema-->
      <help v-show="currentMenu ==='help'"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useMaterialStore} from '../../stores/material/index'
import {ref, watch} from "vue";
import ComponentMaterial from "./panels/ComponentMaterial.vue";
import ComponentTree from "./panels/ComponentTree.vue";
import SchemaEditor from "./panels/SchemaEditor.vue";
import Help from "./panels/Help.vue";

const materialStore = useMaterialStore()
const {currentMenu, fixed} = storeToRefs(materialStore)

const paneWidth = ref<string>('300px')

const title = ref<string>('物料组件')

/**
 * 关闭panel
 */
const onClosePane = () => {
  materialStore.clearCurrentMenu();
}
const onFixed = () => {
  materialStore.updateFixed()

}

watch(currentMenu, () => {
  switch (currentMenu.value) {
    case 'tree':
    case 'component':
    case 'source':
    case 'help':
      paneWidth.value = '300px'
      break
    case 'schema':
      paneWidth.value = '100vh'
      break
    default:
      paneWidth.value = '0px'
      break
  }
})
watch(currentMenu, () => {
  switch (currentMenu.value) {
    case 'tree':
      title.value = '大纲树'
      break
    case 'component':
      title.value = '物料组件'
      break
    case 'source':
      title.value = '源码'
      break
    case 'schema':
      title.value = 'Schema'
      break
    case 'help':
      title.value = '帮助文档'
      break
    default:
      title.value = ''
      break
  }
})
</script>

<style lang="scss" scoped>
.panel {
  display: block;
  z-index: 1000;
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 48px;
  height: calc(100% - 50px);
  border-color: #f7ba1e;
  background-color: var(--color-white);
  margin-left: 2px;
  box-shadow: 4px 6px 6px 0 rgb(31 50 88 / 8%);
  box-sizing: border-box;
  //overflow: scroll;

}

.panel-fixed {
  height: 100%;
  border-color: #f7ba1e;
  background-color: var(--color-white);
  margin-left: 2px;
  //overflow: hidden;

}

.panel .hidden {
  //overflow: hidden;
  display: none;
  width: 0;
}

.panel-fixed .hidden {
  //overflow: hidden;
  display: none;
  width: 0;
}

.title {
  width: 100%;
  height: 60px;
  line-height: 60px;

}

.title .hidden {
  display: none;
}

.ltitle {
  font-size: 18px;
  font-weight: 800;
  margin-left: 12px;
  float: left;
}

.tool {
  float: right;
  margin-right: 12px;
  width: 60px;
}

.icon {
  float: left;
  width: 30px;
  height: 60px;
  cursor: pointer;

}

.body .hidden {
  display: none;
}

.body {
  height: calc(100% - 100px);
}
</style>
