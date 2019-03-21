<!--
 * @moduleName: 
 * @Author: dawdler
 * @Date: 2018-12-19 14:03:03
 * @LastModifiedBy: dawdler
 * @LastEditTime: 2019-03-21 11:00:44
 -->
<template>
    <div id="app">
        <ELTreeSelect :styles="styles" v-model="values" :selectParams="selectParams" :treeParams="treeParams" @searchFun="_searchFun" @node-click="_nodeClickFun" ref="treeSelect"/>
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
import ELTreeSelect from './components/el-tree-select.vue';
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
    components: { ELTreeSelect }
};
</script>
