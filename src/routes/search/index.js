import React from "react";
import { connect } from "react-redux";
import { List, Button, Tag, Flex, Picker, NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { setDemandsFilter } from "../../redux/demand/index";

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

const supplies = [
  {
    name: "口罩",
    types: [
      {
        name: "医用外科口罩",
        id: 1
      },
      {
        name: "n95口罩",
        id: 2
      },
      {
        name: "一次性医用口罩",
        id: 3
      }
    ]
  },
  {
    name: "面屏眼罩",
    types: [
      { name: "防护面罩", id: 4 },
      { name: "防冲击眼罩", id: 5 },
      { name: "防护目镜", id: 6 },
      { name: "防护眼镜", id: 7 },
      { name: "一次性医用帽子", id: 8 }
    ]
  },
  {
    name: "医疗设备",
    types: [
      { name: "测体温设备", id: 9 },
      { name: "空气消毒设备", id: 10 },
      { name: "医用紫外线消毒车", id: 11 }
    ]
  }
];

function Supply(props) {
  const content = props.supplies.map(supply => (
    <div key={supply.name}>
      <Title>{supply.name}</Title>
      <TagContainer>
        {supply.types.map(type => (
          <Tag
            key={type.id}
            onChange={selected => props.handleSelect(type.id, selected)}
          >
            {type.name}
          </Tag>
        ))}
      </TagContainer>
    </div>
  ));

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

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class Search extends React.Component {
  state = {
    cityCode: [],
    supplies: [],
    antdDistrict: []
  };

  componentDidMount() {
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
          cityCodeArr = [itemLevel1.code, cityCode];
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

  handleSubmit = () => {
    const { supplies, cityCode } = this.state;
    this.props.submit({
      supplies,
      cityCode: cityCode.length >= 2 && cityCode[1]
    });
    this.props.history.push("/hospitals");
  };

  handleJump = () => {
    this.props.history.push("/hospitals");
  };

  render() {
    const { cityCode, antdDistrict } = this.state;
    const { handleSelect } = this;
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
              data={antdDistrict}
              value={cityCode}
              onChange={v => this.handleCityCodeChange(v)}
              cols={2}
            >
              <CustomChildren>请选择捐赠地区</CustomChildren>
            </Picker>
          </List>
          <Supply {...{ supplies, handleSelect }} />
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
  return { filter: state.demand.filter };
}

function mapDispatchToProps(dispatch) {
  return {
    submit: filter => {
      dispatch(setDemandsFilter(filter));
    }
  };
}

export default Search;
