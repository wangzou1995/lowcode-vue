<template>
  <icon-font :type="type" :size="size"/>
</template>

<script setup lang="ts">
import {Icon} from '@arco-design/web-vue';
import {defineProps} from 'vue'

const IconFont = Icon.addFromIconFontCn({src: 'http://at.alicdn.com/t/c/font_3744440_wbh5181vp1a.js'});
const {type,size} = defineProps<{
  type: string,
  size: number
}>()

</script>
