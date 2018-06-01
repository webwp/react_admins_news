import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class Editor extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="编辑案件" content="">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="案件来源">
              {getFieldDecorator('owner', {
                rules: [{ required: true, message: '请选择管理员' }],
              })(
                <Select placeholder="请选择管理员">
                  <Option value="xiao">市场热线</Option>
                  <Option value="mao">南宁数字化城管</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="来源编号">
              {getFieldDecorator('bianhao', {
                rules: [
                  {
                    required: true,
                    message: '请输入来源编号',
                  },
                ],
              })(<Input placeholder="请输入来源编号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="案件名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
              })(<Input placeholder="请输入案件名称" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="案件类型">
              {getFieldDecorator('owner', {
                rules: [{ required: true, message: '请选择案件类型' }],
              })(
                <Select placeholder="请选择案件类型">
                  <Option value="xiao">灯箱不亮</Option>
                  <Option value="mao">主题破损</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="城区">
              {getFieldDecorator('owner', {
                rules: [{ required: true, message: '请选择城区' }],
              })(
                <Select placeholder="请选择城区">
                  <Option value="xiao">西乡塘</Option>
                  <Option value="mao">兴宁</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="路段">
              {getFieldDecorator('owner', {
                rules: [{ required: true, message: '请选择路段' }],
              })(
                <Select placeholder="请选择路段">
                  <Option value="xiao">青山路</Option>
                  <Option value="mao">秀灵路</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="案件站点">
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">站点</Radio>
                    <Radio value="2">候车亭</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
