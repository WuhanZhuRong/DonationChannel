import React from "react";
import { connect } from "react-redux";
import { Badge, WingBlank, WhiteSpace, Card, Icon, Flex, Grid, Accordion, List, Checkbox } from "antd-mobile"
import { hospitalActions } from "../../redux/hospitals";
import { bindActionCreators } from "redux";

@connect(mapStateToProps, mapDispatchToProps)
class Detail extends React.Component {

  render() {

    console.log('detail id:', this.props.match.params.id);

    return (
        <div>
          detail
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(hospitalActions, dispatch)
  };
}

export default Detail;
