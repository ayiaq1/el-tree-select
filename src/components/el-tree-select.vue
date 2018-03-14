<!--扩展element-ui 下拉树状菜单-->

<!--
demo:

<el-treeselect
    multiple
    v-model="title"
    :remoteSearch="true"
    placeholder="请输入搜索内容"
    :data="treeData"
    :props="props"
    :isEdit="true"
    :clickParent="true"
    :renderContent="renderContent"
    @treeSearch="searchFun"
    @nodeClick="nodeClick"
    @treeNodeCheckFun="treeNodeCheckFun"
    @show="showFun"
    @hide="function(val){hideMdataFun(scope.row,val)}"
>
</el-treeselect>

// 如果启用了 isEdit 那么在 hide的时候 需要当前一行的 row.name = val

参数：
树菜单过滤数据：
props: {
    children: 'children',
    label: 'name',
    id: 'flowId'           // 选中之后的id名称
}

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
-->


<template>
    <div class="el-select el-treeselect" v-clickoutside="handleClose">
        <el-tooltip :enterable="false" effect="dark" :content="label" :placement="placement"
                    :disabled="label.length<10">
            <el-input v-if='!isEdit'
                      ref="reference"
                      class="selectIconInput"
                      v-model="label"
                      type="text"
                      :disabled="disabled"
                      @mousedown.native="handleMouseDown"
                      @keyup.native="handlekeyup">
                <i slot="suffix"
                   :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"
                   @click="handleMouseDown"></i>
            </el-input>
            <el-input v-else
                      ref="reference"
                      class="selectInput"
                      v-model="label"
                      :disabled="disabled"
                      @focus="handleMouseDown"
                      @keyup.native="handlekeyup">
            </el-input>
        </el-tooltip>
        <transition
            name="el-zoom-in-top"
            @after-leave="doDestroy">
            <el-select-menu
                ref="popper"
                class="el-treeselectMenu"
                v-show="visible">
                <el-input
                    v-model="searchKey"
                    :placeholder="placeholder"
                    size="small"
                    class="searchInput"
                    @keydown.native.enter.prevent="searchFun">
                    <el-button slot="append" icon="el-icon-search" @click="searchFun"></el-button>
                </el-input>
                <el-scrollbar
                    tag="div"
                    wrap-class="el-select-dropdown__wrap"
                    view-class="el-select-dropdown__list"
                    class="is-empty">
                    <el-tree
                        ref="tree"
                        :empty-text="emptyText"
                        :show-checkbox="multiple"
                        :data="treeData"
                        :props="props"
                        :render-content="renderContent"
                        :filter-node-method="filterNode"
                        @node-click="treeNodeClickFun"
                        @check-change="treeNodeCheckFun"
                    ></el-tree>
                </el-scrollbar>
            </el-select-menu>
        </transition>
    </div>
