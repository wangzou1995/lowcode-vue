<template>
  <div class="context-config" :style="{paddingTop: dragging? '10px': 0}">
    <component-tree v-show="dragging" :config="true"/>
    <component-config v-show="!dragging"/>
  </div>

</template>

<script lang="ts" setup>
import {useGlobalContextStore} from '../../stores/context/global'
import {storeToRefs} from 'pinia'
import ComponentTree from "../material/panels/ComponentTree.vue";
import ComponentConfig from "./arco/ComponentConfig.vue";

const globalContextStore = useGlobalContextStore();

const {dragging} = storeToRefs(globalContextStore)

</script>

<style scoped lang="scss">
.context-config {
}
</style>
