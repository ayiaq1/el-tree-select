## 基于element-ui 2.x扩展下拉带树的组件 下拉树状菜单

###
![Image text](https://github.com/ayiaq1/el-tree-select/raw/master/DEMO.jpg)

### API：

#### 特殊点(屏蔽el-select、el-tree的几个参数)：

##### el-select取消参数:
```
:popper-append-to-body="false" 设定下拉框的弹出框隐藏
:filterable="false"            搜索从弹出框里面执行
```
##### el-tree取消参数：
```
:show-checkbox="selectParams.multiple"  使用下拉框参数multiple 判断是否对树进行多项 取消对el-tree的人为传参show-checkbox
:node-key="propsValue"  自动获取treeParams.props.value
:draggable="false"      屏蔽拖动
```
#### 支持的参数：

#### el-select参数：
```
selectParams  :     支持el-select 相关参数

增加参数：
selectParams.styles 对el-select设置style,类型:Object
```
#### el-tree参数：
```
treeParams  :     支持el-tree 相关参数
```
#### 搜索框参数：
```
treeParams.filterable   Boolean 考虑是显示在弹出框内的，因此放到treeParams参数内
```
###  事件:

###### select-clear
```
select-clear 下拉框清空事件   this.$emit('select-clear');
```
###### node-click
```
树点击,和el-tree参数一致:this.$emit('node-click', data, node, vm);
```
###### searchFun  参数: keywords
```
searchFun(value){
    // 如果是本地过滤：
    this.$refs.treeSelect.$refs.tree.filter(value);
    // 可以直接访问方法，也可以拿到 $refs.tree
    this.$refs.treeSelect.filterFun(val);
    // 如果是请求后台：
    this.post(url,postobj:{
        keywords:value
    },response=>{
        this.$refs.treeSelect.updateFun(response.data);
    });
}
```
###### filterFun  参数: 本地过滤树
```
this.$refs.treeSelect.filterFun(val);
```
### 更新日志
    3.0.6 增加对el-select设置style
    3.0.5 提取dom.js精简，缩小体积
    3.0.4 修复搜索框焦点隐藏弹出框问题
    3.0.3 增加disabled，打包压缩
    3.0.2 增加容错判断
    3.0.1 修复IE9以上兼容性
    3.0.0 全新api，支持el-tree,el-select相关参数
    2.0.6:增加搜索栏隐藏参数,从业务上考虑clickParent=true隐藏父级，展开搜索只在三角箭头点击
    2.0.5:demo增加子节点测试数据
    2.0.4:清空选择增加事件clearFun
    2.0.3:新增清空选择，clearable默认为true
    2.0.2:优化：默认clickParent=true,取消箭头图标点击事件使用input默认点击
    2.0.0:修复IE兼容性，修复打包有压缩警告问题，剥离element-ui，可作为独立插件使用
    1.6.5:有压缩不成功的警告(webpack配置压缩对element-ui下的request不生效)
    1.6.0:修复element-ui打包会有压缩不成功的警告，锁定package.json的vue,element-ui版本
    1.5.0:修复element-ui更新之后不显示插件的问题
    1.4.9:demo的名称导入错误修改
    1.4.8:修复部分代码打包没有压缩问题
    1.4.7:props.id改为props.value
    1.4.6:修复clickParent=true之后点击父级关闭下拉问题，补全API：disabled
    1.4.5:修改webpack配置，打包css忽略z-index
    1.4.4:增加CSS样式
    1.4.3:增加clickParent，判断树菜单点击是否支持直接点击父级

### DEMO

#### div
```
    <ELTreeSelect
        ref="treeSelect"
        v-model="ids"
        :selectParams="selectParams"
        :treeParams="elTreeParams"
        @node-click="fun"
        @select-clear="fun"
        @searchFun="fun"
    />
```
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

