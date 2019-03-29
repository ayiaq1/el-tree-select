/*
 * @moduleName:
 * @Author: dawdler
 * @LastModifiedBy: dawdler
 * @Date: 2019-03-27 15:07:32
 * @LastEditTime: 2019-03-29 14:29:35
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
    template: `
      <el-row>
          <el-col :span="6">
            <ElTreeSelect v-model="values" :styles="styles" :selectParams="selectParams" :treeParams="treeParams" ref="treeSelect" @searchFun="_searchFun"></ElTreeSelect>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="_changeDataFun">通过ref修改下拉树数据</el-button>
          </el-col>
          <el-col :span="6">
          当前选中数据ID：{{values}}
          </el-col>
      </el-row>
      `,
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
          data: [
            {
              name: '节点',
              id: '11',
              child: [
                {
                  name: 'XXX子节点',
                  id: '22'
                }
              ]
            }
          ],
          props: {
            children: 'child',
            label: 'name',
            disabled: 'disabled',
            value: 'id'
          }
        }
      };
    },
    methods: {
      _changeDataFun() {
        const data = [
          {
            name: '新增节点',
            id: '1',
            child: [
              {
                name: '新增XXX子节点',
                id: '2'
              }
            ]
          }
        ];
        this.values = [];
        this.$refs.treeSelect.treeDataUpdateFun(data);
      },
      _searchFun(val) {
          this.$refs.treeSelect.filterFun(val);
      }
    }
  }));
