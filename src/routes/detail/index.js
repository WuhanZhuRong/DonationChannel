import React from "react";
import { connect } from "react-redux";
import { WhiteSpace, Card, Icon, List } from "antd-mobile"
import { hospitalActions } from "../../redux/hospitals";
import { bindActionCreators } from "redux";
import "./style.css"

@connect(mapStateToProps, mapDispatchToProps)
class Detail extends React.Component {

  render() {

    console.log('detail id:', this.props.match.params.id);

    return (
        <div>
          <Card className='detail-card' full>
            <Card.Header
                title={
                  <div className='detail-card-header'>
                    <div className='detail-card-header-left'>
                      <h3 className='detail-card-header-left-name'>华中科技大学同济医学院附属医院</h3>
                      <WhiteSpace />
                      <span className='detail-card-header-left-address'>地址： 湖北省武汉市xxxxxx</span>
                    </div>
                    <div className='detail-card-header-right'>
                      <span className='detail-card-header-right-phone'><Icon type='loading' /></span>
                      <span className='detail-card-header-right-copy'><Icon type='loading' /></span>
                    </div>
                  </div>
                }
            />
            <Card.Body className='detail-card-body'>
              {
                [1, 2, 3].map(i => (
                    <div key={i} className='detail-card-body-category'>
                      <h4 className='detail-card-body-category-name'>口罩</h4>
                      <List className='detail-card-body-category-list'>
                        {[1, 2, 3].map(i => (
                            <List.Item key={i} className='detail-card-body-category-list-item' extra={
                              '不限'
                            }>
                              n95防护口罩
                            </List.Item>
                        ))}
                      </List>
                    </div>
                ))
              }

            </Card.Body>
          </Card>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(hospitalActions, dispatch)
  };
}

export default Detail;
