import Vue from 'vue';
import {
  Message,
  Input,
  Button,
  Image,
  Icon,
  Card,
  Dialog, 
  Select,
  Option,
  Switch,
  Upload,
  MessageBox,
  Form,
  FormItem,
  Tooltip,
  Pagination,
  Tabs,
  TabPane,
  Loading,
  Timeline,
  TimelineItem,
  Divider
} from 'element-ui';

Vue.use(Divider)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Input)
Vue.use(Image)
Vue.use(Icon)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tooltip)

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.prototype.$message = Message;