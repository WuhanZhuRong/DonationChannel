import React from "react";
import { Flex, NavBar, Icon } from "antd-mobile";
import "./style.css";

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {}
    };
  }

  componentDidMount() {
    const { match = {} } = this.props;
    const { params = {} } = match;
    const { id = "" } = params;
    this.setState({
      record: [
        {
          name: "启航",
          total: 30,
          items: [],
          time: "2020年2月1日 19点26分"
        }
      ]
    });
  }

  render() {
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
        <Flex>捐助详情内容</Flex>
      </div>
    );
  }
}

export default ContactInfo;
