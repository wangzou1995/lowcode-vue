<template>
  <draggable-wrapper        :group-name="component" :list="list" item-key="id"  tag="a-space" >
      <template v-slot="{element}" >
        <div>
          <a-input />
        </div>

      </template>
  </draggable-wrapper>
{{list}}

</template>

<script lang="ts" setup>
import draggableComponent from "../components/draggable/vuedraggable";
import {reactive} from "vue";
import DraggableWrapper from "../components/draggable/DraggableWrapper.vue";

const options: any = {
  group: 'component'
}

const list: any [] = reactive([
  {
    id: 1,
    name: 'a',
    component: 'a-col'
  },
  {
    id: 2,
    name: 'b',
    component: 'a-col'
  }
])
</script>
<style lang="scss" scoped>

</style>
