<template>
  <div class="page-header">
    <div class="page-header-logo">
      <a-image @click="goHome" src="./src/assets/imgs/logo.png" :preview="false" fit="fill" height="40" width="130"/>
      <a-image src="./src/assets/imgs/title.png" :preview="false" height="40" width="150" />
    </div>
    <div class="page-header-type">
      <div class="page-header-type-act" @click="onClick(1)" :style="{backgroundColor: type===1? '#edeff3': ''}">
        <icon-computer/>
      </div>
      <div class="page-header-type-act" @click="onClick(2)" :style="{backgroundColor: type===2? '#edeff3': ''}">
        <icon-mobile/>
      </div>

    </div>
    <div class="page-header-btns">
      <a-button type="primary" size="small" @click="onClickPreview">预览</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useHeaderStore} from '../../stores/header'
import {useGlobalContextStore} from '../../stores/context/global'
import {storeToRefs} from 'pinia'

const headerStore = useHeaderStore()
const globalContext = useGlobalContextStore()

const {type} = storeToRefs(headerStore)

const onClick = (val: number) => {
  headerStore.updatePcType(val)
  headerStore.updateEditorWidth(val === 1 ? "100%" : "375px")
}
const onClickPreview = () => {
  globalContext.updatePreview(true)
}
const goHome = () => {
  window.open("https://www.yw56.com.cn/")
}
</script>
<style scoped lang="scss">
.page-header {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
}

.page-header-logo {
  width: 20%;
  box-sizing: border-box;
  float: left;
  height: 100%;
}

.page-header-type {
  width: 30%;
  height: 100%;
  float: left;
  text-align: left;
}

.page-header-type-act {
  width: 10%;
  height: 100%;
  float: left;
  margin-left: 5px;
  line-height: 36px;
  text-align: center;
}

.page-header-type-act:hover {
  background-color: #edeff3;
}

.page-header-btns {
  width: 50%;
  box-sizing: border-box;
  height: 100%;
  float: left;
  text-align: right;
  line-height: 36px;
}
</style>
