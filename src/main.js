import Vue from 'vue';
import App from './App';
import {
  Option,
  Input,
  Button,
  Tree,
  Popover,
  Scrollbar,
  Select
} from 'element-ui';
Vue.config.productionTip = false;
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 5000 };
Vue.component(Scrollbar.name, Scrollbar);
Vue.component(Popover.name, Popover);
Vue.component(Select.name, Select);
Vue.component(Tree.name, Tree);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Option.name, Option);

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
