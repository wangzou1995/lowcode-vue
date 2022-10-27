// 引入定义store函数
import {defineStore} from 'pinia'
import arco from './arco.json'


export const useMaterialStore = defineStore('material', {
    state: () => {
        return {
            // 物料数据
            materialType: 'arco',
            // 选中的图标
            currentMenu: 'component',
            fixed: true
        }
    },
    actions: {
        /**
         * 设置当前选中的菜单图标
         * @param type 菜单图标
         */
        setCurrentMenu(type: string) {
            if (type === this.currentMenu) {
                this.currentMenu = ''
            } else {
                this.currentMenu = type
            }
        },
        /**
         * 清楚当前选中的菜单和是否固定位置
         */
        clearCurrentMenu() {
            this.currentMenu = ''
        },
        updateFixed() {
            this.fixed = !this.fixed
        }
    },
    getters: {
        /**
         * 通过类型获取物料数据
         */
        getMaterialByType(): any {
            switch (this.materialType) {
                case 'arco':
                    return arco;
                default:
                    return [];
            }
        },
    }

})
