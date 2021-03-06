import {
  Button,
  Field,
  CheckboxGroup,
  Checkbox,
  PasswordInput,
  NumberKeyboard,
  CountDown,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  Col,
  Row,
  Swipe,
  SwipeItem,
  Popup,
  Icon,
  Step,
  Steps,
  PullRefresh,
  SwipeCell,
  List,
  Tab,
  Tabs,
  SubmitBar,
  Empty,
  picker,
  Badge,
  DatetimePicker,
  Uploader,
  ActionSheet,
  NoticeBar,
  Image as VanImage
} from 'vant'

const CustomVant = {
  install: Vue => {
    Vue.use(Button)
      .use(Field)
      .use(Checkbox)
      .use(CheckboxGroup)
      .use(PasswordInput)
      .use(NumberKeyboard)
      .use(CountDown)
      .use(Cell)
      .use(CellGroup)
      .use(Tabbar)
      .use(TabbarItem)
      .use(Col)
      .use(Row)
      .use(Swipe)
      .use(SwipeItem)
      .use(Popup)
      .use(Icon)
      .use(Step)
      .use(Steps)
      .use(PullRefresh)
      .use(SwipeCell)
      .use(List)
      .use(Tab)
      .use(Tabs)
      .use(SubmitBar)
      .use(Empty)
      .use(Badge)
      .use(picker)
      .use(DatetimePicker)
      .use(Uploader)
      .use(ActionSheet)
      .use(NoticeBar)
      .use(VanImage)
  }
}

export default CustomVant
