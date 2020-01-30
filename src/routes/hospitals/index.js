import React from "react";
import { connect } from "react-redux";
import {
  Badge,
  WingBlank,
  WhiteSpace,
  Card,
  Icon,
  Flex,
  Grid,
  Accordion,
  List,
  Checkbox,
  NavBar
} from "antd-mobile";
import "./style.css";
import { hospitalActions, selectAllHospital } from "../../redux/hospitals";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

@connect(mapStateToProps, mapDispatchToProps)
class Hospitals extends React.Component {
  componentDidMount() {
    this.props.searchHospital();
  }

  render() {
    const { hospitals, filter, supplies } = this.props;
    return (
      <div>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.push("/search");
          }}
          mode="dark"
        >
          物资需求列表
        </NavBar>
        <div>
          <Accordion>
            <Accordion.Panel header="物资类型筛选">
              <List>
                {supplies.map(supply => (
                  <Checkbox.CheckboxItem
                    key={supply.id}
                    checked={filter.supplies.includes(supply.id)}
                    // onChange={TODO change the value in redux}
                  >
                    {supply.name}
                  </Checkbox.CheckboxItem>
                ))}
              </List>
            </Accordion.Panel>
          </Accordion>
        </div>
        <WhiteSpace />
        <div>
          <WingBlank size="md">
            {hospitals.map(hospital => (
              <Card className="hospital-card" key={hospital["区县"]} full>
                <Card.Header
                  title={
                    <span
                      style={{
                        fontSize: "16px",
                        textAlign: "center",
                        width: "100%"
                      }}
                    >
                      {hospital["医院名称"]}
                    </span>
                  }
                  // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                  extra={<Badge text={hospital["区县"]} />}
                />
                <Card.Body>
                  <Grid
                    data={Object.keys(hospital)
                      .filter(
                        key =>
                          ![
                            "区县",
                            "医院名称",
                            "官方链接",
                            "医院地址",
                            "联系方式",
                            "审核状态",
                            "备注"
                          ].includes(key)
                      )
                      .filter(key => hospital[key])}
                    columnNum={2}
                    square={false}
                    hasLine={false}
                    renderItem={key => (
                      <div key={key} className="card-supplies">
                        <div className="card-supplies-name">{key}</div>
                        <WhiteSpace size="sm" />
                        <div className="card-supplies-number">
                          {hospital[key]}
                        </div>
                      </div>
                    )}
                  ></Grid>
                </Card.Body>
                <Card.Footer
                  content={
                    <Flex justify="end">
                      <Flex.Item>
                        <div className="card-action-icon">
                          <Icon size="md" type="check-circle-o" />
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <Link
                          className="card-action-icon"
                          to={"/hospitals/" + hospital.id}
                        >
                          <Icon size="md" type="ellipsis" />
                        </Link>
                      </Flex.Item>
                    </Flex>
                  }
                />
              </Card>
            ))}
          </WingBlank>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hospitals: selectAllHospital(state.hospitals),
    filter: state.demand.filter,
    supplies: state.demand.text
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(hospitalActions, dispatch)
  };
}

export default Hospitals;
