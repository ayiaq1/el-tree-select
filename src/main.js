/*
 * @moduleName:
 * @Author: dawdler
 * @LastModifiedBy: dawdler
 * @Date: 2019-03-22 14:47:35
 * @LastEditTime: 2020-03-13 15:51:15
 */
import Vue from 'vue';
import App from './App';
// 导入组件库
import ElementUI from 'element-ui';
import ElTreeSelect from './components/index';
import 'element-ui/lib/theme-chalk/index.css';
// 注册组件库
Vue.use(ElementUI, {
    size: 'small'
});

Vue.use(ElTreeSelect);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');
