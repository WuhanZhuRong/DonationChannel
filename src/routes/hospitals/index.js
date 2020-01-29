import React from "react";
import { connect } from "react-redux";
import { Badge, WingBlank, WhiteSpace, Card, Icon, Flex, Grid, Accordion, List, Checkbox } from "antd-mobile"
import './style.css'

const hospitalList = [{
  "区县": "江汉区",
  "医院名称": "华中科技大学同济医学院附属协和医院",
  "普通医用口罩": 1,
  "医用外科口罩": 1,
  "医用防护口罩 | N95口罩": 1,
  "防冲击眼罩/护目镜/防护眼镜": 1,
  "防护面罩": 1,
  "防护帽/医用帽/圆帽": 1,
  "隔离衣": null,
  "防护服": 1,
  "手术衣": null,
  "乳胶手套": null,
  "长筒胶鞋/防污染靴": null,
  "防污染鞋套": null,
  "防污染靴套": null,
  "84消毒液": null,
  "过氧乙酸": null,
  "75%酒精": null,
  "手部皮肤消毒液": null,
  "活力碘": null,
  "床罩": null,
  "医用面罩式雾化器": null,
  "测体温设备": null,
  "空气消毒设备": null,
  "医用紫外线消毒车": null,
  "官方链接": "https://mp.weixin.qq.com/s/geO3CCd0_8B3L-r_xlBbZQ",
  "医院地址": "湖北省武汉市江汉区解放大道1277号华中科技大学同济医学院附属协和医院总务处",
  "联系方式": "13807138996 吕老师 13971115010 程老师  13477037766支老师",
  "备注": null,
  "审核状态": "已审核"
},
  {
    "区县": "红安县",
    "医院名称": "红安县人民医院",
    "普通医用口罩": 1,
    "医用外科口罩": 1,
    "医用防护口罩 | N95口罩": 1,
    "防冲击眼罩/护目镜/防护眼镜": 1,
    "防护面罩": null,
    "防护帽/医用帽/圆帽": 1,
    "隔离衣": null,
    "防护服": 1,
    "手术衣": null,
    "乳胶手套": 1,
    "长筒胶鞋/防污染靴": 1,
    "防污染鞋套": 1,
    "防污染靴套": 1,
    "84消毒液": null,
    "过氧乙酸": null,
    "75%酒精": null,
    "手部皮肤消毒液": null,
    "活力碘": null,
    "床罩": null,
    "医用面罩式雾化器": null,
    "测体温设备": null,
    "空气消毒设备": null,
    "医用紫外线消毒车": null,
    "官方链接": "https://mp.weixin.qq.com/s/geO3CCd0_8B3L-r_xlBbZQ",
    "医院地址": "红安县人民医院红安县城关镇陵园大道附50号",
    "联系方式": "0713-5242320",
    "备注": "设备科周主任13636105950",
    "审核状态": "已审核"
  }];

const supplies = ["医用外科口罩","n95口罩","一次性医用口罩","防护面罩","防冲击眼罩","防护目镜","防护眼镜","一次性医用帽子","医学防护服","手术衣","反穿隔离衣","医用一次性乳胶手套","长袖橡胶手套","长筒胶鞋","防水防污染鞋套","防污染靴",
  "酒精","消毒液","过氧乙酸","皮肤消毒液","测体温设备","空气消毒设备","医用紫外线消毒车"

];

@connect(mapStateToProps, mapDispatchToProps)
class Hospitals extends React.Component {
  render() {
    return (
        <div>
          <div>
            <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
              <Accordion.Panel header="物资列表">
                <List>
                {supplies.map(item => (
                    <Checkbox.CheckboxItem key={item} >{item}</Checkbox.CheckboxItem>
                ))}
                </List>
              </Accordion.Panel>
            </Accordion>
          </div>
          <WhiteSpace />
          <div>
            <WingBlank size='md'>
              {hospitalList.map(hospital =>
                  <Card className='hospital-card' key={hospital['区县']} full>
                    <Card.Header
                        title={hospital['医院名称']}
                        // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                        extra={<Badge text={hospital['区县']} />}
                    />
                    <Card.Body>
                      <Grid data={
                        Object.keys(hospital)
                            .filter(key => !['区县','医院名称','官方链接','医院地址','联系方式','审核状态','备注'].includes(key))
                            .filter(key => hospital[key])}
                          columnNum={2}
                          square={false}
                          hasLine={false}
                          renderItem={key => (
                              <div key={key} className='card-supplies'>
                                <div className='card-supplies-name'>{key}</div>
                                <WhiteSpace size='sm' />
                                <div className='card-supplies-number'>{hospital[key]}</div>
                              </div>
                          )}>
                      </Grid>
                    </Card.Body>
                    <Card.Footer content={
                      <Flex justify='end'>
                        <Flex.Item>
                          <div className='card-action-icon'>

                          <Icon size='md' type='check-circle-o' />
                          </div>
                        </Flex.Item>
                        <Flex.Item>
                          <div className='card-action-icon'>

                          <Icon size='md' type='ellipsis' />
                          </div>
                        </Flex.Item>
                      </Flex>
                    } />
                  </Card>
              )}
            </WingBlank>
          </div>
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
