import React from "react";
import { NavBar, Icon, List } from "antd-mobile";
import "./style.css";
const Item = List.Item;
const Brief = Item.Brief;
class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {}
    };
  }

  componentDidMount() {
    // const { match = {} } = this.props;
    // const { params = {} } = match;
    // const { id = "" } = params;
    this.setState({
      record: {
        name: "启航",
        total: 30,
        items: [],
        time: "2020年2月1日 19点26分",
        word: "武汉加油！中国加油!"
      },
      kuaidi: [
        {
          msg:
            "[杭州市]已签收(丰巢签收),感谢使用顺丰,期待再次为您服务（主单总件数：1件）",
          time: "2020.01.29 16:20"
        },
        {
          msg: "[杭州市]快件派送不成功(因收方客户拒收快件),待进一步处理",
          time: "2020.01.28 18:20"
        }
      ]
    });
  }

  renderKuaidiItems = () => {
    let res = [];
    const { kuaidi = [] } = this.state;
    res = kuaidi.map(t => {
      const { msg = "", time = "" } = t;
      return (
        <Item wrap={true} arrow="empty" key={time} multipleLine>
          <div style={{ fontSize: 14 }}>{msg}</div> <Brief>{time}</Brief>
        </Item>
      );
    });
    return res;
  };

  render() {
    const { record = {} } = this.state;
    const { id = 0, name = "", time = "", total = 0, word = "" } = record;
    return (
      <div>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
          mode="dark"
        >
          捐助详情
        </NavBar>
        <List className="title-list">
          <Item
            arrow="empty"
            key={id}
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            multipleLine
            onClick={() => {
              this.props.history.push(`/record/${id}`);
            }}
          >
            【{name}】捐助了{total}件物资 <Brief>{time}</Brief>
          </Item>
        </List>
        <List renderHeader={() => "捐助人"} className="my-list">
          <Item wrap={true} multipleLine>
            启航
            <div className="words">留言：{word}</div>
          </Item>
        </List>
        <List renderHeader={() => "受助单位"} className="my-list">
          <Item multipleLine extra={<a href='#detail'>查看详情</a>}>
            XXX医院 <Brief>武汉市 XX区</Brief>
          </Item>
        </List>
        <List renderHeader={() => "物流进度"} className="kuaidi-list">
          {this.renderKuaidiItems()}
        </List>
      </div>
    );
  }
}

export default ContactInfo;