</template>
<script type="text/jsx">
    import Emitter from 'element-ui/src/mixins/emitter';
    import Locale from 'element-ui/src/mixins/locale';
    import ElInput from 'element-ui/packages/input';
    import ElSelectMenu from 'element-ui/packages/select/src/select-dropdown.vue';
    import Clickoutside from 'element-ui/src/utils/clickoutside';
    import {addClass, removeClass} from 'element-ui/src/utils/dom';
    import {
        addResizeListener,
        removeResizeListener
    } from 'element-ui/src/utils/resize-event';

    export default {
        name:'el-tree-select',
        mixins: [Emitter, Locale],
        computed: {
            iconClass() {
                return 'caret-top';
            }
        },
        components: {
            ElInput,
            ElSelectMenu,
            NodeContent: {
                render(h) {
                    const parent = this.$parent;
                    const node = this.node;
                    const data = node.data;
                    const store = node.store;
                    return parent.renderContent ? (
                        parent.renderContent.call(parent._renderProxy, h, {
                            _self: parent.tree.$vnode.context,
                            node,
                            data,
                            store
                        })
                    ) : (
                        <span class="el-tree-node__label">{this.node.label}</span>
                    );
                }
            }
        },
        directives: {Clickoutside},
        props: {
            value: String, // v-model
            disabled: Boolean,
            multiple: Boolean, // 是否多选
            renderContent: Function, // 是否给过滤数据
            remoteSearch: {
                // 搜索，从本地还是远程请求,默认本地
                type: Boolean,
                default() {
                    return false;
                }
            },
            // 默认是否允许点击父级，点击之后触发关闭
            clickParent: {
                type: Boolean,
                default() {
                    return false;
                }
            },

            placeholder: String, // 搜索框默认文字
            loadingTxt: {
                // 下拉菜单显示文字
                type: String,
                default() {
                    return '暂无数据';
                }
            },
            placement: {
                // 显示内容的文本框默认提示位置
                type: String,
                default() {
                    return 'right';
                }
            },
            isEdit: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            data: {
                // 树菜单数据
                type: Array,
                default() {
                    return [];
                }
            },
            props: {
                // 树菜单 默认数据设置
                type: Object,
                default() {
                    return {
                        children: 'children',
                        label: 'name',
                        disabled: 'disabled',
                        id: 'flowId' // 选中之后的id名称
                    };
                }
            }
        },
        data() {
            return {
                label: '',
                searchKey: '',
                emptyText: '',
                inputLength: 20,
                inputWidth: 0,
                visible: false,
                treeData: []
            };
        },
        watch: {
            visible(val) {
                if (!val) {
                    this.handleIconHide();
                    this.broadcast('ElSelectDropdown', 'destroyPopper');
                    this.$emit('hide', this.label);
                } else {
                    this.searchKey = '';
                    this.emptyText = this.loadingTxt;
                    this.handleIconShow();
                    this.broadcast('ElSelectDropdown', 'updatePopper');
                    this.$emit('show');
                }
            },
            data(val) {
                if (val.length === 0) {
                    this.emptyText = '暂无数据';
                }
                // 外部请求改变，修改对应菜单数据
                this.treeData = val;
            },
            value(val) {
                if (!this.visible) {
                    this.label = val;
                }
            }
        },
        methods: {
            searchFun() {
                if (this.remoteSearch) {
                    // 远程请求，交给外层
                    this.$emit('treeSearch', this.searchKey);
                } else {
                    this.$refs.tree.filter(this.searchKey);
                }
                setTimeout(() => {
                    this.broadcast('ElSelectDropdown', 'updatePopper');
                }, 300);
            },
            filterNode(value, data) {
                if (!value) return true;
                return data[this.props.label].indexOf(value) !== -1;
            },
            treeNodeCheckFun(data, node, tree) {
                let str = '';
                let checks = [];
                let ids = [];
                this.$refs.tree.getCheckedNodes().forEach(item => {
                    if (!item.children || item.children.length === 0) {
                        str += item[this.props.label] + ',';
                        checks.push(item);
                        ids.push(item[this.props.id]);
                    }
                });
                this.label = str.substr(0, str.length - 1);
                this.$emit('treeNodeCheckFun', ids, checks);
            },
            treeNodeClickFun(data, node, tree) {
                if (!data.children || data.children.length === 0) {
                    this.label = data[this.props.label];
                    this.$emit('input', this.label);
                    this.$emit('nodeClick', data, node, tree);
                    this.handleClose();
                } else if (this.clickParent) { // true 允许点击上级目录
                    this.label = data[this.props.label];
                    this.$emit('input', this.label);
                    this.$emit('nodeClick', data, node, tree);
                    this.handleClose();
                }
            },
            handleIconHide() {
                let icon = this.$el.querySelector('.el-input__icon');
                if (icon) {
                    removeClass(icon, 'is-reverse');
                }
            },
            handleIconShow() {
                let icon = this.$el.querySelector('.el-input__icon');
                if (icon) {
                    addClass(icon, 'is-reverse');
                }
            },
            handleMouseDown(event) {
                if (this.disabled) return;
                this.visible = !this.visible;
                event.preventDefault();
            },
            handlekeyup(event) {
                this.searchFun();
                this.$emit('keyup', event, this.label);
            },
            doDestroy() {
                this.$refs.popper && this.$refs.popper.doDestroy();
            },
            handleClose() {
                this.visible = false;
            },
            handleResize() {
                this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
            }
        },
        mounted() {
            this.treeData = this.data;
            addResizeListener(this.$el, this.handleResize);
            this.$nextTick(() => {
                if (this.$refs.reference && this.$refs.reference.$el) {
                    this.label = this.value;
                    this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
                }
            });
        },
        beforeDestroy() {
            if (this.$el && this.handleResize) {
                removeResizeListener(this.$el, this.handleResize);
            }
        }
    };
</script>
