import { Button, Descriptions } from 'antd';
import { IJwtToken } from 'multirpc-sdk';
import Web3 from 'web3';

import { renderStatus, renderType } from './JwtTokenTableUtils';

export const JwtTokenExpander = ({ jwtToken }: { jwtToken: IJwtToken }) => {
  return (
    <div>
      <Descriptions
        title={`Threshold Key: #${jwtToken.id}`}
        layout="horizontal"
        size="small"
        column={1}
        bordered
      >
        <Descriptions.Item key="id" label="ID">
          {jwtToken.id}
        </Descriptions.Item>
        <Descriptions.Item key="threshold_key" label="Threshold Key">
          {jwtToken.threshold_key}
        </Descriptions.Item>
        <Descriptions.Item key="status" label="Status">
          {renderStatus(jwtToken.status)}
        </Descriptions.Item>
        <Descriptions.Item key="type" label="Type">
          {renderType(jwtToken.type)}
        </Descriptions.Item>
        <Descriptions.Item key="owner_address" label="Owner">
          {jwtToken.owner_address}
        </Descriptions.Item>
        <Descriptions.Item key="expires_at" label="Expires At">
          {jwtToken.expires_at}
        </Descriptions.Item>
        <Descriptions.Item key="signing_data" label="Data">
          {jwtToken.signing_data}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Button
        onClick={async () => {
          // eslint-disable-next-line
          const ethereum = (window as any).ethereum;
          const web3 = new Web3(ethereum);
          const accounts = await web3.eth.requestAccounts();
          const decryptedJwtToken = await ethereum.request({
            method: 'eth_decrypt',
            params: [
              Buffer.from(jwtToken.signed_token, 'base64').toString('ascii'),
              accounts[0],
            ],
          });
          // eslint-disable-next-line no-console
          console.log(decryptedJwtToken);
        }}
      >
        Decrypt JWT token
      </Button>
    </div>
  );
};
