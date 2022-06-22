import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button, Col, Form, Input, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { IBlockchainEntity } from 'multirpc-sdk';

export type TCreateBlockchainFormHandler = (form: IBlockchainEntity) => void;

export interface ICreateBlockchainFormProps {
  initialValues?: IBlockchainEntity;
  onSubmit?: TCreateBlockchainFormHandler;
  isLoading?: boolean;
}

const CreateBlockchainForm = observer(
  ({ initialValues, onSubmit, isLoading }: ICreateBlockchainFormProps) => {
    const store = useMemo(
      () =>
        observable({
          form: initialValues || ({} as any),
          setForm(newForm: any) {
            this.form = { ...this.form, ...newForm };
          },
        }),
      [initialValues],
    );

    return (
      <Form
        layout="vertical"
        fields={[
          { name: 'id', value: store.form.id },
          { name: 'name', value: store.form.name },
        ]}
        onValuesChange={values => {
          store.setForm(values);
        }}
        onFinish={() => {
          if (onSubmit) onSubmit(store.form);
        }}
      >
        <Row gutter={24}>
          <Col span={20} offset={2}>
            <Form.Item
              name="id"
              label="Id"
              extra={
                <span>
                  Blockchain identifier (eg. path prefix), like (eth) or (bsc).
                </span>
              }
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              extra={<span>Full name of blockchain</span>}
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
          <Button
            type="primary"
            loading={isLoading}
            disabled={isLoading}
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

export default CreateBlockchainForm;
