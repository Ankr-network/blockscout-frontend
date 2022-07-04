import {
  Base64,
  INotarizedTransaction,
  PrefixedHex,
  TBlockchain,
  TCrypto,
  TNotarizedTransactionStatus,
  TThresholdKeyStatus,
} from 'multirpc-sdk';
import React, { ReactElement } from 'react';
import { Tag } from 'antd';

export const renderNotarizedTransactionStatus = (
  status: TNotarizedTransactionStatus,
): ReactElement => {
  const colors: Record<TNotarizedTransactionStatus, string> = {
    NOTARIZED_TRANSACTION_STATUS_CONFIRMED: 'green',
    NOTARIZED_TRANSACTION_STATUS_REPLACED: 'red',
    NOTARIZED_TRANSACTION_STATUS_ORPHANED: 'yellow',
    NOTARIZED_TRANSACTION_STATUS_REVERTED: 'red',
  };
  return (
    <Tag color={colors[status] || 'grey'} key={status}>
      {status.substr('NOTARIZED_TRANSACTION_STATUS_'.length)}
    </Tag>
  );
};

export const renderChainOrGenesis = (chain: Base64 | PrefixedHex) => {
  let chainHex;
  if (chain.startsWith('0x')) {
    chainHex = chain.substr(2);
  } else {
    chainHex = Buffer.from(chain, 'base64').toString('hex');
  }
  const chainName: Record<string, string> = {
    '01': '0x01 Ethereum (Mainnet)',
    '05': '0x05 Ethereum (Goerli)',
  };
  const colors: Record<string, string> = {
    '01': 'magenta',
    '05': 'blue',
  };
  return (
    <Tag color={colors[chainHex] || 'grey'} key={chainHex}>
      {chainName[chainHex] || `0x${chainHex}`}
    </Tag>
  );
};

export const renderBlockchain = (type: TBlockchain): ReactElement => {
  const colors: Record<TBlockchain, string> = {
    BLOCKCHAIN_WEB3: 'magenta',
    BLOCKCHAIN_SUBSTRATE: 'blue',
  };
  return (
    <Tag color={colors[type] || 'grey'} key={type}>
      {type.substr('BLOCKCHAIN_'.length)}
    </Tag>
  );
};

export const renderAmount = (
  amount: string,
  nt: INotarizedTransaction,
): string => {
  if (nt.blockchain === 'BLOCKCHAIN_WEB3') {
    return (Number(amount) / 10 ** 18).toString(10);
  }
  return amount;
};

export const renderThresholdKeyStatus = (
  status: TThresholdKeyStatus,
): ReactElement => {
  const colors: Record<TThresholdKeyStatus, string> = {
    THRESHOLD_KEY_STATUS_PENDING: 'grey',
    THRESHOLD_KEY_STATUS_GENERATED: 'green',
    THRESHOLD_KEY_STATUS_FAILED: 'yellow',
  };
  return (
    <Tag color={colors[status] || 'grey'} key={status}>
      {status.substr('THRESHOLD_KEY_STATUS_'.length)}
    </Tag>
  );
};

export const renderCrypto = (type: TCrypto): ReactElement => {
  const colors: Record<TCrypto, string> = {
    CRYPTO_ECDSA_SECP256K1: 'magenta',
    CRYPTO_ECDSA_SECP256R1: 'red',
    CRYPTO_BLST_BLS12381: 'red',
    CRYPTO_SCHNORR_SECP256K1: 'red',
    CRYPTO_EDDSA_ED25519: 'red',
  };
  return (
    <Tag color={colors[type] || 'grey'} key={type}>
      {type.substr('CRYPTO_'.length)}
    </Tag>
  );
};
