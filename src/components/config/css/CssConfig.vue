<template>
  <a-collapse :default-active-key="[0,1,2,3,4]" style="background-color: white">
    <a-collapse-item :key="0" header="布局">
      <div class="row-container">
        <div :class="cssObj.display? 'title-container-active': 'title-container'">布局模式</div>
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
      <div class="row-container">
        <div :class="cssObj.color? 'title-container-active': 'title-container'">文字颜色</div>
        <div class="content-container">
          <a-input size="small" v-model="cssObj.color" style="width: 215px" allow-clear>
            <template #append>
              <color-picker picker-type="chrome" shape="circle" format="#RRGGBB" v-model:pure-color="cssObj.color"/>
            </template>
          </a-input>
        </div>
      </div>
      <div class="row-container">
        <div :class="cssObj.textAlign? 'title-container-active': 'title-container'">对齐方式</div>
        <div class="content-container">
          <a-radio-group type="button" size="mini" v-model="cssObj.textAlign">
            <a-radio value="left">
              <a-popover content="左对齐 left">
                <CustomIcon type="icon-zuoduiqi" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio value="center">
              <a-popover content="居中对齐 center">
                <CustomIcon type="icon-juzhongduiqi" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio value="right">
              <a-popover content="右对齐 right">
                <CustomIcon type="icon-youduiqi" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio value="justify">
              <a-popover content="两端对齐 justify">
                <CustomIcon type="icon-liangduanduiqi" :size="16"/>
              </a-popover>
            </a-radio>
          </a-radio-group>
        </div>
      </div>
      <div class="row-container">
        <div :class="cssObj.opacity? 'title-container-active': 'title-container'">透明度</div>
        <div class="content-container">
          <a-slider :max="1" :step="0.01" style="width: 215px" v-model="cssObj.opacity" show-input/>
        </div>
      </div>
    </a-collapse-item>
    <a-collapse-item :key="2" header="背景"/>
    <a-collapse-item :key="3" header="位置">
      <div class="row-container">
        <div :class="cssObj.position? 'title-container-active': 'title-container'">定位类型</div>
        <div class="content-container">
          <a-select size="small" v-model="cssObj.position" style="width: 215px" allow-clear>
            <a-option value='static'>static</a-option>
            <a-option value='relative'>relative</a-option>
            <a-option value='absolute'>absolute</a-option>
            <a-option value='fixed'>fixed</a-option>
            <a-option value='sticky'>sticky</a-option>
          </a-select>
        </div>
      </div>
      <div v-show="cssObj.position && cssObj.position !== 'static'">
        <div class="layout-box-container">
          <div class="top-div">
          <span class="next-input next-medium next-noborder">
            <a-input class="ti" v-model="cssObj.top"
                     :max-length="3" placeholder="auto" size="mini" style="border: none">
            </a-input>
          </span>
          </div>
          <div class="right-div">   <span class="next-input next-medium next-noborder">
            <a-input class="ri" v-model="cssObj.right" :max-length="3" placeholder="auto" size="mini"/>
          </span></div>
          <div class="bottom-div">   <span class="next-input next-medium next-noborder">
            <a-input class="bi" v-model="cssObj.bottom" :max-length="3" placeholder="auto" size="mini"/>
          </span></div>
          <div class="left-div">   <span class="next-input next-medium next-noborder">
            <a-input class="li" v-model="cssObj.left" :max-length="3" placeholder="auto" size="mini"/>
          </span></div>
        </div>
      </div>
      <div class="row-container">
        <div :class="cssObj.zIndex? 'title-container-active': 'title-container'">层叠顺序</div>
        <div class="content-container">
          <a-input-number size="small" v-model="cssObj.zIndex" style="width: 215px" allow-clear>
          </a-input-number>
        </div>
      </div>
      <div class="row-container">
        <div :class="cssObj.float? 'title-container-active': 'title-container'">浮动方向</div>
        <div class="content-container">
          <a-radio-group type="button" size="mini" v-model="cssObj.float">
            <a-radio value="none">
              <a-popover content="不浮动 None">
                <CustomIcon type="icon-None" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio value="left">
              <a-popover content="左浮动 left">
                <CustomIcon type="icon-zuocefudong" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio value="right">
              <a-popover content="右浮动 right">
                <CustomIcon type="icon-youcefudong" :size="16"/>
              </a-popover>
            </a-radio>
          </a-radio-group>
        </div>
      </div>
      <div class="row-container">
        <div :class="cssObj.clear? 'title-container-active': 'title-container'">清除</div>
        <div class="content-container">
          <a-radio-group type="button" size="mini" v-model="cssObj.clear">
            <a-radio value="none">
              <a-popover content="不清除 None">
                <CustomIcon type="icon-None" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio value="left">
              <a-popover content="左清除 left">
                <CustomIcon type="icon-qingchuzuoce" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio value="right">
              <a-popover content="右清除 right">
                <CustomIcon type="icon-qingchuyouce" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio value="both">
              <a-popover content="两边清除 both">
                <CustomIcon type="icon-qingchuliangce" :size="16"/>
              </a-popover>
            </a-radio>

          </a-radio-group>
        </div>
      </div>
    </a-collapse-item>
    <a-collapse-item :key="4" header="边框">
      <div class="row-container">
        <div :class="borderCustom? 'title-container-active': 'title-container'">圆角</div>
        <div class="content-container">
          <a-radio-group type="button" size="mini" v-model="borderCustom">
            <a-radio :value="false">
              <a-popover content="固定圆角">
                <CustomIcon type="icon-yuanjiaofangkuang" :size="16"/>
              </a-popover>
            </a-radio>
            <a-radio :value="true">
              <a-popover content="分别定义">
                <CustomIcon type="icon-yuanjiao" :size="16"/>
              </a-popover>
            </a-radio>
          </a-radio-group>
        </div>
      </div>
      <div class="row-container">
        <div :class="borderCustom? 'title-container-active': 'title-container'"></div>
        <div class="content-container">
          <a-slider style="width: 215px" :step="1" :min="0" :max="50" v-show="borderCustom" v-model="cssObj.borderRadius" show-input/>
          <div  v-show="!borderCustom">
           <a-row :gutter="12">
             <a-col :span="2" style="line-height: 30px">
               <CustomIcon type="icon--zuoshangjiao" :size="16"/>
             </a-col>
             <a-col :span="8">
               <a-input-number  size="small" v-model="cssObj.borderTopLeftRadius"  ></a-input-number>
             </a-col>
             <a-col :span="2" style="line-height: 30px">
               <CustomIcon type="icon--youshangjiao" :size="16"/>
             </a-col>
             <a-col :span="8">
               <a-input-number v-model="cssObj.borderTopRightRadius"  size="small" ></a-input-number>
             </a-col>
           </a-row>
            <a-row :gutter="12">
              <a-col :span="2" style="line-height: 30px">
                <CustomIcon type="icon--zuoxiajiao" :size="16"/>
              </a-col>
              <a-col :span="8">
                <a-input-number  size="small" v-model="cssObj.borderBottomLeftRadius" ></a-input-number>
              </a-col>
              <a-col :span="2" style="line-height: 30px">
                <CustomIcon type="icon--youxiajiao" :size="16"/>
              </a-col>
              <a-col :span="8">
                <a-input-number v-model="cssObj.borderBottomRightRadius"  size="small" ></a-input-number>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
      <div class="row-container">
        <div :class="borderCustom? 'title-container-active': 'title-container'">边框</div>
        <div class="content-container">
          <div>

          </div>
          <div>

          </div>
        </div>
      </div>
    </a-collapse-item>
  </a-collapse>

