<template>
  <div id="ap" >
    <a-button >测试</a-button>
    <a-input></a-input>
  </div>

</template>

<script lang="ts" setup>

import {ref, onMounted, nextTick} from "vue";
const ap = ref();
const a1 = [
  {
    id:1
  },
  {
    id:2
  },
  {
    id:3,
    children: [
      {
        id:4
      },
      {
        id:5
      },
    ]
  }
]
onMounted(()=> {
  nextTick()

})


</script>
<style lang="scss" scoped>

</style>
