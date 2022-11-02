<template>
  <a-collapse :default-active-key="[0,1,2,3,4]" style="background-color: white">
    <a-collapse-item :key="0" header="布局">
      <div class="row-container">
        <div class="title-container">布局模式</div>
        <div class="content-container">
          <a-radio-group type="button" size="mini" v-model="cssObj.display">
            <a-radio value="inline">
              <a-popover content="内联布局 inline">
                <CustomIcon type="icon-display-inline" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio value="flex">
              <a-popover content="弹性布局 flex">
                <CustomIcon type="icon-display-flex" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio value="block">
              <a-popover content="块级布局 block">
                <CustomIcon type="icon-display-block" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio value="inline-block">
              <a-popover content="内联块级布局 inline-block">
                <CustomIcon type="icon-display-inline_block" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio value="none">
              <a-popover content="隐藏 none">
                <CustomIcon type="icon-display-none" :size="16"/>
              </a-popover>
            </a-radio>
          </a-radio-group>
        </div>
      </div>
      <div class="layout-box-container">
        <div class="margin-top-div">
          <span class="next-input next-medium next-noborder">
            <a-input class="inp" v-model="cssObj.marginTop"
                     :max-length="3" placeholder="0" size="mini" style="border: none">
            </a-input>
          </span>
        </div>
        <div class="margin-right-div">   <span class="next-input next-medium next-noborder">
            <a-input class="mri" v-model="cssObj.marginRight" :max-length="3" placeholder="0" size="mini"/>
          </span></div>
        <div class="margin-bottom-div">   <span class="next-input next-medium next-noborder">
          <span class="help-txt">MARGIN</span>
            <a-input class="mbi" v-model="cssObj.marginBottom" :max-length="3" placeholder="0" size="mini"/>
          </span></div>
        <div class="margin-left-div">   <span class="next-input next-medium next-noborder">
            <a-input class="mli" v-model="cssObj.marginLeft" :max-length="3" placeholder="0" size="mini"/>
          </span></div>
        <div class="padding-top-div">   <span class="next-input next-medium next-noborder">
            <a-input class="inp" v-model="cssObj.paddingTop" :max-length="3" placeholder="0" size="mini"
                     style="border: none"/>
          </span></div>
        <div class="padding-right-div">   <span class="next-input next-medium next-noborder">
            <a-input class="pri" v-model="cssObj.paddingRight" :max-length="3" placeholder="0" size="mini"/>
          </span></div>
        <div class="padding-bottom-div">   <span class="next-input next-medium next-noborder">
             <span class="help-txt">PADDING</span>
            <a-input class="pbi" v-model="cssObj.paddingBottom" :max-length="3" placeholder="0" size="mini"/>
          </span></div>
        <div class="padding-left-div">   <span class="next-input next-medium next-noborder">
            <a-input v-model="cssObj.paddingLeft" class="pli" :max-length="3" placeholder="0" size="mini"/>
          </span></div>
      </div>

      <div class="row-container">
        <div class="row-item"><span class="row-item-title">宽度</span>
          <a-input class="row-item-input" v-model="cssObj.width" :placeholder="wh.width">
            <template #append>
              px
            </template>
          </a-input>
        </div>
        <div class="row-item"><span class="row-item-title">高度</span>
          <a-input class="row-item-input" v-model="cssObj.height" :placeholder="wh.height">
            <template #append>
              px
            </template>
          </a-input>
        </div>
      </div>
    </a-collapse-item>
    <a-collapse-item :key="1" header="文字">
      <div class="row-container">
        <div class="row-item"><span class="row-item-title">字号</span>
          <a-input class="row-item-input" v-model="cssObj.fontSize">
            <template #append>
              px
            </template>
          </a-input>
        </div>
        <div class="row-item"><span class="row-item-title">行高</span>
          <a-input class="row-item-input" v-model="cssObj.lineHeight">
            <template #append>
              px
            </template>
          </a-input>
        </div>
      </div>
      <div class="row-container">
        <div class="title-container">字重</div>
        <div class="content-container">
          <a-select size="small" v-model="cssObj.fontWeight" style="width: 215px" allow-clear>
            <a-option value=100>100 Thin</a-option>
            <a-option value=200>200 Extra Light</a-option>
            <a-option value=300>300 Light</a-option>
            <a-option value=400>400 Normal</a-option>
            <a-option value=500>500 Medium</a-option>
            <a-option value=600>600 Semi Bold</a-option>
            <a-option value=700>700 Bold</a-option>
          </a-select>
        </div>
      </div>
    </a-collapse-item>
    <a-collapse-item :key="2" header="背景"/>
    <a-collapse-item :key="3" header="位置"/>
    <a-collapse-item :key="4" header="边框"/>
  </a-collapse>


</template>

<script lang="ts" setup>
import { ColorPicker } from "vue3-colorpicker";
import CustomIcon from "../CustomIcon.vue";
import {useEditorStore} from '../../../stores/editor/componentRender'
import {storeToRefs} from 'pinia'
import {nextTick, reactive, ref, watch} from "vue";
import {useBarStore} from '../../../stores/toolbar'

