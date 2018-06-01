import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Steps, Popover, List } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicProfile.less';

const { Description } = DescriptionList;
const Step = Steps.Step;
const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

const progressColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '当前进度',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="processing" text="进行中" />
      ),
  },
  {
    title: '操作员ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '耗时',
    dataIndex: 'cost',
    key: 'cost',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
export default class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { profile, loading } = this.props;
    const { basicGoods, basicProgress } = profile;
    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: '商品编号',
        dataIndex: 'id',
        key: 'id',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        render: renderContent,
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'right',
        render: renderContent,
      },
      {
        title: '数量（件）',
        dataIndex: 'num',
        key: 'num',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];
    const step1 = (
      <List>
        <List.Item actions={[<a>立即派发</a>]}>
          <List.Item.Meta title="admin" description="2016-12-12 00：00：00" />
          <List.Item.Meta title={'admin'} description="2016-12-12 00：00：00" />
          <div>未派发</div>
        </List.Item>
      </List>
    );
    return (
      <PageHeaderLayout title="案件详情">
        <Card bordered={false}>
          <DescriptionList size="large" title="案件基本信息" style={{ marginBottom: 32 }}>
            <Description term="编号">1000000000</Description>
            <Description term="案件来源">白沙星光立交（上行）</Description>
            <Description term="来源编号">123.4123421,20.4123421</Description>
            <Description term="案件名称">环2；12路；25路；29路；213路</Description>

            <Description term="案件类型">江南区</Description>
            <Description term="城区">白沙大道</Description>
            <Description term="路段">精品路段</Description>
            <Description term="案件地点">人行道港湾式站台</Description>

            <Description term="到期时限">三角站牌</Description>
            <Description term="广告公司">桂永辉</Description>
            <Description term="处理情况">2018年1月-2019年1月</Description>
            <Description term="验收情况">白沙星光立交（南）</Description>

            <Description term="分管人">2013年款式</Description>
            <div
              className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24"
              style={{ paddingLeft: '16px', paddingRight: '16px' }}
            >
              <div className="index__term___3Nnpj">案件内容描述</div>
              <div style={{ display: 'table-cell' }}>图文信息</div>
            </div>
            <div
              className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24"
              style={{ paddingLeft: '16px', paddingRight: '16px' }}
            >
              <div className="index__term___3Nnpj">图片</div>
              <div style={{ display: 'table-cell' }}>
                <img
                  src="./public/favicon.png"
                  width="80"
                  height="80"
                  style={{ marginRight: '10px' }}
                />
                <img
                  src="./public/favicon.png"
                  width="80"
                  height="80"
                  style={{ marginRight: '10px' }}
                />
                <img
                  src="./public/favicon.png"
                  width="80"
                  height="80"
                  style={{ marginRight: '10px' }}
                />
              </div>
            </div>
            <div
              className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24"
              style={{ paddingLeft: '16px', paddingRight: '16px' }}
            >
              <div className="index__term___3Nnpj">附件</div>
              <div style={{ display: 'table-cell' }}>
                关于xx候车亭整改的通知文档.docx
                <br />
                关于xx候车亭整改的通知文档.docx
              </div>
            </div>
          </DescriptionList>
        </Card>
        <br />
        <Card bordered={false}>
          <Steps current={1} progressDot={customDot} direction="vertical">
            <Step title="案件派发" description={step1} />
            <Step
              title="确认接收"
              description={
                <List>
                  <List.Item>
                    <List.Item.Meta title="admin" description="2016-12-12 00：00：00" />
                    <List.Item.Meta title={'admin'} description="2016-12-12 00：00：00" />
                  </List.Item>
                </List>
              }
            />
            <Step
              title="案件完成处理"
              description={
                <List>
                  <List.Item style={{ border: 'none' }}>
                    <List.Item.Meta
                      style={{ display: 'block', width: '100%' }}
                      title="admin"
                      description="2016-12-12 00：00：00"
                    />
                  </List.Item>
                  <div style={{ display: 'block' }}>
                    <p style={{ color: 'green' }}>
                      签到地点：站点/候车亭名称（坐标：xxxxxxxxxxxxxxxxxxxxxxxxxxxxx）
                    </p>
                    <div>
                      <img
                        src="./public/favicon.png"
                        width="80"
                        height="80"
                        style={{ marginRight: '10px' }}
                      />
                      <img
                        src="./public/favicon.png"
                        width="80"
                        height="80"
                        style={{ marginRight: '10px' }}
                      />
                      <img
                        src="./public/favicon.png"
                        width="80"
                        height="80"
                        style={{ marginRight: '10px' }}
                      />
                    </div>
                  </div>
                </List>
              }
            />
            <Step
              title="验收不通过"
              description={
                <List>
                  <List.Item style={{ border: 'none' }}>
                    <List.Item.Meta
                      style={{ display: 'block', width: '100%' }}
                      title="admin"
                      description="2016-12-12 00：00：00"
                    />
                  </List.Item>
                  <div style={{ display: 'block' }}>
                    <div>
                      <img
                        src="./public/favicon.png"
                        width="80"
                        height="80"
                        style={{ marginRight: '10px' }}
                      />
                      <img
                        src="./public/favicon.png"
                        width="80"
                        height="80"
                        style={{ marginRight: '10px' }}
                      />
                      <img
                        src="./public/favicon.png"
                        width="80"
                        height="80"
                        style={{ marginRight: '10px' }}
                      />
                    </div>
                    <p style={{ color: 'red' }}>备注：未按要求处理 需要整改</p>
                  </div>
                </List>
              }
            />

            <Step title="案件派发" description="You can hover on the dot." />
            <Step title="确认接收" description="You can hover on the dot." />
          </Steps>
        </Card>
      </PageHeaderLayout>
    );
  }
}
