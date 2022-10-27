// 引入定义store函数
import {defineStore} from 'pinia'
import {Component} from "./types";


const ComponentMaterial: Component [] = [

    {
        id: 'ak2',
        name: '按钮',
        tag: 'a-button',
        code: 'aButton',
        isContainer: false,
        slots: [
            {
                type: 'component',
                name: 'icon',
                value: 'icon-delete',
                props: {
                    strokeWidth: 4
                }
            }, {
                type: 'text',
                name: 'default',
                value: 'Delete',
                props: {
                    strokeWidth: 10
                }
            }],
        props: {
            type: 'primary',
            long: true
        },
        events: {
            onclick: {
                // 方法参数
                args: ['ev'],
                // 方法属性
                script: 'console.log(ev);console.log(this)'
            }
        }
    },
    {
        id: 'ak3',
        name: '输入框',
        tag: 'a-input',
        code: 'aInput',
        isContainer: false,
        slots: [
            {
                type: 'component',
                name: 'prefix',
                value: 'icon-user',
            }, {
                type: 'text',
                name: 'append',
                value: 'RMB'
            }],
        props: {
            defaultValue: '123',
            style: {border: '1px red solid'}
        }
    },
    {
        id: 'ak5',
        name: 'Form表单',
        tag: 'a-form',
        code: 'aForm',
        isContainer: true,
        props: {
            layout: 'inline'
        },
        style: {
            border: '1px solid red'
        },
        children: []
    },
    {
        id: 'ak51',
        name: 'Row',
        tag: 'a-row',
        code: 'aRow',
        isContainer: true,
        props: {},
        style: {
            border: '1px solid blue'
        },
        children: []
    },
    {
        id: 'ak51',
        name: 'Col',
        tag: 'a-col',
        code: 'aCol',
        isContainer: true,
        props: {
            span: 12
        },
        style: {
            border: '1px solid black'
        },
        children: []
    },
    {

        id: 'ak6',
        name: 'FormItem表单',
        tag: 'a-form-item',
        code: 'aFormItem',
        isContainer: true,
        props: {
            field: 'name',
            label: 'Username',
        },
        children: []
    },

]

const ComponentPage: Component [] = [];

const ComponentPageDataList: Component [] = []
export const userComponentStore = defineStore('component', {
    state: () => {
        return {
            ComponentMaterial: ComponentMaterial,
            ComponentPage: ComponentPage,
        }
    },
    actions: {
        add(data: any) {
            this.ComponentMaterial.push(data)
        },
        /**
         * 更新数据
         * @param component
         */
        updateComponentPageByComponentData(component: Component) {

        }
    },
    getters: {}

})
