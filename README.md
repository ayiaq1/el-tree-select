<!--
 * @moduleName: 基于element-ui 2.x扩展下拉带树的组件 下拉树状菜单
 * @Author: dawdler
 * @Date: 2018-12-19 14:03:03
 * @LastModifiedBy: dawdler
 * @LastEditTime: 2021-07-29 14:12:05
 -->

## 基于 element-ui 2.x 扩展下拉带树的组件 下拉树状菜单

### Demo

##### <a href="https://ayiaq1.github.io/el-tree-select/website/#/components/ElTreeSelect" target="_blank">在线 API</a>

##### <a href="https://ayiaq1.github.io/el-tree-select/storybook-static" target="_blank">在线测试</a>

###

![Image text](https://github.com/ayiaq1/el-tree-select/raw/master/DEMO.jpg)

### 如果本地启动 API 需要全局安装：npm install -g @vuese/cli

### 需在 main.js 注册组件：

```
import ElTreeSelect from 'el-tree-select';
vue.use(ElTreeSelect);
内部直接使用 :  <el-tree-select v-model="id"/>
```

### API：

#### 特殊点(屏蔽 el-select、el-tree 的几个参数)：

##### el-select 取消参数:

```
multiple                       改为内置，通过v-model类型判断是否多选
:filterable="false"            搜索从弹出框里面执行
```

##### el-tree 取消参数：

```
:show-checkbox="selectParams.multiple"  使用下拉框参数multiple 判断是否对树进行多项 取消对el-tree的人为传参show-checkbox
:node-key="propsValue"  自动获取treeParams.props.value
:draggable="false"      屏蔽拖动
```

#### 支持的参数：

#### el-select 参数：

```
selectParams  :     支持el-select 相关参数

#### styles参数：
styles 对el-select设置style,类型:Object

#### selectClass参数：
selectClass  对el-select设置class,类型:String
```

#### el-tree 参数：

```
treeParams  :     支持el-tree 相关参数
增加：'clickParent'
treeParams.clickParent 类型：Boolean 默认：false
在selectParams.multiple=false单选情况下点击节点，判断是否关闭弹出框
clickParent: true 允许点击父级关闭弹出框 false 只能点击子级关闭弹出框
```

#### popover 参数：

```
popperClass  对应：popper-class,类型:String
```

#### 搜索框参数：

```
treeParams.filterable   Boolean 考虑是显示在弹出框内的，因此放到treeParams参数内
```

### 事件:

###### filter-node-method

```
filter-node-method 自定义过滤方式
```

###### select-clear

```
select-clear 下拉框清空事件   this.$emit('select-clear');
```

###### removeTag

```
removeTag 移除单个标签，返回所有勾选的ids，以及当前移除的tag（可能为中文）标签   this.$emit('removeTag',ids,tag);
```

###### node-click

```
树点击,和el-tree参数一致: this.$emit('node-click', data, node, vm);
```

###### check

```
勾选触发,和el-tree参数一致: this.$emit('check',data, node, vm);
```

###### treeDataUpdateFun

```
treeDataUpdateFun 树更新数据

this.post(url,postobj,response=>{
    this.$refs.treeSelect.treeDataUpdateFun(response.data);
});
```

###### searchFun 参数: keywords

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
        this.$refs.treeSelect.treeDataUpdateFun(response.data);
    });
}
```

###### filterFun 参数: 本地过滤树

```
this.$refs.treeSelect.filterFun(val);
```

### 更新日志
    3.1.14 package.json增加BSD协议，合并提交 [暴露 el-popover 的 transition 属性]https://github.com/ayiaq1/el-tree-select/pull/72
    3.1.13 
          1.增加demo调试。
          2.处理clickParent点击父节点判断问题。
          3.打包优化，不再强制打包vue,element-ui。（要求项目必须引入element-ui）
    3.1.12 增加参数：子叶节点返回过滤(treeParams->leafOnly, includeHalfChecked)
    3.1.11 增加参数：filter-node-method
    3.1.10 修复bug:多选下如果父子节点全选，el-tag单一节点取消失败。
    3.1.9 锁定element-ui最终版本2.13.2。修复bug:多选下如果父子节点全选，el-tag单一节点取消失败。
    3.1.8 增加popover获取鼠标对象的多浏览器兼容性判断
    3.1.7 处理popover隐藏时判断当前对象报错问题
    3.1.4  去掉selectParams.multiple参数，改为内置，由v-model判断类型,v-model增加Number类型
    3.1.3  扩展，支持下拉框和popover挂类,修复了文档说明bug
    3.1.2  扩展，支持挂类
    3.1.1  默认v-model增加兼容性判断
    3.1.0  升级为vue-cli3，添加部分测试，添加api文档
    3.0.16 修复disabled还能点击的问题
    3.0.15 增加disabled参数判断
    3.0.15 增加treeParams.clickParent参数,默认false,只允许点击子级关闭弹出框
    3.0.13
        1.增加判断multiple,如果多选，点击父级不关闭弹出框
        2.修复点击节点没有切换多选问题
        3.修复多选时下拉框没有更新位置问题
        4.优化代码
    3.0.12 修复文本框修改宽度之后，下拉框不一致
    3.0.11 修复子节点名称不为children时，tag勾选联动问题
    3.0.10 修复单选状态下清空报错问题，优化逻辑判断
    3.0.9 增加树check方法，修复select多选移除时树没有联动取消勾选问题
    3.0.8 修复treeDataUpdateFun更新数据时，单选没有赋值问题
    3.0.7 修复v-model问题
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

### DEMO (App.vue)

```
<template>
    <div id="app">
        <el-tree-select :styles="styles" v-model="values" :selectParams="selectParams" :treeParams="treeParams" :treeRenderFun="_renderFun" @searchFun="_searchFun" @node-click="_nodeClickFun" ref="treeSelect"/>
        <el-select multiple v-model="test" placeholder="请选择" @change="_selectChange">
            <el-option v-for="item in treeParams.data" :key="item.testId" :label="item.name" :value="item.testId"></el-option>
        </el-select>
    </div>
