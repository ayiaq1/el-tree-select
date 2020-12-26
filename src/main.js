/*
 * @moduleName:
 * @Author: dawdler
 * @LastModifiedBy: dawdler
 * @Date: 2019-03-22 14:47:35
 * @LastEditTime: 2020-12-26 11:47:35
 */
import Vue from 'vue';
import App from './App';
// 导入组件库
import ElementUI from 'element-ui';
import ElTreeSelect from './components/src/ElTreeSelect';
import 'element-ui/lib/theme-chalk/index.css';
// 注册组件库
Vue.use(ElementUI, {
    size: 'small'
});
Vue.component(ElTreeSelect.name, ElTreeSelect);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');
