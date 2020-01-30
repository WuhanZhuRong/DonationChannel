import React from "react";
import { Card, WingBlank, WhiteSpace, NavBar, Button } from "antd-mobile";
import { Link } from "react-router-dom";

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar mode="dark">物资对接</NavBar>
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Card>
            <Card.Header title={<h3>打通您和医院的对接</h3>} />
            <Card.Body>
              <p>
                我们为捐助者和医院提供一个物资快速匹配的平台。
                简单填写你的物资需求或捐助意愿，开始你的匹配。
              </p>
              <Link to={"/search"}>
                <Button type="primary">开始捐助</Button>
              </Link>
              <WhiteSpace />
              <Button type="warning">求助物资</Button>
              <WhiteSpace />
            </Card.Body>
          </Card>
          <WhiteSpace size="lg" />
        </WingBlank>
      </div>
    );
  }
}

export default ContactInfo;
