<template>
  <a-input
      :model-value="value"
      :default-value="defaultValue"
      :placeholder="placeholder"
      :value="value"
      allow-clear
      @change="val => emit('onChange', val)"
  />
</template>
<!--字符串设置器-->
<script setup lang="ts">
import {defineProps, defineEmits} from 'vue'

const {value, defaultValue, placeholder} = defineProps<{
  value: string,
  defaultValue: string,
  placeholder: string,
}>()
const emits = defineEmits<{
  (e: 'onChange', value: string): void
}>()
</script>
<style scoped lang="scss">

</style>
