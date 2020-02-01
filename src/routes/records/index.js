import React from "react";
import { Flex, NavBar, List, Pagination } from "antd-mobile";
import "./style.css";
import { withRouter } from "react-router-dom";

const Item = List.Item;
const Brief = Item.Brief;

@withRouter
class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  componentDidMount() {
    this.setState({
      records: [
        {
          id: 1,
          name: "启航",
          total: 30,
          items: [],
          time: "2020年2月1日 19点26分"
        },
        {
          id: 2,
          name: "某某人",
          total: 10,
          items: [],
          time: "2020年2月1日 19点24分"
        }
      ]
    });
  }

  renderItems = () => {
    let res = [];
    const { records = [] } = this.state;
    res = records.map(t => {
      const { id = 0, name = "", time = "", total = 0 } = t;
      return (
        <Item
          arrow="horizontal"
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          multipleLine
          onClick={() => {
            this.props.history.push(`/record/${id}`);
          }}
        >
          【{name}】捐助了{total}件物资 <Brief>{time}</Brief>
        </Item>
      );
    });
    return res;
  };

  render() {
    const locale = {
      prevText: "上一页",
      nextText: "下一页"
    };
    return (
      <div>
        <NavBar mode="dark">捐助记录</NavBar>
        <Flex>
          <Flex.Item>
            <List>{this.renderItems()}</List>
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item>
            <Pagination
              className="pagination"
              total={5}
              current={1}
              locale={locale}
            />
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default ContactInfo;