</template>

<script lang="ts" setup>
import CustomIcon from "../CustomIcon.vue";
import {useEditorStore} from '../../../stores/editor/componentRender'
import {storeToRefs} from 'pinia'
import {nextTick, reactive, ref, watch} from "vue";
import {useBarStore} from '../../../stores/toolbar'
import CssEditor from "./CssEditor.vue";

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
  color: string,
  textAlign: string,
  opacity: number,
  position: string,
  left: number,
  right: number,
  top: number,
  bottom: number,
  clear: string,
  zIndex: number,
  float: string,
  borderRadius: number,
  borderTopLeftRadius: number,
  borderTopRightRadius: number,
  borderBottomLeftRadius: number,
  borderBottomRightRadius: number,
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
  color: '',
  textAlign: '',
  opacity: 1,
  position: '',
  left: null,
  right: null,
  bottom: null,
  top: null,
  clear: '',
  zIndex: null,
  float: '',
  borderRadius: null,
  borderTopLeftRadius: null,
  borderTopRightRadius: null,
  borderBottomLeftRadius: null,
  borderBottomRightRadius: null,
})

let wh = reactive<{
  width: string,
  height: string,
}>({width: "0", height: "0"})

let borderCustom = ref(false)

let showCssCode = ref(false)
const onShowCssCode = () => {
  showCssCode.value = true
}
const handleOk = () => {
  showCssCode.value = true
}
const handleCancel = () => {
  showCssCode.value = false
}

watch(cssObj, async (newCss) => {
  editorStore.updateCss(newCss)
  borderCustom.value = Boolean(cssObj.borderRadius);
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
        cssObj[item] = null
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
  font-size: 12px;
}

.title-container-active {
  width: 60px;
  color: #5584ff;
  font-size: 12px;
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


.top-div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-top: 30px solid #d6e4ff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.right-div {
  position: absolute;
  top: 5px;
  bottom: 5px;
  right: 0;
  width: 0;
  border-top: 30px solid transparent;
  border-bottom: 30px solid transparent;
  border-right: 30px solid #d6e4ff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.bottom-div {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 30px solid #d6e4ff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.left-div {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 0;
  width: 0;
  border-top: 30px solid transparent;
  border-bottom: 30px solid transparent;
  border-left: 30px solid #d6e4ff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.li {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -15px;
  margin: auto;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 0 8px;
  border: none;
}

.ri {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -45px;
  margin: auto;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 0 8px;
  border: none;
}

.bi {
  position: absolute;
  text-align: center;
  line-height: 30px;
  height: 30px;
  padding: 0;
  border: none;
  z-index: 2;
  top: 5px;
  width: calc(100% - 90px);
  left: 45px
}

.ti {
  position: absolute;
  text-align: center;
  line-height: 30px;
  height: 30px;
  padding: 0;
  border: none;
  z-index: 2;
  top: -25px;
  width: calc(100% - 90px);
  left: 45px
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

.layout-box-container :deep(.arco-input-wrapper) {
  background-color: transparent;
  height: 20px;
}

:deep(.arco-input-wrapper .arco-input.arco-input-size-mini) {
  text-align: center;
}


:deep(.arco-collapse-item-content) {
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
