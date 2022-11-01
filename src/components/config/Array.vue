<template>
    <a-form-item :label="name" >
      <a-select :multiple="multiple" @change="">
        <a-option v-for="(option,index) in data" :value="value">
          {{option[key]}}
        </a-option>
      </a-select>
    </a-form-item>
</template>
<script lang="ts" setup>
import {defineProps, onMounted} from 'vue'
// 默认 [key,display]
const {data, api, key, value,multiple,element,name} = defineProps<{
  data: Object [],
  api: string,
  key: string,
  value: string,
  element: string,
  multiple: boolean,
  name: string
}>()
onMounted(() => {
  if (api) {
    // 请求远程API获取数据
  } else {

  }
})
</script>
<style lang="scss" scoped>

</style>
