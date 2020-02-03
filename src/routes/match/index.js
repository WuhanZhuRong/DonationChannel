import React from "react";
import { Card, WingBlank, WhiteSpace, NavBar, Button } from "antd-mobile";
import { withRouter } from "react-router-dom";

@withRouter
class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onNavigateTo(path) {
    this.props.history.push(path);
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
              <Button type="primary" onClick={this.onNavigateTo.bind(this, '/search')}>开始捐助</Button>
              <WhiteSpace />
              {/*<Button type="warning">求助物资</Button>*/}
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
