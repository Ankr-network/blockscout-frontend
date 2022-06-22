import { Descriptions } from 'antd';
import { base64ToPrefixedHex, INotarizedTransaction } from 'multirpc-sdk';
import {
  renderAmount,
  renderBlockchain,
  renderChainOrGenesis,
  renderNotarizedTransactionStatus,
} from 'utils/common';

export const renderNotarizedTransactionExpander = (
  nt: INotarizedTransaction,
) => {
  return (
    <div>
      <Descriptions
        title={`Notarized Transaction: #${nt.id}`}
        layout="horizontal"
        size="small"
        column={1}
        bordered
      >
        <Descriptions.Item label="ID">{nt.id}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {renderNotarizedTransactionStatus(nt.status)}
        </Descriptions.Item>
        <Descriptions.Item label="Blockchain">
          {renderBlockchain(nt.blockchain)}
        </Descriptions.Item>
        <Descriptions.Item label="Transaction Hash">
          {base64ToPrefixedHex(nt.transaction_hash)}
        </Descriptions.Item>
        <Descriptions.Item label="Block Number">
          {nt.block_number}
        </Descriptions.Item>
        <Descriptions.Item label="Block Hash">
          {base64ToPrefixedHex(nt.block_hash)}
        </Descriptions.Item>
        <Descriptions.Item label="Transaction Index">
          {nt.transaction_index}
        </Descriptions.Item>
        <Descriptions.Item label="Receipt Hash">
          {base64ToPrefixedHex(nt.receipt_hash)}
        </Descriptions.Item>
        <Descriptions.Item label="Transferred Amount">
          {renderAmount(nt.transferred_amount, nt)}
        </Descriptions.Item>
        <Descriptions.Item label="Chain ID">
          {base64ToPrefixedHex(nt.chain_id)}&nbsp;
          {renderChainOrGenesis(nt.chain_id)}
        </Descriptions.Item>
        <Descriptions.Item label="Threshold Key">
          {nt.threshold_key}
        </Descriptions.Item>
        <Descriptions.Item label="Proposal">{nt.proposal}</Descriptions.Item>
        <Descriptions.Item label="Signing Payload">
          {base64ToPrefixedHex(nt.payload)}
        </Descriptions.Item>
        <Descriptions.Item label="Signature">
          {base64ToPrefixedHex(nt.signature)}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
