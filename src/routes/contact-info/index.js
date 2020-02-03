import React from "react";
import { NavBar, Flex } from "antd-mobile";
import qr_code_url from "../../assets/group-qrcode.jpg";
import styled from "styled-components";

const Line = styled.div`
  height: 0;
  border-top: 1px #ddd solid;
  margin: 10px;
`;

const StyledTable = styled.div`
  word-break: break-all;
  i {
    color: cornflowerblue;
    margin-right: 5px;
  }
  margin-left: 10px;
  margin-right: 10px;
  .feedback {
    font-size: 18px;
  }

`;

const PlaceHolder = styled.div`
  margin-top: 10px;
  .title {
    font-size: 18px;
    font-weight: 500;
  }
  text-align: center;
  word-break: break-all;
  text-align: center;
  width: 100%;
  i {
    color: cornflowerblue;
    margin-right: 10px;
  }
`;

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar mode="dark">联系我们</NavBar>
        <img style={{ width: "50%" }} src={qr_code_url} />
        <div>扫码入群</div>
        <Line />
        <StyledTable>
          <Flex>
            <Flex.Item>
              <PlaceHolder>
                <div className="title">
                  <i className="ai-phone" />
                  联系电话
                </div>
              </PlaceHolder>
            </Flex.Item>
            <Flex.Item>
              <PlaceHolder>
                <div className="title">
                  <i className="ai-mail" />
                  邮箱
                </div>
              </PlaceHolder>
            </Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item>
              <PlaceHolder>17611249206</PlaceHolder>
            </Flex.Item>
            <Flex.Item>
              <PlaceHolder>wangwenbo_job@163.com</PlaceHolder>
            </Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item>
              <PlaceHolder>18851909173</PlaceHolder>
            </Flex.Item>
            <Flex.Item>
              <PlaceHolder>495673232@qq.com</PlaceHolder>
            </Flex.Item>
          </Flex>
          <Line />
          <i className="ai-github" />
          项目地址：
          <a
            href="https://github.com/WuhanZhuRong/DonationChannel"
            target="_blank"
          >
            https://github.com/WuhanZhuRong/DonationChannel
          </a>
          <br />
          <br />
          如果您在抗击疫情的一线或者深受疫情困扰，有什么需要我们帮助的地方，请联系我们。
          <br />
          <br />
          <a
            className="feedback"
            href="https://www.wjx.cn/jq/54804929.aspx"
            target="_blank"
          >
            点我一键反馈
          </a>
        </StyledTable>
      </div>
    );
  }
}

export default ContactInfo;
