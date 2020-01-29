import React from "react";
import { setDemandsFilter } from "../../redux/demand/index";
import { connect } from "react-redux";
import { SearchBar, Button } from "antd-mobile";
import { withRouter } from "react-router-dom";

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
class Search extends React.Component {
  state = {
    filter: {
      cityCode: "",
      supplies: []
    }
  };

  componentDidMount() {
    const { filter } = this.props;
    this.setState({
      filter
    });
  }

  handleCityCodeChange = value => {
    this.setState({ filter: { cityCode: value } });
  };

  handleSubmit = () => {
    const { filter } = this.state;
    this.props.submit(filter);
    this.props.history.push("/hospitals");
  };

  render() {
    const {
      filter: { cityCode }
    } = this.state;
    return (
      <div>
        <SearchBar
          value={cityCode}
          onChange={this.handleCityCodeChange}
          placeholder="输入捐赠城市"
          maxLength={8}
        />
        <Button onClick={this.handleSubmit}>click me</Button>
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
