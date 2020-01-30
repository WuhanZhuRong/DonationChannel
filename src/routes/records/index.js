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
        <NavBar mode="dark">捐助记录</NavBar>
        <div style={{ padding: 12 }}>
          <p>xxx记录</p>
        </div>
      </div>
    );
  }
}

export default ContactInfo;
