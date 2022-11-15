/**
 * 设置器设置
 */
export interface SetterConfig {
    // if *string* passed must be a registered Setter Name
    /**
     * 配置设置器用哪一个 setter
     */
    componentName: string ;
    /**
     * 传递给 setter 的属性
     *
     * the props pass to Setter Component
     */
    props?: Record<string, unknown> | DynamicProps;
    /**
     * @deprecated
     */
    children?: any;
    /**
     * 是否必填？
     *
     * ArraySetter 里有个快捷预览，可以在不打开面板的情况下直接编辑
     */
    isRequired?: boolean;
    /**
     * Setter 的初始值
     *
     * @todo initialValue 可能要和 defaultValue 二选一
     */
    initialValue?: any | ((target: SettingTarget) => any);
    // for MixedSetter
    /**
     * 给 MixedSetter 时切换 Setter 展示用的
     */
    title?: TitleContent;
    // for MixedSetter check this is available
    /**
     * 给 MixedSetter 用于判断优先选中哪个
     */
    condition?: (target: SettingTarget) => boolean;

    // 标识是否为动态setter，默认为true
    isDynamic?: boolean;
}
