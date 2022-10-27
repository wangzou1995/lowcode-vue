<template>
  <draggableComponent
      class="paletteGroup"
      :group="{ name: props.groupName }"
      :list=" props.list"
      :component-data=" props.compoentData"
      :empty-insert-threshold="0"
      :clone="$emit('onClone')"
      :model-value="props.elements"
      :item-key="itemKey"
      @start="$emit('onStart', $event)"
      @end="$emit('onEnd', $event)"
      :tag="props.tag"
  >
    <template #item="dragOpts">
      <slot v-bind="dragOpts"/>
    </template>
  </draggableComponent>
</template>
<script setup lang="ts">
import draggableComponent from "vuedraggable";
import {defineProps, defineEmits} from 'vue'

 const props = defineProps(['groupName', 'itemKey','list','componentData', 'tag'])

 const emits = defineEmits(['onClone', 'onStart', 'onEnd'])

</script>
