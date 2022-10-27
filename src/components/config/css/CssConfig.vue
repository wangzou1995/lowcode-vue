<template>
  <a-collapse :default-active-key="[0,1,2,3,4]">
    <a-collapse-item :key="0" header ="布局" >
      <a-form-item label="布局模式">
        <a-radio-group default-value="1">
          <a-radio value="1">
            <template #radio="{ checked }">
              <a-tag :checked="checked" checkable>This is a tag radio 1</a-tag>
            </template>
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-collapse-item>
    <a-collapse-item :key="1" header="文字" />
    <a-collapse-item :key="2" header="背景" />
    <a-collapse-item :key="3" header="位置" />
    <a-collapse-item :key="4" header="边框" />
  </a-collapse>
</template>

<script lang="ts">
import EllipsisPager from "@arco-design/web-vue/es/pagination/page-item-ellipsis";

export default {
  components: {EllipsisPager}
}
</script>

<style lang="scss" scoped>

</style>
