import React from "react";
import { NavBar } from "antd-mobile";

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar mode="dark">联系我们</NavBar>
        <div style={{ padding: 12 }}>
          <p>
            更多信息请联系微信 xxx 或扫描如下二维码：<br></br> （二维码）
          </p>
        </div>
      </div>
    );
  }
}

export default ContactInfo;
