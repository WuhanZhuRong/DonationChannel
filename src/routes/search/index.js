import React from "react";
import { connect } from "react-redux";
import { List, Button, Tag, Flex, Picker, NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { demandActions } from "../../redux/demand/index";

const districtData = require("../../assets/location.json");

const TagContainer = styled.div`
  display: flex;
  padding-top: 9px;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    margin-left: 9px;
    margin-bottom: 9px;
  }
`;
const Title = styled.h1`
  font-size: 14px;
  margin-left: 9px;
  margin-bottom: 0px;
  .select {
    float: right;
    color: #108ee9;
    margin-right: 9px;
  }
`;
const AffixBottom = styled.div`
  flex: 0 0 auto;
  margin-bottom: 10px;
  margin-left: 9px;
  margin-right: 9px;
`;
const Container = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const MainContent = styled.div`
  flex: 1 0 auto;
`;

function Supply(props) {
  const content = props.allSupplies.map(supply => {
    const types = props.allSupplies
      .filter(each => each.name === supply.name)
      .flatMap(each => each.types)
      .map(each => each.id);
    const selectedAll = hasSubArray(props.supplies, types);

    return (
      <div key={supply.name}>
        <Title>
          {supply.name}
          <span
            onClick={() => props.handleSelectAll(supply.name)}
            className="select"
          >
            {selectedAll ? "取消全选" : "全选"}
          </span>
        </Title>
        <TagContainer>
          {supply.types.map(type => (
            <Tag
              key={type.id}
              selected={props.supplies.includes(type.id)}
              onChange={selected => props.handleSelect(type.id, selected)}
            >
              {type.name}
            </Tag>
          ))}
        </TagContainer>
      </div>
    );
  });

  return content;
}

const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: "#fff", paddingLeft: 15 }}
  >
    <div
      className="test"
      style={{ display: "flex", height: "45px", lineHeight: "45px" }}
    >
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}
      >
        {props.children}
      </div>
      <div style={{ textAlign: "right", color: "#888", marginRight: 15 }}>
        {props.extra}
      </div>
    </div>
  </div>
);

// TODO: move it to utils
function hasSubArray(master, sub) {
  let has = true;
  sub.forEach(element => {
    if (!master.includes(element)) has = false;
  });
  return has;
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class Search extends React.Component {
  state = {
    cityCode: [],
    supplies: [],
    antdDistrict: []
  };

  componentDidMount() {
    this.props.fetchSupplies();
    const {
      filter: { supplies, cityCode }
    } = this.props;
    this.setState({
      supplies
    });

    let cityCodeArr = [];
    let antdDistrict = [];
    Object.keys(districtData).forEach(index => {
      let itemLevel1 = {};
      itemLevel1.value = districtData[index].code;
      itemLevel1.label = districtData[index].name;
      itemLevel1.children = [];
      let data = districtData[index].cities;
      Object.keys(data).forEach(index => {
        if (data[index].code === cityCode) {
          cityCodeArr = [itemLevel1.value, cityCode];
        }
        let itemLevel2 = {};
        itemLevel2.value = data[index].code;
        itemLevel2.label = data[index].name;
        itemLevel1.children.push(itemLevel2);
      });
      antdDistrict.push(itemLevel1);
    });
    this.setState({
      antdDistrict,
      cityCode: cityCodeArr
    });
  }

  handleCityCodeChange = value => {
    this.setState({ cityCode: value });
  };

  handleSelect = (id, selected) => {
    let supplies = this.state.supplies || [];
    if (selected) {
      supplies.push(id);
    } else {
      supplies.splice(supplies.indexOf(id), 1);
    }
    this.setState({ supplies });
  };

  handleSelectAll = name => {
    let types = this.props.allSupplies
      .filter(each => each.name === name)
      .flatMap(each => each.types)
      .map(each => each.id);
    if (hasSubArray(this.state.supplies, types)) {
      // 已全部选中,取消全选
      this.setState(prevState => {
        return {
          supplies: prevState.supplies.filter(each => !types.includes(each))
        };
      });
    } else {
      // 未全部选中,全选
      this.setState(prevState => {
        types = types.filter(each => !prevState.supplies.includes(each));
        types = prevState.supplies.concat(types);
        return {
          supplies: types
        };
      });
    }
  };

  handleSubmit = () => {
    const { supplies, cityCode } = this.state;
    let cityName;
    if (cityCode) {
      cityName =
        cityCode.length >= 2 &&
        districtData[cityCode[0]]["cities"][cityCode[1]]["name"];
    }
    this.props.setDemandsFilter({
      supplies,
      cityCode: cityCode.length >= 2 && cityCode[1],
      cityName
    });
    this.props.history.push("/hospitals");
  };

  handleJump = () => {
    this.props.history.push("/hospitals");
  };

  render() {
    const { allSupplies } = this.props;
    const { cityCode, antdDistrict, supplies } = this.state;
    const { handleSelect, handleSelectAll } = this;
    return (
      <Container>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.push("/");
          }}
          mode="dark"
        >
          我要捐助
        </NavBar>
        <MainContent>
          <List style={{ backgroundColor: "white" }}>
            <Picker
              title="选择地区"
              extra="全部"
              data={antdDistrict}
              value={cityCode}
              onChange={v => this.handleCityCodeChange(v)}
              cols={2}
            >
              <CustomChildren>请选择捐赠地区</CustomChildren>
            </Picker>
          </List>
          <Supply
            {...{ allSupplies, handleSelect, handleSelectAll, supplies }}
          />
        </MainContent>
        <AffixBottom>
          <Flex>
            <Flex.Item>
              <Button type="primary" onClick={this.handleSubmit}>
                匹配
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button onClick={this.handleSubmit}>查看全部需求</Button>
            </Flex.Item>
          </Flex>
        </AffixBottom>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { filter: state.demand.filter, allSupplies: state.demand.allSupplies };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(demandActions, dispatch)
  };
}

export default Search;
