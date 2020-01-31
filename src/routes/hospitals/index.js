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
    this.props.searchHospital(this.props.filter);
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
              <Card className="hospital-card" key={hospital.id} full>
                <Card.Header
                  title={
                    <span
                      style={{
                        fontSize: "16px",
                        textAlign: "center",
                        width: "100%"
                      }}
                    >
                      {hospital.name}
                    </span>
                  }
                  extra={<Badge text={hospital.province} />}
                />
                <Card.Body>
                  {hospital.supplies && (
                    <Grid
                      data={hospital.supplies.split("、") || []}
                      columnNum={2}
                      square={false}
                      hasLine={false}
                      renderItem={supply => (
                        <div
                          key={supply ? supply.name : ""}
                          className="card-supplies"
                        >
                          <div className="card-supplies-name">{supply}</div>
                          <WhiteSpace size="sm" />
                          <div className="card-supplies-number">{"不限量"}</div>
                        </div>
                      )}
                    />
                  )}
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
    supplies: state.demand.flatSupplies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(hospitalActions, dispatch)
  };
}

export default Hospitals;
