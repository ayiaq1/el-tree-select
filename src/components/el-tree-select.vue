<!--扩展element-ui 下拉树状菜单-->
<template>
    <div class="el-select elTreeSelect" v-clickoutside="handleClose">
        <el-tooltip :enterable="false" effect="dark" :content="label" :placement="placement"
                    :disabled="label.length<10">
            <el-input v-if='!isEdit'
                      ref="reference"
                      class="selectIconInput"
                      v-model="label"
                      type="text"
                      :readonly="!isEdit"
                      :disabled="disabled"
                      @mouseup.native="handleMouseDown"
                      @mouseenter.native="inputHovering = true"
                      @mouseleave.native="inputHovering = false"
                      @keyup.native="handlekeyup">
                <i slot="suffix"
                   :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"
                   @click="handleIconClick"
                   ></i>
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
                class="elTreeSelectMenu"
                v-show="visible">
                <el-input v-show="search"
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
<style scoped>
    /*---下拉框样式------*/
.elTreeSelect > input{content:'';text-overflow:ellipsis;white-space:nowrap;overflow:hidden;}
.elTreeSelect .selectInput > input{padding-left:5px;padding-right:5px;}
.elTreeSelectMenu{z-index:9999!important;padding:5px;}
.elTreeSelectMenu .searchInput{padding:10px;width: 93%;}
.elTreeSelectMenu .searchInput .el-button{min-width:auto;}
.elTreeSelectMenu .el-tree .el-tree-node.is-current > .el-tree-node__content{background-color:rgba(52,184,225,0.5);}
.elTreeSelectMenu  .el-tree .el-tree-node.is-current > .el-tree-node__content:hover{background-color:rgba(52,184,225,0.5);}
</style>
<script type="text/jsx">
    import Emitter from '@element-ui/src/mixins/emitter';
    import Locale from '@element-ui/src/mixins/locale';
    import ElInput from '@element-ui/packages/input';
    import ElSelectMenu from '@element-ui/packages/select/src/select-dropdown.vue';
    import Clickoutside from '@element-ui/src/utils/clickoutside';
    import {addClass, removeClass} from '@element-ui/src/utils/dom';
    import {addResizeListener,removeResizeListener} from '@element-ui/src/utils/resize-event';
    export default {
        name:'el-tree-select',
        mixins: [Emitter, Locale],
        computed: {
            iconClass() {
                let criteria = this.clearable &&
                  !this.disabled &&
                  this.inputHovering &&
                  !this.multiple &&
                  this.value !== undefined &&
                  this.value !== '';
                return criteria ? 'circle-close is-show-close' : 'arrow-up';
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
            placeholder: String, // 搜索框默认文字
            search: {
                // 搜索框是否显示
                type: Boolean,
                default() {
                    return true;
                }
            },
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
                    return true;
                }
            },
            // 是否清空选择内容，默认true
            clearable: {
                type: Boolean,
                default() {
                    return true;
                }
            },
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
                        value: 'flowId' // 选中之后的id名称
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
                inputHovering: false,
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
            // 搜索
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
            // tree本地过滤
            filterNode(value, data) {
                if (!value) return true;
                return data[this.props.label].indexOf(value) !== -1;
            },
            // 树选择
            treeNodeCheckFun(data, node, tree) {
                let str = '';
                let checks = [];
                let ids = [];
                this.$refs.tree.getCheckedNodes().forEach(item => {
                    if (!item.children || item.children.length === 0) {
                        str += item[this.props.label] + ',';
                        checks.push(item);
                        ids.push(item[this.props.value]);
                    }
                });
                this.label = str.substr(0, str.length - 1);
                this.$emit('treeNodeCheckFun', ids, checks);
            },
            // 树点击
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
            handleIconClick(event) {
                if (this.iconClass.indexOf('circle-close') > -1) {
                    this.deleteSelected(event);
                }
            },
            handleMouseDown(event) {
                if (this.disabled) return;
                this.visible = !this.visible;
            },
            handlekeyup(event) {
                this.searchFun();
                this.$emit('keyup', event, this.label);
            },
            // 清空选择
            deleteSelected(event) {
                this.$emit('input', '');
                this.$emit('clearFun');
                this.handleClose();
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
