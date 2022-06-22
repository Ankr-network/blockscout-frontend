import { observer } from 'mobx-react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { IThresholdKey, PrefixedHex, UUID } from 'multirpc-sdk';
import { PlusOutlined } from '@ant-design/icons';

export type TNotarizeTransactionFormHandler = (form: {
  threshold_key: UUID;
  chain_id: PrefixedHex;
  transaction_hash: PrefixedHex;
  block_number?: number;
  transaction_index?: number;
}) => void;

export interface INotarizeTransactionFormProps {
  thresholdKeys: IThresholdKey[];
  onSubmit?: TNotarizeTransactionFormHandler;
  isFetching?: boolean;
  isLoading?: boolean;
}

const NotarizeTransactionForm = observer(
  (props: INotarizeTransactionFormProps) => {
    return (
      <Form
        layout="vertical"
        onFinish={values => {
          if (props.onSubmit) {
            props.onSubmit(values);
          }
        }}
      >
        <Row gutter={24}>
          <Col span={20} offset={2}>
            <Form.Item
              name="threshold_key"
              label="Threshold Key"
              rules={[
                { required: true, message: 'Required field' },
                {
                  pattern:
                    /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/,
                  message: 'Required field',
                },
              ]}
            >
              <Select
                placeholder="Please select a threshold key"
                loading={props.isFetching}
              >
                {props.thresholdKeys.map(tk => (
                  <Select.Option value={tk.id}>
                    {tk.party}&nbsp;({tk.id})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="chain_id"
              label="Chain"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select placeholder="Please select a chain">
                <Select.Option value="0x01">Ethereum Mainnet</Select.Option>
                <Select.Option value="0x05">Ethereum Goerli</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="transaction_hash"
              label="Transaction hash"
              rules={[
                { required: true, message: 'Required field' },
                {
                  pattern: /^0x[0-9a-f]+/,
                  message: 'Must be 0x prefix hexed hash',
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="block_number"
              label="Block number"
              rules={[{ min: 0, message: 'Must be number' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="transaction_index"
              label="Transaction index"
              rules={[{ min: 0, message: 'Must be number' }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
          <Button
            type="primary"
            loading={props.isLoading}
            disabled={props.isLoading}
            htmlType="submit"
            icon={<PlusOutlined />}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  },
);

export default NotarizeTransactionForm;
