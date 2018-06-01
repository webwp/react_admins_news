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
  Upload,
  Rate,
  Slider,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="案件来源" hasFeedback>
              {getFieldDecorator('select', {
                rules: [{ required: true, message: '请选着案件来源!' }],
              })(
                <Select placeholder="请选着案件来源">
                  <Option value="0">南宁数字化城管</Option>
                  <Option value="1">其它</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="来源编号">
              {getFieldDecorator('input-number', { initialValue: 3 })(<Input min={1} max={10} />)}
            </FormItem>

            <FormItem {...formItemLayout} label="案件名称" hasFeedback>
              {getFieldDecorator('input-number', { initialValue: 3 })(<Input min={1} max={10} />)}
            </FormItem>

            <FormItem {...formItemLayout} label="案件类型" hasFeedback>
              {getFieldDecorator('select', {
                rules: [{ required: true, message: '请选着案件类型!' }],
              })(
                <Select placeholder="请选着案件类型">
                  <Option value="0">灯箱不亮</Option>
                  <Option value="1">破损</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="城区" hasFeedback>
              {getFieldDecorator('select', {
                rules: [{ required: true, message: '请选着案件类型!' }],
              })(
                <Select placeholder="请选着案件类型">
                  <Option value="0">灯箱不亮</Option>
                  <Option value="1">破损</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="路段" hasFeedback>
              {getFieldDecorator('select', {
                rules: [{ required: true, message: '请选着案件类型!' }],
              })(
                <Select placeholder="请选着案件类型">
                  <Option value="0">灯箱不亮</Option>
                  <Option value="1">破损</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="案件站点">
              {getFieldDecorator('radio-group')(
                <RadioGroup>
                  <Radio value="a">站点</Radio>
                  <Radio value="b">候车亭</Radio>
                </RadioGroup>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="到期时限">
              {getFieldDecorator('date-picker')(<DatePicker />)}
            </FormItem>

            <FormItem {...formItemLayout} label="图片" extra="">
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> 图片
                  </Button>
                </Upload>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="文件">
              <div className="dropbox">
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">文件上传</p>
                  </Upload.Dragger>
                )}
              </div>
            </FormItem>

            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
              <Button style={{ marginRight: '5px' }} type="primary" htmlType="submit">
                保存并派出
              </Button>
              <Button style={{ marginRight: '5px' }} htmlType="submit">
                保存
              </Button>
              <Button style={{ marginRight: '5px' }} htmlType="submit">
                取消
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
