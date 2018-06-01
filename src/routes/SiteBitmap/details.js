import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicProfile.less';

const { Description } = DescriptionList;

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
    return (
      <PageHeaderLayout title="点位详情">
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
            <Description term="编号">1000000000</Description>
            <Description term="站点名称">白沙星光立交（上行）</Description>
            <Description term="站点坐标">123.4123421,20.4123421</Description>
            <Description term="途径线路">环2；12路；25路；29路；213路</Description>

            <Description term="城区">江南区</Description>
            <Description term="所属路段">白沙大道</Description>
            <Description term="路段性质">精品路段</Description>
            <Description term="站台类型">人行道港湾式站台</Description>

            <Description term="站牌类型">三角站牌</Description>
            <Description term="站牌归属广告公司">桂永辉</Description>
            <Description term="经营期限">2018年1月-2019年1月</Description>
            <Description term="候车亭名称">白沙星光立交（南）</Description>

            <Description term="款式">2013年款式</Description>
            <Description term="现有规模">4大2小</Description>
            <Description term="合同规模">2大2小</Description>
            <Description term="接电状态">接电</Description>

            <Description term="候车凳">3</Description>
            <Description term="始建时间">2010年3月20日</Description>
            <Description term="重建时间">2010年3月20日</Description>
            <Description term="经营期限">2018年1月-2019年1月</Description>

            <Description term="候车亭迁移情况">
              南宁轨道交通2号线道路整治提升工程拆除回厂（2015-12-10） <br />{' '}
              南宁轨道交通2号线道路整治提升工程拆除回厂（2011-12-10）
            </Description>
            <Description term="候车亭归属广告公司">南宁蓝天传媒广告公司</Description>
            <Description term="合同名称">合同名称</Description>
            <Description term="分管人">付小小</Description>
            <div
              className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24"
              style={{ paddingLeft: '16px', paddingRight: '16px' }}
            >
              <div className="index__term___3Nnpj">站点/候车亭原始图片</div>
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
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
