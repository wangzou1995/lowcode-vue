/**
 * 组件数据定义
 */
export interface Component {
    // 唯一id
    id: string,
    // 真实标签
    tag: string,
    // 名称
    name: string,
    // 编码
    code: string,
    // 该组件的属性配置
    props: { [key: string]: any },
    // 该组件的时间配置
    events?: { [key: string]: any },
    // 样式对象
    style?: { [key: string]: any },
    // 该组件是否为容器类型组件
    isContainer?: boolean,
    // 容器内允许拖入的元素列表tags,
    filter?: string [],
    // 子元素列表
    children?: Component [],
    // 插槽列表
    slots?: Slot [],
    // 如果是容器需需配置最小高度
    _drag_minHeight?: string,
    // 编辑器辅助样式
    _editor_auxiliary_style?:  { [key: string]: any },
}

/**
 * 插槽数据定义
 */
export interface Slot {
    // 类型
    type: 'text' | 'component',
    // 名称
    name: string,
    // 属性
    props?: { [key: string]: any },
    // 属性
    value: any;
    // 描述
    desc?: string
}

export interface Material {
    // 物料类型名称
    name: string,
    // 物料列表
    components: Component []
}
