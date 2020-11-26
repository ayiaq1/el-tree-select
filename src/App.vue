<!--
 * @moduleName:
 * @Author: dawdler
 * @Date: 2018-12-19 14:03:03
 * @LastModifiedBy: dawdler
 * @LastEditTime: 2020-11-26 21:01:12
 -->
<template>
    <div id="app">
        <ElTreeSelect popoverClass="fas" v-model="values" :styles="styles" :selectParams="selectParams" :treeParams="treeParams" :filterNodeMethod="_filterFun" ref="treeSelect" :treeRenderFun="_renderFun" @searchFun="_searchFun"></ElTreeSelect>
        <el-select multiple v-model="test" placeholder="请选择" @change="_selectChange">
            <el-option v-for="item in treeParams.data" :key="item.testId" :label="item.name" :value="item.testId"></el-option>
        </el-select>
        <div>
            测试焦点触发
            <svg>
                <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
            </svg>
        </div>
    </div>
</template>
<style>
#app {
    display: flex;
    justify-content: space-between;
    width: 100%;
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
            values: [],
            selectParams: {
                clearable: true,
                placeholder: '请输入内容'
            },
            treeParams: {
                clickParent: false,
                filterable: true,
                'check-strictly': false,
                'default-expand-all': true,
                'expand-on-click-node': false,
                'render-content': this._renderFun,
                data: [
                    {
                        id: '1',
                        name: '根节点'
                    }
                ],
                props: {
                    children: 'children',
                    label: 'name',
                    disabled: 'disabled',
                    value: 'id'
                }
            }
        };
    },
    created() {},
    mounted() {
        // 手动更新树数据
        let data = [];
        let parentId = '0';
        for (let i = 0; i < 5; i++) {
            let rootId = `${parentId}_${i}`;
            let rootNode = {
                name: `节点：${rootId}`,
                id: rootId,
                children: []
            };
            for (let i = 0; i < 5; i++) {
                let subId = `${rootId}_${i}`;
                let subNode = {
                    name: `节点：${subId}`,
                    id: subId,
                    children: []
                };
                rootNode.children.push(subNode);
            }
            data.push(rootNode);
        }
        this.$nextTick(() => {
            this.$refs.treeSelect.treeDataUpdateFun(data);
        });
    },
    methods: {
        // 下拉框修改
        _selectChange(val) {
            console.log(val, '<-select change');
        },
        _filterFun(value, data, node) {
            if (!value) return true;
            return data.id.indexOf(value) !== -1;
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
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                </span>
            );
        }
    },
    components: {}
};
</script>
