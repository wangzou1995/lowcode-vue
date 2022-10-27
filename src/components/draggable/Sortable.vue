<script setup lang="ts">
import {ref, PropType, watch, onUnmounted, computed} from "vue";
import Sortable, {SortableOptions} from "sortablejs";
console.log('进入Sortable')
type SortableOptionsProp = Omit<SortableOptions,
    | "onUnchoose"
    | "onChoose"
    | "onStart"
    | "onEnd"
    | "onAdd"
    | "onUpdate"
    | "onSort"
    | "onRemove"
    | "onFilter"
    | "onMove"
    | "onClone"
    | "onChange">;
const props = defineProps({
  /** All SortableJS options are supported; events are handled by the `defineEmits` below and should be used with v-on */
  options: {
    type: Object as PropType<SortableOptionsProp>,
    default: null,
    required: false,
  },
  /** Your list of items **/
  list: {
    type: [Array, Object] as PropType<any[]>,
    default: [],
    required: true,
  },
  /** The name of the key present in each item in the list that corresponds to a unique value. */
  itemKey: {
    type: [String, Function] as PropType<string | ((item: any) => string | number | Symbol)>,
    default: "",
    required: true,
  },
  /** The element type to render as. */
  tag: {
    type: String as PropType<string>,
    default: "div",
    required: false,
  },
  /** The element type to render as.componentData */
  componentData: {
    type: Object as PropType<any>,
    default: null,
    required: false,
  }
});
const emit = defineEmits<{
  (eventName: "choose", evt: Sortable.SortableEvent): void;
  (eventName: "unchoose", evt: Sortable.SortableEvent): void;
  (eventName: "start", evt: Sortable.SortableEvent): void;
  (eventName: "end", evt: Sortable.SortableEvent): void;
  (eventName: "add", evt: Sortable.SortableEvent): void;
  (eventName: "update", evt: Sortable.SortableEvent): void;
  (eventName: "sort", evt: Sortable.SortableEvent): void;
  (eventName: "remove", evt: Sortable.SortableEvent): void;
  (eventName: "filter", evt: Sortable.SortableEvent): void;
  (eventName: "move", evt: Sortable.MoveEvent, originalEvent: Event): void;
  (eventName: "clone", evt: Sortable.SortableEvent): void;
  (eventName: "change", evt: Sortable.SortableEvent): void;
}>();
const containerRef = ref<HTMLElement | null >(null);
const sortable = ref<Sortable | null>(null);
const getKey = computed(() => {
  if (typeof props.itemKey === "string")
    return (item: any) => item[props.itemKey as string];
  return props.itemKey;
});
watch(containerRef, (newDraggable) => {
  console.log(newDraggable)
  if (newDraggable) {
    sortable.value = new Sortable(newDraggable, {
      ...props.options,
      onChoose: (event: Sortable.SortableEvent) => emit("choose", event),
      onUnchoose: (event: Sortable.SortableEvent) => emit("unchoose", event),
      onStart: (event: Sortable.SortableEvent) => emit("start", event),
      onEnd: (event: Sortable.SortableEvent) => emit("end", event),
      onAdd: (event: Sortable.SortableEvent) => emit("add", event),
      onUpdate: (event: Sortable.SortableEvent) => emit("update", event),
      onSort: (event: Sortable.SortableEvent) => emit("sort", event),
      onRemove: (event: Sortable.SortableEvent) => emit("remove", event),
      onFilter: (event: Sortable.SortableEvent) => emit("filter", event),
      onMove: (event: Sortable.SortableEvent, originalEvent: Sortable.SortableEvent) => emit("move", event, originalEvent),
      onClone: (event: Sortable.SortableEvent) => emit("clone", event),
      onChange: (event: Sortable.SortableEvent) => emit("change", event),
    });
  }
});
watch(
    () => props.options,
    (options) => {
      if (options && sortable?.value) {
        for (const property in options) {
          sortable.value.option(
              property as keyof SortableOptionsProp,
              options[property as keyof SortableOptionsProp]
          );
        }
      }
    }
);
onUnmounted(() => {
  if (sortable.value) {
    sortable.value.destroy();
    containerRef.value = null;
    sortable.value = null;
  }
});
</script>

<template>
  <component ref="containerRef" :is="$props.tag" :class="$props.class">
    <slot
        v-for="(item, index) of list"
        :key="getKey(item)"
        :element="item"
        :index="index"
        name="item"
    ></slot>
  </component>
</template>
