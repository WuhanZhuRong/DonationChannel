import React from "react";
import { connect } from "react-redux";

@connect(mapStateToProps, mapDispatchToProps)
class Hospitals extends React.Component {
  render() {
    return (
        <div>
          Hospitals
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default Hospitals;
