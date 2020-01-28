import React from "react";
import { getDemands } from "../../redux/demand/index";
import { connect } from "react-redux";
import { Button } from "antd-mobile";

@connect(mapStateToProps, mapDispatchToProps)
class Search extends React.Component {
  render() {
    const { onGetDemands, text } = this.props;
    return (
      <div>
        <h1>{text}</h1>
        <Button onClick={onGetDemands}>click me</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { text: state.demand.text };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetDemands: () => dispatch(getDemands)
  };
}

export default Search;
