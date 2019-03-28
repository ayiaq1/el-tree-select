/*
 * @moduleName:
 * @Author: dawdler
 * @LastModifiedBy: dawdler
 * @Date: 2019-03-27 15:07:32
 * @LastEditTime: 2019-03-28 14:23:23
 */
import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import Vue from 'vue';
// 导入组件库
import ElementUI from 'element-ui';
import ElTreeSelect from '../components/src/ElTreeSelect.vue';
import 'element-ui/lib/theme-chalk/index.css';
// 注册组件库
Vue.use(ElementUI, {
  size: 'small'
});
storiesOf('ref调整数据', module)
  .addDecorator(withKnobs)
  .add('通过ref传参数', () => ({
    components: { ElTreeSelect },
    template:
      '<ElTreeSelect v-model="values" :styles="styles" :selectParams="selectParams" :treeParams="treeParams" ref="treeSelect"></ElTreeSelect>',
    data() {
      return {
        styles: {
          width: '300px'
        },
        values: [],
        selectParams: {
          multiple: true,
          clearable: true,
          placeholder: '请输入内容'
        },
        treeParams: {
          clickParent: false,
          filterable: true,
          'check-strictly': true,
          'default-expand-all': true,
          'expand-on-click-node': false,
          'render-content': this._renderFun,
          data: [],
          props: {
            children: 'child',
            label: 'name',
            disabled: 'disabled',
            value: 'testId'
          }
        }
      };
    }
  }));
