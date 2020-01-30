import { TabBar } from "antd-mobile";
import React from "react";
import "./style.css";
import ContactInfo from "../contact-info";
import Records from "../records";
import Match from "../match";
class MainTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "match",
      hidden: false,
      fullScreen: true
    };
  }

  renderContent(content) {
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          textAlign: "center"
        }}
      >
        {content}
      </div>
    );
  }

  render() {
    return (
      <div
        style={
          this.state.fullScreen
            ? { position: "fixed", height: "100%", width: "100%", top: 0 }
            : { height: 400 }
        }
      >
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="物资对接"
            key="match"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(/logo_gray.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(/logo.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            selected={this.state.selectedTab === "match"}
            onPress={() => {
              this.setState({
                selectedTab: "match"
              });
            }}
            data-seed="logId"
          >
            {this.renderContent(<Match />)}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(/records_gray.svg) center center /  16px 16px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(/records.svg) center center /  16px 16px no-repeat"
                }}
              />
            }
            title="捐助记录"
            key="records"
            selected={this.state.selectedTab === "records"}
            onPress={() => {
              this.setState({
                selectedTab: "records"
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent(<Records />)}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            title="联系我们"
            key="contact"
            selected={this.state.selectedTab === "contact"}
            onPress={() => {
              this.setState({
                selectedTab: "contact"
              });
            }}
          >
            {this.renderContent(<ContactInfo />)}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default MainTabBar;
