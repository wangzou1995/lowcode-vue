// 引入定义store函数
import {defineStore} from 'pinia'


export const useGlobalContextStore = defineStore('global', {
    state: () => {
        return {
            // 窗口高度
            windowHeight: -1,
            // 物料是否拖拽中
            dragging: false,
            preview: false,
        }
    },
    actions: {
        /**
         * 更新窗口高度
         * @param height 窗口高度
         */
        updateWindowHeight(height: number) {
            this.windowHeight = height;
        },
        /**
         * 更新拖拽状态
         * @param drag
         */
        updateDragStatus(drag: boolean) {
            this.dragging = drag;
        },
        /**
         * 更新预览状态
         * @param preview
         */
        updatePreview(preview: boolean) {
            this.preview = preview;
        }
    },
    getters: {}

})
