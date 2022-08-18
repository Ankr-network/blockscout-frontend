import { observer } from 'mobx-react';
import { Button, Form, Input, InputNumber, Space, Tabs } from 'antd';
import { useCallback } from 'react';
import { emailValidator, web3AddressValidator } from 'utils/formValidators';
import { ICreateTestClientRequest } from 'multirpc-sdk';

interface ICreateClientFormProps {
  onOk: (formData: ICreateTestClientRequest) => void;
  onCancel: () => void;
  isLoading: boolean;
}

type TFormOutputData = {
  address: string;
  period: number;
};

const { TabPane } = Tabs;

const DAYS_TO_SECONDS_MULTIPLY_VALUE = 86400;

export const CreateClientForm = observer(
  ({ onCancel, onOk, isLoading }: ICreateClientFormProps) => {
    const onFinishTestUserCreating = useCallback(
      ({ address, period }: TFormOutputData) => {
        const modifiedFormData = {
          address,
          duration: period * DAYS_TO_SECONDS_MULTIPLY_VALUE,
        };

        onOk(modifiedFormData);
      },
      [onOk],
    );

    return (
      <>
        <Tabs size="large" type="card" defaultActiveKey="test">
          <TabPane tab="Test" key="test">
            <Form onFinish={onFinishTestUserCreating} layout="vertical">
              <Form.Item
                name="address"
                label="User wallet"
                rules={[web3AddressValidator]}
              >
                <Input required />
              </Form.Item>

              <Form.Item
                name="email"
                label="User email"
                rules={[emailValidator]}
              >
                {/* TODO: add email field when backend will accept this param */}
                <Input type="email" disabled />
              </Form.Item>

              <Form.Item
                name="period"
                label="Testing Period (days)"
                rules={[{ required: true, message: 'Amount is required' }]}
              >
                <InputNumber type="number" min="0" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item name="comment" label="Comment">
                {/* TODO: add comment field when backend will accept this param */}
                <Input disabled />
              </Form.Item>

              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  type="ghost"
                  htmlType="button"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" disabled={isLoading}>
                  Create
                </Button>
              </Space>
            </Form>
          </TabPane>
          <TabPane tab="Premium" key="premium" disabled>
            <Form layout="vertical">
              <Form.Item
                name="address"
                label="User wallet"
                rules={[web3AddressValidator]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="publicKey" label="Public key">
                <Input />
              </Form.Item>

              <Form.Item
                name="credits"
                label="Add Voucher Credits"
                rules={[{ required: true, message: 'Amount is required' }]}
              >
                <InputNumber type="number" min="0" style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </>
    );
  },
);