</template>
<style>
#app {
    display: flex;
    justify-content: space-between;
    width: 600px;
}
</style>
<script>
export default {
    name: 'App',
    data() {
        return {
            styles: {
                width: '300px'
            },
            test: '',
            values: ['11111'],
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
                data: [],
                props: {
                    children: 'child',
                    label: 'name',
                    disabled: 'disabled',
                    value: 'testId'
                }
            }
        };
    },
    mounted() {
        let data = [
            {
                testId: '1',
                name: '节点1',
                disabled: true,
                child: [
                    {
                        testId: '11111',
                        name: '子节点'
                    }
                ]
            },
            {
                testId: '2',
                name: '节点2',
                child: [
                    {
                        testId: '222222',
                        disabled: true,
                        name: '子节点'
                    }
                ]
            },
            {
                testId: '3',
                name: '节点3'
            },
            {
                testId: '4',
                name: '节点4'
            },
            {
                testId: '5',
                name: '节点5'
            },
            {
                testId: '6',
                name: '节点6'
            }
        ];
        this.treeParams.data = data;
        this.$refs.treeSelect.treeDataUpdateFun(data);
    },
    methods: {
        // 下拉框修改
        _selectChange(val) {
            console.log(val, '<-select change');
        },
        // 树点击
        _nodeClickFun(data, node, vm) {
            console.log('this _nodeClickFun', this.values, data, node);
        },
        // 树过滤
        _searchFun(value) {
            console.log(value, '<--_searchFun');
            // 自行判断 是走后台查询，还是前端过滤
            // this.$refs.treeSelect.$refs.tree.filter(value);
            this.$refs.treeSelect.filterFun(value);
            // 后台查询
            // this.$refs.treeSelect.treeDataUpdateFun(treeData);
        },
        // 自定义render
        _renderFun(h, { node, data, store }) {
            return (
                <span class='custom-tree-node'>
                    <span>{node.label}</span>
                </span>
            );
        }
    },
    components: { }
};
</script>

```

## 安装

```
npm install el-tree-select --save-dev
```

## git 地址

```
https://github.com/ayiaq1/el-tree-select

```
