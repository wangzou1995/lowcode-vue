<template>
  <a-input-number :model-value="value" />
</template>
<script setup lang="ts">
import {defineProps, defineEmits} from 'vue'
const {value} = defineProps<{
  value: number
}>()
const emits = defineEmits(['onChange'])
</script>
<style scoped lang="scss">

</style>
