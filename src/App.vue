<template>
  <div id="app">
    <ELTreeSelect
      v-model="values"
      :selectParams="selectParams"
      :treeParams="treeParams"
      @searchFun="_searchFun"
      @node-click="_nodeClickFun"
      ref='treeSelect'
    />
  </div>
</template>
<script>
import ELTreeSelect from './components/el-tree-select.vue';
export default {
  name: 'App',
  data() {
    return {
      values: '3',
      selectParams: {
        'clearable': true,
        'placeholder': '请输入内容'
      },
      treeParams: {
        'default-expand-all': true,
        'filterable': true,
        'check-strictly': true,
        'render-content': this._renderFun,
        'data': [{
          testId: '1', name: '哎哎哎',
          children: [{ testId: '3', name: '啊啊啊啊' }]
        },
        {
          testId: '2',
          name: '发生的'
        }],
        'props': {
          children: 'children',
          label: 'name',
          value:'testId'
        }
      }
    }
  },
  mounted() { },
  methods: {
    // 树点击
    _nodeClickFun(data, node, vm) {
      console.log('this _nodeClickFun', this.values, data, node);
    },
    // 树过滤
    _searchFun(value) {
      // 自行判断 是走后台查询，还是前端过滤
      this.$refs.treeSelect.$refs.tree.filter(value);
      // 后台查询
      // this.$refs.treeSelect.updateFun(treeData);
    },
    // 自定义render
    _renderFun(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>text-----{node.label}</span>
        </span>);
    }
  },
  components: { ELTreeSelect }
};

</script>
