## 基于element-ui 2.x扩展下拉带树的组件 下拉树状菜单
```
### 属性：

#### 特殊点(屏蔽el-select、el-tree的几个参数)：

##### el-select取消参数:
:popper-append-to-body="false" 设定下拉框的弹出框隐藏
:filterable="false"            搜索从弹出框里面执行

##### el-tree取消参数：
:show-checkbox="selectParams.multiple"  使用下拉框参数multiple 判断是否对树进行多项 取消对el-tree的人为传参show-checkbox
:node-key="propsValue"  自动获取treeParams.props.value
:draggable="false"      屏蔽拖动

#### el-select参数：
selectParams  :     支持el-select 相关参数

#### el-tree参数：
treeParams  :     支持el-tree 相关参数

#### 搜索框参数：
treeParams.filterable   Boolean 考虑是显示在弹出框内的，因此放到treeParams参数内

######  事件:    

###### select-clear
select-clear 下拉框清空事件   this.$emit('select-clear');

###### node-click
树点击,和el-tree参数一致:this.$emit('node-click', data, node, vm);

###### searchFun  
如果是本地过滤：
this.$refs.treeSelect.$refs.tree.filter(value);
如果是请求后台：
this.post(xxxx,response=>{
    this.$refs.treeSelect.updateFun(response.data);
});
```
### 更新日志
    3.0.0 全新api
### DEMO
#### div
    <ELTreeSelect
        ref="treeSelect"
        v-model="ids"
        :selectParams="selectParams"
        :treeParams="elTreeParams"
        @node-click="fun"
        @select-clear="fun"
        @searchFun="fun"
    />


#### script
```
import ELTreeSelect from 'el-tree-select';
export default {
    data() {
        return {
            values: ['3'],
            selectParams: {
                'multiple': true,
                'clearable': true,
                'placeholder': '请输入内容'
            },
            treeParams: {
                'default-expand-all': true,
                'filterable': true,
                'check-strictly': true,
                'render-content': this._renderFun,
                'data': [{
                    flowId: '1', name: '哎哎哎',
                    children: [{ flowId: '3', name: '啊啊啊啊' }]
                },
                {
                    flowId: '2',
                    name: '发生的'
                }],
                'props': {
                    children: 'children',
                    label: 'name',
                    value: 'flowId'
                }
            }
        }
    },
},
components: {ELTreeSelect}
};
```
## 安装

npm install el-tree-select --save

## git地址
https://github.com/ayiaq1/el-tree-select

