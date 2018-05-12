## 基于element-ui2.x扩展下拉带树的组件 下拉树状菜单
## 目前已剥离组件可作为独立插件使用

###
![Image text](https://github.com/ayiaq1/el-tree-select/raw/master/demo.jpg)

#### 参数：
    // 如果启用了 isEdit 那么在 hide的时候 需要当前一行的 row.name = val
    props: {    树菜单过滤数据
        children: 'children',
        label: 'name',
        value: 'flowId'// 选中之后的id名称
    }
    disabled        是否禁用
    loadingTxt      加载中的文字
    isEdit          是否支持手动输入
    placement       显示文本框的tips位置
    data:           树菜单数据
    multiple：       是否多选，默认：false
    v-model         绑定的值
    remoteSearch：   是否从远程搜索数据，默认本地：false
    placeholder：    搜索框的placeholder
    clickParent:     树菜单点击事件（是否支持直接点击父级,nodeClick方法判断如果clickParent往上抛出）
    searchFun：      搜索事件，remoteSearch=true时触发
    nodeClick:       树菜单点击事件（只有点击为最末层子集的时候才触发）
    treeNodeCheckFun:树多选框选择时候触发（必须条件：multiple=true）
    show:             树显示
    hide:             树隐藏
    renderContent:    树自定义显示内容

### 更新日志
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
    <el-treeselect
        multiple
        v-model="title"
        :remoteSearch="true"
        placeholder="请输入搜索内容"
        :data="treeData"
        :props="props"
        :isEdit="true"
        :clickParent="true"
        :disabled="true"
        :renderContent="renderContent"
        @treeSearch="searchFun"
        @nodeClick="nodeClick"
        @treeNodeCheckFun="treeNodeCheckFun"
        @show="showFun"
        @hide="function(val){hideMdataFun(scope.row,val)}"
    >
    </el-treeselect>


#### script

    import elTreeselect from 'el-tree-select';
    export default {
        data() {
        return {
            title: 'test',
            treeData: [{flowId: 1, name: '123'}],
            props: {
                label: 'name',
                value: 'flowId'
            }
        };
    },
    components: {elTreeselect}
    };


## 安装

npm install el-tree-select --save

## git地址
https://github.com/ayiaq1/el-tree-select

