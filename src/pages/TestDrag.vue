<template>
   <a-table>

   </a-table>
  <a-table-column title="1" data-index="0">dsdsd</a-table-column>
  <a-table-column title="2" data-index="1">dsdsd</a-table-column>
  <a-table-column title="3" data-index="2">dsdsd</a-table-column>

  <a-button @click="onClick">点击</a-button>
</template>

<script lang="ts" setup>

import {ref, onMounted, reactive,nextTick, getCurrentInstance} from "vue";
import draggable from "../components/draggable/vuedraggable";

const defaultNodes: any[] = []
const ap = ref();
const a1 = reactive([
  {
    id: 1.1
  },
  {
    id: 1.2
  },
  {
    id: 1.3
  }
])
const componentData = {
  title: '测试'
}
const onClick= ()=> {
  let c = a1.splice(0, 1)[0]
  a1.splice( 2, 0,c);
}
onMounted(() => {


})


</script>
<style lang="scss" scoped>
.sd{

  background: #F56C6C;
  border: 2px solid #F56C6C;
  outline-width: 0;
  height: 3px;
  box-sizing: border-box;
  font-size: 0;
  content: '';
  overflow: hidden;
  padding: 0;
  cursor: move;
}
</style>
