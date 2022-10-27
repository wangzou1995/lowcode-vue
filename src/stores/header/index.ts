// 引入定义store函数
import {defineStore} from 'pinia'



export const useHeaderStore = defineStore('header', {
    state: () => {
        return {
            type: 1,
            width: '100%'
        }
    },
    actions: {
        updatePcType(type: number) {
            this.type = type
        },
        updateEditorWidth(width: string) {
            this.width = width
        }
    },
    getters: {}

})
