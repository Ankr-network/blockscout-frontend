import { observer } from 'mobx-react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { IPlayer, TCrypto, TThresholdKeyRole, UUID } from 'multirpc-sdk';
import { PlusOutlined } from '@ant-design/icons';

export type TGenerateThresholdKeyFormHandler = (form: {
  crypto: TCrypto;
  players: UUID[];
  threshold: number;
  roles: TThresholdKeyRole[];
  party: string;
}) => void;

export interface IGenerateThresholdKeyFormProps {
  players: IPlayer[];
  onSubmit?: TGenerateThresholdKeyFormHandler;
  isLoading?: boolean;
  isFetching?: boolean;
}

export const GenerateThresholdKeyForm = observer(
  (props: IGenerateThresholdKeyFormProps) => {
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
              name="crypto"
              extra={
                <span>Kind of cryptography is used for signing messages.</span>
              }
              label="Crypto"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select placeholder="Please select a crypto">
                <Select.Option value="CRYPTO_ECDSA_SECP256K1">
                  ECDSA (secp256k1)
                </Select.Option>
                <Select.Option value="CRYPTO_ECDSA_SECP256R1">
                  ECDSA (secp256r1)
                </Select.Option>
                <Select.Option value="CRYPTO_BLST_BLS12381">
                  BLST (bls12-381)
                </Select.Option>
                <Select.Option value="CRYPTO_SCHNORR_SECP256K1">
                  SCHNORR (secp256k1)
                </Select.Option>
                <Select.Option value="CRYPTO_EDDSA_ED25519">
                  EDDSA (ed25519)
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="players"
              extra={
                <span>
                  Select players that will participate in message signing for
                  this threshold key.
                </span>
              }
              label="Players"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select
                mode="multiple"
                placeholder="Please select"
                style={{ width: '100%' }}
              >
                {props.players.map(player => (
                  <Select.Option value={player.id}>{player.id}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="threshold"
              extra={
                <span>How many signers are required to reach quorum?</span>
              }
              label="Threshold"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="roles"
              extra={
                <span>
                  What roles should be assigned for the new threshold key. Keep
                  it empty if you&apos;d like to grant full access to signing.
                </span>
              }
              label="Roles"
            >
              <Select
                mode="multiple"
                placeholder="Please select"
                style={{ width: '100%' }}
              >
                <Select.Option value="THRESHOLD_KEY_ROLE_NOTARIZE">
                  NOTARIZE
                </Select.Option>
                <Select.Option value="THRESHOLD_KEY_ROLE_SIGN">
                  SIGN
                </Select.Option>
                <Select.Option value="THRESHOLD_KEY_ROLE_TRANSACT">
                  TRANSACT
                </Select.Option>
                <Select.Option value="THRESHOLD_KEY_ROLE_ISSUE">
                  ISSUE
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="party"
              extra={<span>Unique name of the party.</span>}
              label="Party"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input type="text" />
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
