/*
 * @moduleName:
 * @Author: dawdler
 * @LastModifiedBy: dawdler
 * @Date: 2019-03-22 14:57:21
 * @LastEditTime: 2019-03-25 14:48:43
 */
import ElTreeSelect from './ElTreeSelect.vue';
// 为组件添加 install 方法，用于按需引入
ElTreeSelect.install = function(Vue) {
    Vue.component(ElTreeSelect.name, ElTreeSelect);
};
export default ElTreeSelect;
