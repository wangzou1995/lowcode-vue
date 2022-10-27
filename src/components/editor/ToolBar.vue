<template>
  <div class="bar-list" :style="{
    transform: `translate(0,-${scrollTop}px)`,
     top: barPosition.top + 'px',
     left: barPosition.left + 'px'}">
    <div class="bar-btns-top" v-show="(barPosition.top - scrollTop -15) > 54" >
      <div class="bar-btns-icon" @click.stop="onDelete">
        <icon-delete/>
      </div>
      <div class="bar-btns-icon" @click.stop="onCopy">
        <icon-copy/>
      </div>
      <div class="bar-btns-icon" v-show="componentSelected.tag === 'a-table'" @click.stop="onCopy">
        <icon-oblique-line/>
      </div>
    </div>
    <div class="bar-list-border" :style="style">
    </div>
    <div class="bar-btns" v-show="(barPosition.top - scrollTop -15)<= 54" >
      <div class="bar-btns-icon" @click.stop="onDelete">
        <icon-delete/>
      </div>
      <div class="bar-btns-icon" @click.stop="onCopy">
        <icon-copy/>
      </div>
      <div class="bar-btns-icon" v-show="componentSelected.tag === 'a-table'" @click.stop="onCopy">
        <icon-oblique-line/>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import {useEditorStore} from '../../stores/editor/componentRender'
import {storeToRefs} from 'pinia'
import {reactive, watch, onMounted, nextTick} from "vue";
import {useMaterialStore} from '../../stores/material'
import {useBarStore} from '../../stores/toolbar'
import IconDelete from "@arco-design/web-vue/es/icon/icon-delete/icon-delete";
import Icon from "@arco-design/web-vue/es/icon-component/icon";
import IconCopy from "@arco-design/web-vue/es/icon/icon-copy/icon-copy";
import IconObliqueLine from "@arco-design/web-vue/es/icon/icon-oblique-line/icon-oblique-line";

const materialStore = useMaterialStore();
const editorStore = useEditorStore();
const barStore = useBarStore()

const {scrollTop, componentSelected, refreshBorder,d} = storeToRefs(editorStore)
const {fixed, currentMenu} = storeToRefs(materialStore)
const {barPosition} = storeToRefs(barStore)

const transform = reactive<{
  transform: string
}>({transform: "translate(0,0)"})

const style = reactive<{ width: string, height: string, transform: string }>({
  width: '0px',
  height: '0px',
  transform: 'translate3d(0px, 0px, 0px)'
})

watch(scrollTop, (val) => {
  transform.transform = `translate(0,${val}px)`
})


const refreshComponentSelected = async () => {
  await nextTick()
  let element = document.getElementById(componentSelected.value.id) as HTMLElement
  if (element) {
    let rect = element.getBoundingClientRect();

    let width = rect.width;
    barStore.setBarPosition({
      width: element.offsetWidth,
      height: element.offsetHeight,
      x: rect.x,
      y: rect.y,
      top: rect.top + scrollTop.value - 1,
      bottom: rect.bottom,
      left: rect.left,
      fixed: fixed.value,
    })
    style.height = element.offsetHeight + 'px';
    style.width = element.offsetWidth + 'px';
    style.transform = `ranslate3d(${rect.left}px, ${rect.top}px, 0px)`
  }

}

const onDelete = () => {
  console.log('onDelete')
}
const onCopy = () => {
  console.log('onCopy')
}

watch(fixed, (newValue) => {
  refreshComponentSelected()
})
watch(currentMenu, () => {
  refreshComponentSelected()
})
watch(refreshBorder, (val) => {
  console.log('刷新border')
  console.log(val)
  setTimeout(() => {
    refreshComponentSelected()
  }, 10)

})


onMounted(() => {
  console.log(barPosition)
})
</script>
<style lang="scss" scoped>
.bar-list {
  position: absolute;
  // 该元素永远不会成为鼠标事件的 target。但是，当其后代元素的 pointer-events
  // 属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，
  // 鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器 (鼠标的动作将不能被该元素及其子元素所捕获，但是能够被其父元素所捕获)。
  pointer-events: none;

}

.bar-list-border {
  border: 2px blue solid;
  z-index: 2;
  box-sizing: border-box;

}

.bar-btns {
  position: absolute;
  text-align: right;
  flex-grow: initial;
  background-color: #0000fe !important;
  line-height: 30px;
  color: white;
  right: 0;
  cursor: pointer;
  z-index: 2;
  pointer-events: auto;
}
.bar-btns-top{
  position: absolute;
  text-align: right;
  flex-grow: initial;
  background-color: #0000fe !important;
  line-height: 30px;
  color: white;
  right: 0;
  cursor: pointer;
  z-index: 2;
  pointer-events: auto;
  margin-top: -30px;
}



.bar-btns-icon {
  width: 20px;
  height: 30px;
  float: right;
  margin-right: 5px;
}
</style>
