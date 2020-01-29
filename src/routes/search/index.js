import React from "react";
import { connect } from "react-redux";
import { SearchBar, Button, Flex, Tag } from "antd-mobile";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { setDemandsFilter } from "../../redux/demand/index";

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
  }
];

function Supply(props) {
  const content = props.supplies.map(supply => (
    <div>
      <Title>{supply.name}</Title>
      <TagContainer>
        {supply.types.map(type => (
          <Tag onChange={selected => props.handleSelect(type.id, selected)}>
            {type.name}
          </Tag>
        ))}
      </TagContainer>
    </div>
  ));

  return content;
}

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
class Search extends React.Component {
  state = {
    cityCode: "",
    supplies: []
  };

  componentDidMount() {
    const {
      filter: { supplies, cityCode }
    } = this.props;
    this.setState({
      cityCode,
      supplies
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
      filter: {
        supplies,
        cityCode
      }
    });
    // this.props.history.push("/hospitals");
  };

  render() {
    const { cityCode } = this.state;
    const { handleSelect } = this;
    return (
      <div>
        <SearchBar
          value={cityCode}
          onChange={this.handleCityCodeChange}
          placeholder="输入捐赠城市"
          maxLength={8}
        />
        {Supply({ supplies, handleSelect })}
        <Flex>
          <Flex.Item>
            <Button type="primary" onClick={this.handleSubmit}>
              提交
            </Button>
          </Flex.Item>
          <Flex.Item>
            <Button onClick={this.handleSubmit}>我是游客</Button>
          </Flex.Item>
        </Flex>
      </div>
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
