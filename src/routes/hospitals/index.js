import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  Badge,
  WhiteSpace,
  Card,
  Icon,
  Flex,
  Accordion,
  List,
  Checkbox,
  NavBar,
  Toast,
  ListView,
  Button
} from "antd-mobile";
import "./style.css";
import { hospitalActions } from "../../redux/hospitals";
import { bindActionCreators } from "redux";
import copy from "copy-to-clipboard";
import { demandActions } from "../../redux/demand";

const PAGE_SIZE = 10;

const StyledCard = styled(Card)`
  margin-bottom: 10px;

  .card-action-icon {
    padding: 8px;
    font-size: 20px;
  }

  .am-card-footer {
    border-top: #eee 1px solid;
  }
`;

@connect(mapStateToProps, mapDispatchToProps)
class Hospitals extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      dataSource,
      hospitals: [],
      isLoading: false,
      hasNextPage: true,
      page: 0,
    };
  }

  componentDidMount() {
    if (this.props.supplies) {
      this.props.fetchSupplies();
    }
    this.reloadData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.hospitals !== nextProps.hospitals) {
      return {
        dataSource: prevState.dataSource.cloneWithRows(nextProps.hospitals),
        hospitals: nextProps.hospitals,
        isLoading: false,
        hasNextPage: nextProps.hasNextPage
      };
    }
    return null;
  }

  reloadData() {
    let { page } = this.state;
    this.props.searchHospital(this.props.filter, page + 1, PAGE_SIZE);
    this.setState({ page: page + 1 })
  }

  onEndReached = event => {
    if (!this.state.hasNextPage) {
      return;
    }
    if (this.state.isLoading) {
      return;
    }
    let { page } = this.state;
    this.props.searchHospital(this.props.filter, page + 1, PAGE_SIZE);

    this.setState({ isLoading: true, page: page + 1 });
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
      const onClick = () => this.props.history.push("/hospitals/" + hospital.id);
      return (
        <StyledCard full >
          <Card.Header
            onClick={onClick}
            title={
              <span style={{ width: "100%", lineHeight: "30px" }}>
                <span
                  style={{
                    fontSize: "16px",
                    float: "left"
                  }}
                >
                  {hospital.hospital}
                </span>
                <span style={{ float: "right" }}>
                  <Badge text={hospital.province} />
                </span>
              </span>
            }
          />
          <Card.Body onClick={onClick}>
            {hospital.supplies &&
              (hospital.supplies.map(supply => (
                <div key={supply.name} className="card-supplies">
                  <div className="card-supplies-name">{supply.name}</div>
                  <div className="card-supplies-number">{supply.amount <= 0 ? "不限量" : supply.amount}</div>
                </div>
              )))}
          </Card.Body>
          <Card.Footer
            content={
              <Flex justify="end">
                <Flex.Item>
                  <div
                    className="card-action-icon"
                    onClick={() =>
                      this.copyToClickBoard(hospital.mobile, "联系方式")
                    }
                  >
                    <i className="ai-phone" />
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div
                    className="card-action-icon"
                    onClick={() =>
                      this.copyToClickBoard(hospital.street, "医院地址")
                    }
                  >
                    <i className="ai-home" />
                  </div>
                </Flex.Item>
              </Flex>
            }
          />
        </StyledCard>
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
            <Accordion.Panel
              header="物资类型筛选"
              ref={ap => (this.filterAccordion = ap)}
            >
              <List>
                {supplies.map(supply => (
                  <Checkbox.CheckboxItem
                    key={supply.id}
                    checked={filter.supplies.includes(supply.id)}
                    onChange={() =>
                      this.props.changeSelectedSupplies(
                        supply.id,
                        !filter.supplies.includes(supply.id)
                      )
                    }
                  >
                    {supply.name}
                  </Checkbox.CheckboxItem>
                ))}
                <Button
                  onClick={() => {
                    this.filterAccordion.handleItemClick();
                    this.reloadData();
                  }}
                >
                  确认
                </Button>
              </List>
            </Accordion.Panel>
          </Accordion>
        </div>
        <WhiteSpace />
        <ListView
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: "center" }}>
              {this.state.isLoading ? "加载中..." : "没有更多了"}
            </div>
          )}
          renderRow={row}
          className="list_view"
          pageSize={PAGE_SIZE}
          useBodyScroll
          onScroll={() => {}}
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
    hospitals: state.hospitals.data,
    filter: state.demand.filter,
    supplies: state.demand.flatSupplies,
    hasNextPage: state.hospitals.hasNextPage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(hospitalActions, dispatch),
    ...bindActionCreators(demandActions, dispatch)
  };
}

export default Hospitals;
