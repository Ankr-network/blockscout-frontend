import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import { clientUnits } from 'components/const';
import { observer } from 'mobx-react';
import {
  IAddVoucherCreditsRequest,
  IUpdateVoucherCreditsRequest,
} from 'multirpc-sdk';
import { useCallback } from 'react';
import { ClientEntity } from 'stores/useClients/types';
import { web3AddressValidator } from 'utils/formValidators';

const { Option } = Select;

type TFormOutputData = Omit<
  IUpdateVoucherCreditsRequest,
  'reasonId' | 'amount'
> & {
  reasonId?: IAddVoucherCreditsRequest['reasonId'];
  amount: number;
};

export interface IManageClientVoucherCreditsFormProps {
  clientData: {
    address: ClientEntity['address'];
    amountCredit: ClientEntity['amount'];
    amountUsd: ClientEntity['amountUsd'];
    amountAnkr: ClientEntity['amountAnkr'];
    voucherAmount: ClientEntity['voucherAmount'];
  };
  onOk: (formData: IAddVoucherCreditsRequest) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const ManageClientVoucherCreditsForm = observer(
  ({
    clientData: { address, amountCredit, amountAnkr, amountUsd, voucherAmount },
    onCancel,
    onOk,
    isLoading,
  }: IManageClientVoucherCreditsFormProps) => {
    const onFinish = useCallback(
      (formData: TFormOutputData) => {
        const { reasonId, amount, ...props } = formData;

        const modifiedFormData: IAddVoucherCreditsRequest = {
          ...props,
          amount: `${amount}`,
          reasonId: `${reasonId || ''}${Date.now()}`,
        };

        onOk(modifiedFormData);
      },
      [onOk],
    );

    return (
      <Form
        onFinish={onFinish}
        initialValues={{
          address,
        }}
        layout="vertical"
      >
        <Form.Item
          name="address"
          label="User wallet"
          rules={[web3AddressValidator]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item label="Balance in ANKR tokens">
          <Input disabled value={amountAnkr} />
        </Form.Item>

        <Form.Item label="Balance in USD">
          <Input disabled value={amountUsd} />
        </Form.Item>

        <Form.Item label="Balance in credits">
          <Input disabled value={amountCredit} />
        </Form.Item>

        <Form.Item label="Voucher Credits balance">
          <Input disabled value={voucherAmount} />
        </Form.Item>

        <Form.Item
          name="amountType"
          label="Unit"
          rules={[{ required: true, message: 'Unit is required' }]}
        >
          <Select placeholder="Select unit" allowClear>
            {clientUnits.map(unit => (
              <Option key={unit} value={unit}>
                {unit}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Amount is required' }]}
        >
          <InputNumber type="number" min="0" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="reasonId" label="Comment">
          <Input />
        </Form.Item>

        <Space>
          <Button
            type="primary"
            htmlType="button"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Apply
          </Button>
        </Space>
      </Form>
    );
  },
);
