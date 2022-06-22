import React from 'react';
import { Descriptions } from 'antd';
import { base64ToPrefixedHex, IThresholdKey, PrefixedHex } from 'multirpc-sdk';

import {
  renderChainOrGenesis,
  renderCrypto,
  renderThresholdKeyStatus,
} from 'utils/common';

export const ThresholdKeyExpander = ({
  thresholdKey,
  depositAddresses,
}: {
  thresholdKey: IThresholdKey;
  depositAddresses: Record<PrefixedHex, PrefixedHex>;
}) => {
  return (
    <div>
      <Descriptions
        title={`Threshold Key: #${thresholdKey.id}`}
        layout="horizontal"
        size="small"
        column={1}
        bordered
      >
        <Descriptions.Item key="id" label="ID">
          {thresholdKey.id}
        </Descriptions.Item>
        <Descriptions.Item key="status" label="Status">
          {renderThresholdKeyStatus(thresholdKey.status)}
        </Descriptions.Item>
        <Descriptions.Item key="crypto" label="Crypto">
          {renderCrypto(thresholdKey.crypto)}
        </Descriptions.Item>
        <Descriptions.Item key="publicKey" label="Public Key">
          {base64ToPrefixedHex(thresholdKey.public_key)}
        </Descriptions.Item>
        <Descriptions.Item key="quorum" label="Quorum">
          {thresholdKey.threshold}/{thresholdKey.players.length}
        </Descriptions.Item>
        <Descriptions.Item key="players" label="Players">
          {thresholdKey.players.map(id => (
            <span key={id}>
              {id}
              <br />
            </span>
          ))}
        </Descriptions.Item>
        <Descriptions.Item key="proposal" label="Proposal">
          {thresholdKey.proposal}
        </Descriptions.Item>
        <Descriptions.Item key="party" label="Party">
          {thresholdKey.party}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Descriptions
        title="Blockchain Addresses"
        layout="horizontal"
        size="small"
        column={2}
        bordered
      >
        {Object.entries(depositAddresses).map(([k, v]) => (
          <Descriptions.Item key={k} label={renderChainOrGenesis(k)}>
            {v}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <br />
    </div>
  );
};
