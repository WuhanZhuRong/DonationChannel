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
  NavBar,
  Toast,
  ListView,
  Button
} from "antd-mobile";
import "./style.css";
import { hospitalActions, selectAllHospital } from "../../redux/hospitals";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import copy from "copy-to-clipboard";
import { demandActions } from "../../redux/demand";

let page;
const size = 10;

@connect(mapStateToProps, mapDispatchToProps)
class Hospitals extends React.Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      hospitals: [],
      isLoading: false
    }
  }

  componentDidMount() {
    if(this.props.supplies) {
      this.props.fetchSupplies();
    }
    this.reloadData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(prevState.hospitals !== nextProps.hospitals) {
      return {
        dataSource: prevState.dataSource.cloneWithRows(nextProps.hospitals),
        hospitals: nextProps.hospitals,
        isLoading: false
      }
    }
    return null;
  }

  reloadData() {
    page = 1;
    this.props.searchHospital(this.props.filter, page++, size);
  }

  onEndReached = (event) => {
    if (this.state.isLoading) {
      return;
    }
    this.setState({ isLoading: true });
    this.props.searchHospitalInAdditional(this.props.filter, page++, size);
  };

  copyToClickBoard = (res, type) => {
    if (copy(res)) {
      Toast.success(`${type}已复制到粘贴板`);
    } else {
      Toast.fail("复制失败");
    }
  };


  render() {
    const { hospitals, filter, supplies } = this.props;

    const row = (rowData, sectionID, rowID) => {
      const hospital = hospitals[rowID];
      return (
          <WingBlank size="md" key={rowID}>
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
                          <div
                              className="card-action-icon"
                              onClick={() =>
                                  this.copyToClickBoard(hospital.phone, "联系方式")
                              }
                          >
                            <i className="ai-phone" />
                          </div>
                        </Flex.Item>
                        <Flex.Item>
                          <div
                              className="card-action-icon"
                              onClick={() =>
                                  this.copyToClickBoard(hospital.address, "医院地址")
                              }
                          >
                            <i className="ai-home" />
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
          </WingBlank>
      );
    };

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
            <Accordion.Panel header="物资类型筛选" ref={ap => this.filterAccordion = ap}>
              <List>
                {supplies.map(supply => (
                  <Checkbox.CheckboxItem
                    key={supply.id}
                    checked={filter.supplies.includes(supply.id)}
                    onChange={() => this.props.changeSelectedSupplies(supply.id, !filter.supplies.includes(supply.id))}
                  >
                    {supply.name}
                  </Checkbox.CheckboxItem>
                ))}
                <Button onClick={() => {this.filterAccordion.handleItemClick();this.reloadData();} }>确认</Button>
              </List>
            </Accordion.Panel>
          </Accordion>
        </div>
        <WhiteSpace />
        <ListView
            dataSource={this.state.dataSource}
            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? 'Loading...' : 'Loaded'}
            </div>)}
            renderRow={row}
            className="list_view"
            pageSize={size}
            useBodyScroll
            onScroll={() => { console.log('scroll'); }}
            scrollRenderAheadDistance={500}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
        />
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
    ...bindActionCreators(hospitalActions, dispatch),
    ...bindActionCreators(demandActions, dispatch)
  };
}

export default Hospitals;
