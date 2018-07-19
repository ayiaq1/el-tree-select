<template>
  <div id="app">
    <elTreeselect v-model="title" clickParent placeholder="请输入搜索内容" :data="treeData" :props="props" @clearFun="clearFun">
    </elTreeselect>
  </div>
</template>
<script>
import elTreeselect from './components/el-tree-select.vue';
export default {
  name: 'App',
  data() {
    return {
      title: '1232',
      treeData: [{ flowId: 1, name: '123',children:[{flowId:3,name:'333333'}] }, { flowId: 2, name: '456' }],
      props: {
        label: 'name',
        vaule: 'flowId'
      }
    }
  },
  methods: {
    clearFun() {
      console.log('clear fun');
    }
  },
  components: { elTreeselect }
};

</script>
