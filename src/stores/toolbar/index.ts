// 引入定义store函数
import {defineStore} from 'pinia'


export const useBarStore = defineStore('toolbar', {
    state: () => {
        return {
            barPosition: {
                width: '0px', height: '0px', top: '-99999', left: '-99999', fixed: true
            }
        }
    },
    actions: {
        /**
         * 设置bar位置
         * @param position 菜单图标
         */
        setBarPosition(position: any) {
            this.barPosition = position;
        }
    },
    getters: {}

})
