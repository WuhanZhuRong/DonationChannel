import React from "react";
import { NavBar, Icon } from "antd-mobile";
import qr_code_url from '../../assets/public-qrcode.jpeg';
import styled from "styled-components";

const Line = styled.div`
  height: 0;
  border-top: 1px #ddd solid;
  margin 20px;
`;

const StyledTable = styled.div`

  .tbl-header{
    background-color: rgba(255,255,255,0.3);
   }
  .tbl-content{
    overflow-x:auto;
    margin-top: 0;
    border: 1px solid rgba(255,255,255,0.3);
  }

  table{
    width:100%;
  }

  

  th{
    width: 50%;
    padding: 20px 15px 20px 32px;
    text-align: left;
    font-weight: 500;
    font-size: 18px;
    text-transform: uppercase;
    position: relative;
    
    i {
      color: cornflowerblue;
    }
  }
  td{
  width: 50%;
    padding: 15px 15px 15px 45px;
    text-align: left;
    vertical-align:middle;
    font-weight: 300;
    font-size: 12px;
    border-bottom: solid 1px rgba(255,255,255,0.1);
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
          <img style={{width: '50%'}} src={qr_code_url} />
          <div>关注公众号</div>
          <Line />
          <StyledTable>
            <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0" border="0">
                <thead>
                <tr>
                  <th><i className="ai-phone" />联系电话：</th>
                  <th><i className="ai-mail" />邮箱：</th>
                </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                <tr>
                  <td>17611249206</td>
                  <td>18851909173</td>
                </tr>
                <tr>
                  <td>wangwenbo_job@163.com</td>
                  <td>495673232@qq.com</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0" border="0">
                <thead>
                <tr>
                  <th><i className='ai-github' />项目地址：</th>
                </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                <tr>
                  <td><a href='https://github.com/WuhanZhuRong/DonationChannel' target='_blank'>https://github.com/WuhanZhuRong/DonationChannel</a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </StyledTable>
        </div>
    );
  }
}

export default ContactInfo;
