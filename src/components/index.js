/*
 * @moduleName:
 * @Author: dawdler
 * @LastModifiedBy: dawdler
 * @Date: 2019-03-22 14:57:21
 * @LastEditTime: 2019-03-25 13:45:41
 */
import ElTreeSelect from './src/index.js';
const Components = [ElTreeSelect];

// 定义 install 方法
const install = function(Vue) {
    if (install.installed) return;
    install.installed = true;
    // 遍历并注册全局组件
    Components.forEach(component => {
        Vue.component(component.name, component);
    });
};
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    // 导出的对象必须具备一个 install 方法
    install,
    // 组件列表
    ...Components
};
