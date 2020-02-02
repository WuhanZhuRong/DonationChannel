import React from "react";
import { Card, Icon, List, NavBar, Toast } from "antd-mobile";
import { API_GET_HOSPITAL_BY_ID, get } from "../../utils/api";
import copy from "copy-to-clipboard";
import styled from "styled-components";

const StyledCard = styled(Card)`
.detail-card-header {
  width: 100%;
}

.detail-card-body {
  padding: 0 40px;
}

.detail-card-body-category-list {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.detail-card-body-category-list-item {
  padding-left: 20px;
}

.detail-card-body-category-list-item .am-list-content,
.am-list-extra {
  font-size: 13px !important;
}

.detail-card-body-category-list-item-count {
  position: relative;
  margin-right: 16px;
}

.detail-card-body-category-list-item-count:after {
  content: " ";
  position: absolute;
  right: -14px;
  top: 4px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 4px;
}

.detail-card-header table {
  tbody {
    vertical-align: inherit;
  }

  td:first-child {
    width: 60px;
    text-align: right;
    display: inline-block;
    font-size: 13px;
    color: #555;
    margin-right: 8px;
  }

  i {
    font-size: 20px;
    padding: 8px;
  }
}

.detail-card-header-row {
  display: flex;
  justify-content: space-between;

  > div span:first-child {
    width: 60px;
    text-align: right;
    display: inline-block;
    font-size: 13px;
    color: #555;
    margin-right: 8px;
  }

  > div {
    display: flow;
    align-items: center;
  }

  i {
    font-size: 30px;
    padding: 10px;
  }
}
`;

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hospital: {}
    };
  }

  componentDidMount() {
    this.fetchHospitalById(this.props.match.params.id);
  }

  fetchHospitalById(id) {
    console.log("===fetchHospitalById,发起请求===", id);
    get(API_GET_HOSPITAL_BY_ID(id)).then(res =>
      this.setState({ hospital: res.data.data[0] })
    );
  }

  copyToClickBoard = (res, type) => {
    if (copy(res)) {
      Toast.success(`${type}已复制到粘贴板`);
    } else {
      Toast.fail("复制失败");
    }
  };

  render() {
    const { hospital } = this.state;
    if (!hospital || !Object.keys(hospital).length) {
      return "";
    }
    const supplyWithCategories = divideSuppliesIntoCategories(
      hospital.supplies
    );

    return (
      <div>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
          mode="dark"
        >
          医院需求详情
        </NavBar>
        <StyledCard full>
          <Card.Header
            title={
              <div className="detail-card-header">
                <h3>
                  {hospital.hospital}
                </h3>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        联系方式:
                      </td>
                      <td>
                        <a href={`tel://${hospital.mobile}`}>{hospital.mobile}</a>
                      </td>
                      <td>
                        <i className="ai-phone" onClick={() => this.copyToClickBoard(hospital.mobile, "联系方式")} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        地址:
                      </td>
                      <td>
                        <span>{hospital.street}</span>
                      </td>
                      <td>
                        <i className="ai-home" onClick={() => this.copyToClickBoard(hospital.street, "医院地址")} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          />
          <Card.Body className="detail-card-body">
            {supplyWithCategories
              .filter(category => category.supplies.length)
              .map(category => (
                <div key={category.name} className="detail-card-body-category">
                  <h4 className="detail-card-body-category-name">
                    {category.name}
                  </h4>
                  <List className="detail-card-body-category-list">
                    {category.supplies.map(supply => (
                      <List.Item
                        key={supply.name}
                        className="detail-card-body-category-list-item"
                        extra={
                          <span className="detail-card-body-category-list-item-count">
                            {supply.count || "不限"}
                          </span>
                        }
                      >
                        {supply.name}
                      </List.Item>
                    ))}
                  </List>
                </div>
              ))}
          </Card.Body>
        </StyledCard>
      </div>
    );
  }
}

function divideSuppliesIntoCategories(supplies) {
  // TODO logic need to be complete or wait back-end return new structure
  const masks = [];
  const armors = [];
  const equipments = [];
  const others = [];
  supplies.forEach(supply => {
    const { name } = supply;
    if (name.includes("口罩")) {
      masks.push(supply);
    } else if (
        name.includes("眼") ||
        name.includes("帽") ||
        name.includes("面") ||
        name.includes("衣") ||
        name.includes("服")
    ) {
      armors.push(supply);
    } else if (name.includes("设备")) {
      equipments.push(supply);
    } else {
      others.push(supply);
    }
  });
  return [
    { name: "口罩", supplies: masks },
    { name: "防护", supplies: armors },
    { name: "医用设备", supplies: equipments },
    { name: "其他", supplies: others }
  ];
}

export default Detail;
