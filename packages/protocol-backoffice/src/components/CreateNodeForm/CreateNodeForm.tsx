import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { INodeEntity } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';
import { useBackofficeBlockchains } from 'stores/useBackofficeBlockchains';
import { getOrganizationFromURL } from 'utils/formValidators';

import COUNTRIES from './countries.json';
import { makeSelectBlockchainOptions, TSelectBlockchainOption } from './utils';

export type TCreateNodeFormHandler = (form: INodeEntity) => void;

export interface ICreateNodeFormProps {
  initialValues?: INodeEntity;
  onSubmit?: TCreateNodeFormHandler;
  isLoading?: boolean;
}

const CreateNodeForm = observer(
  ({ onSubmit, initialValues, isLoading }: ICreateNodeFormProps) => {
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

    const blockchains = useBackofficeBlockchains().items;
    const selectBlockchainOptions = makeSelectBlockchainOptions(blockchains);

    const onValuesChange = useCallback(
      async values => {
        const { requestUrl } = values;

        if (requestUrl) {
          try {
            const response = await fetch(
              `https://staging.protocol.ankr.com/resolve?url=${encodeURIComponent(
                values.requestUrl,
              )}`,
            );

            const data = await response.json();

            const { country, continent_code: continent, city } = await data;
            store.setForm({ country, continent, city });
          } catch {
            // eslint-disable-next-line no-console
            console.log('FAILED TO RECEIVE DATA FROM URL');
          }

          try {
            const organization = getOrganizationFromURL(requestUrl);

            if (organization) store.setForm({ organization });
          } catch {
            // eslint-disable-next-line no-console
            console.log(`FAILED TO PARSE 'organization' from url`);
          }
        }
        store.setForm(values);
      },
      [store],
    );

    return (
      <Form
        layout="vertical"
        fields={[
          { name: 'id', value: store.form.id },
          { name: 'blockchain', value: store.form.blockchain },
          { name: 'scheme', value: store.form.scheme },
          { name: 'requestUrl', value: store.form.requestUrl },
          { name: 'websocketUrl', value: store.form.websocketUrl },
          { name: 'weight', value: store.form.weight },
          { name: 'continent', value: store.form.continent },
          { name: 'country', value: store.form.country },
          { name: 'organization', value: store.form.organization },
          { name: 'city', value: store.form.city },
          { name: 'isArchive', value: store.form.isArchive },
        ]}
        onValuesChange={onValuesChange}
        onFinish={() => {
          if (onSubmit) {
            onSubmit(store.form);
          }
        }}
      >
        <Row gutter={24}>
          <Col span={20} offset={2}>
            <Form.Item name="id" hidden label="Id">
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              name="blockchain"
              extra={<span>Blockchain.</span>}
              label="Blockchain"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select
                filterOption={(a: string, b) => {
                  return b?.children?.[0]
                    .toLowerCase()
                    .startsWith(a.toLowerCase());
                }}
                showSearch
              >
                {selectBlockchainOptions.map(
                  (option: TSelectBlockchainOption) => (
                    <Select.Option value={option.code} key={option.code}>
                      {option.name}
                    </Select.Option>
                  ),
                )}
              </Select>
            </Form.Item>
            <Form.Item
              name="scheme"
              extra={<span>Request scheme format.</span>}
              label="Scheme"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select>
                <Select.Option value="web3" key="web3">
                  Web3 (EVM)
                </Select.Option>
                <Select.Option value="solana" key="solana">
                  Solana
                </Select.Option>
                <Select.Option value="near" key="near">
                  Near
                </Select.Option>
                <Select.Option value="iotex" key="iotex">
                  IoTex
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="weight"
              extra={<span>Weight of this node.</span>}
              label="Weight"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="requestUrl"
              extra={<span>HTTP URL to the node.</span>}
              label="HTTP URL"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input type="url" />
            </Form.Item>
            <Form.Item
              name="websocketUrl"
              extra={<span>WebSocket URL to the node.</span>}
              label="WebSocket URL"
            >
              <Input type="url" />
            </Form.Item>
            <Form.Item
              name="continent"
              extra={<span>ISO code of continent.</span>}
              label="Continent"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select
                filterOption={(a: string, b) => {
                  if (a.toLowerCase() === b?.children?.[2].toLowerCase())
                    return true;
                  return b?.children?.[0]
                    .toLowerCase()
                    .startsWith(a.toLowerCase());
                }}
                showSearch
              >
                <Select.Option value="AS" key="AS">
                  Asia
                </Select.Option>
                <Select.Option value="EU" key="EU">
                  Europe
                </Select.Option>
                <Select.Option value="AF" key="AF">
                  Africa
                </Select.Option>
                <Select.Option value="NA" key="NA">
                  North America
                </Select.Option>
                <Select.Option value="SA" key="SA">
                  South America
                </Select.Option>
                <Select.Option value="AN" key="AN">
                  Antarctica
                </Select.Option>
                <Select.Option value="OC" key="OC">
                  Oceania
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="country"
              extra={<span>ISO code of country.</span>}
              label="Country"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select
                filterOption={(a: string, b) => {
                  if (a.toLowerCase() === b?.children?.[2].toLowerCase())
                    return true;
                  return b?.children?.[0]
                    .toLowerCase()
                    .startsWith(a.toLowerCase());
                }}
                showSearch
              >
                {COUNTRIES.map((country: any) => (
                  <Select.Option value={country.code} key={country.name}>
                    {country.name}&nbsp;({country.code})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="organization"
              extra={
                <span>
                  Organization name. Try not to use custom names, better to use
                  generated. If you want to use something different form domain,
                  then better to change it for every node.
                </span>
              }
              label="Organization"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="city"
              extra={<span>City.</span>}
              label="City"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="isArchive"
              extra={<span>Is node archive?</span>}
              label="Archive"
              valuePropName="checked"
            >
              <Checkbox />
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

export default CreateNodeForm;