const editorStore = useEditorStore()
const barStore = useBarStore()
const {componentSelected} = storeToRefs(editorStore)
const {barPosition} = storeToRefs(barStore)
const icon = ref()
let cssObj = reactive<{
  display: string,
  marginTop: string,
  marginBottom: string,
  marginLeft: string,
  marginRight: string,
  paddingTop: string,
  paddingBottom: string,
  paddingLeft: string,
  paddingRight: string,
  width: number,
  height: number,
  fontWeight: number,
  color: string
}>({
  display: '',
  marginTop: '',
  marginBottom: '',
  marginLeft: '',
  marginRight: '',
  paddingTop: '',
  paddingBottom: '',
  paddingLeft: '',
  paddingRight: '',
  width: null,
  height: null,
  fontWeight: null,
  color: ''
})

let wh = reactive<{
  width: string,
  height: string,
}>({width: "0", height: "0"})

watch(cssObj, async (newCss) => {
  editorStore.updateCss(newCss)
  await nextTick()
  setTimeout(() => {
    editorStore.updateRefreshBorder()
  }, 100)

})
watch(componentSelected, (newComponent) => {

  let style = newComponent.style
  if (style) {
    Object.keys(cssObj).forEach(item => {
      if (style.hasOwnProperty(item)) {
        cssObj[item] = style[item]
      } else {
        cssObj[item] = ''
      }
    })
  }


})
watch(barPosition, async (newBarPosition) => {
  await nextTick()
  if (newBarPosition) {
    wh.height = newBarPosition.height + ''
    wh.width = newBarPosition.width + ''
  }

})

</script>

<style lang="scss" scoped>
.row-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 12px;
}

.title-container {
  width: 60px;
}

.content-container {
  flex-wrap: wrap;
}

:deep(.arco-collapse-item-content) {
  padding-left: 10px;
}

.layout-box-container {
  position: relative;
  width: 100%;
  height: 150px;
  user-select: none;
}

.margin-top-div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #d6e4ff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.margin-right-div {
  position: absolute;
  top: 5px;
  bottom: 5px;
  right: 0;
  width: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-right: 20px solid #d6e4ff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.margin-bottom-div {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #d6e4ff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.margin-left-div {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 0;
  width: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #d6e4ff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.mli {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -20px;
  margin: auto;
  width: 60px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  padding: 0 8px;
  border: none;
}

.mri {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -20px;
  margin: auto;
  width: 60px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  padding: 0 8px;
  border: none;
}

.mbi {
  text-align: center;
  line-height: 20px;
  height: 20px;
  padding: 0;
  border: none;
  top: -20px;
  z-index: 2;
  width: calc(100% - 90px);

}

.pbi {
  text-align: center;
  line-height: 20px;
  height: 20px;
  padding: 0;
  border: none;
  top: -20px;
  z-index: 2;
  width: calc(100% - 104px);

}

.pli {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 30px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  padding: 0 5px;
  border: none;
}

.pri {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 30px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  padding: 0 5px;
  border: none;
}

.padding-top-div {
  position: absolute;
  top: 25px;
  left: 25px;
  right: 25px;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #d6e4ff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.padding-right-div {
  position: absolute;
  top: 30px;
  bottom: 30px;
  right: 25px;
  width: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-right: 20px solid #d6e4ff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.padding-bottom-div {
  position: absolute;
  bottom: 25px;
  left: 25px;
  right: 25px;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #d6e4ff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;

}

.padding-left-div {
  position: absolute;
  top: 30px;
  bottom: 30px;
  left: 25px;
  width: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #d6e4ff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.margin-top-div .next-input.next-medium {
  position: absolute;
  left: 0;
  right: 0;
  top: -20px;
  height: 20px !important;
  background: transparent;
  width: 100%;
}

.margin-right-div .next-input.next-medium {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -20px;
  width: 20px;
  margin: auto;
  background: transparent;
}

.margin-bottom-div .next-input.next-medium {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
  height: 20px !important;
  background: transparent;
}

.margin-left-div .next-input.next-medium {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -20px;
  width: 20px;
  margin: auto;
  background: transparent;
}

.padding-top-div .next-input.next-medium {
  position: absolute;
  left: 0;
  right: 0;
  top: -20px;
  height: 20px !important;
  background: transparent;
  width: 100%;
}

.padding-right-div .next-input.next-medium {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -25px;
  width: 20px;
  margin: auto;
  background: transparent;
}

.padding-bottom-div .next-input.next-medium {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
  height: 20px !important;
  background: transparent;
  width: 100%;
}

.padding-left-div .next-input.next-medium {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -25px;
  width: 20px;
  margin: auto;
  background: transparent;
}

:deep(.arco-input-wrapper) {
  background-color: transparent;
  height: 20px;
}

:deep(.arco-input-wrapper .arco-input.arco-input-size-mini) {
  text-align: center;
}

:deep(.arco-input-wrapper .arco-input-focus) {
}
:deep(.arco-collapse-item-content){
  background-color: white;
}

.row-item {
  width: 50%;
}

.row-item-input {
  width: calc(100% - 30px);
  margin-left: 5px;
  border: none;
}

.layout-box-container .help-txt {
  float: left;
  margin-left: -10px;
  transform: scale(.75);
  z-index: 1;
  color: slategrey;
}

</style>
