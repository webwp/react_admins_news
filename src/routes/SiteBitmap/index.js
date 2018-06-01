import React, { Component, PureComponent, Fragment } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
  Form,
  Input,
} from 'antd';
import styles from './TableList.less';

const FormItem = Form.Item;
const action = (
  <Fragment>
    <Button type="primary">导出图片</Button>
  </Fragment>
);

const columns = [
  {
    title: '站点',
    dataIndex: 'site',
    key: 'site',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '候车亭',
    dataIndex: 'shelter',
    key: 'shelter',
  },
  {
    title: '已接电',
    dataIndex: 'Already',
    key: 'Already',
  },
  {
    title: '三角站牌',
    dataIndex: 'triangleStop',
    key: 'triangleStop',
  },
  {
    title: '双杆站牌',
    dataIndex: 'DoubleStop',
    key: 'DoubleStop',
  },
  {
    title: '小灯箱站牌',
    dataIndex: 'lightBox',
    key: 'lightBox',
  },
];
const data = [
  {
    site: 124,
    shelter: 180,
    Already: 32,
    triangleStop: 888,
    DoubleStop: 123,
    lightBox: 2345,
  },
];

@Form.create()
export default class Index extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderLayout title="点位图" action={action}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={6} sm={24}>
                    <FormItem label="城区">
                      {getFieldDecorator('no')(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col md={6} sm={24}>
                    <FormItem label="站点名称">
                      {getFieldDecorator('no')(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col md={6} sm={24}>
                    <FormItem label="候车亭名称">
                      {getFieldDecorator('no')(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col md={6} sm={24}>
                    <span className={styles.submitButtons}>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                      <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                        重置
                      </Button>
                    </span>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          <Table columns={columns} dataSource={data} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
