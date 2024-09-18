import { capitalize } from '@mui/material';
import { t } from '@ankr.com/common';
import {
  EBlockchainType,
  Chain,
  ChainID,
  ChainType,
} from '@ankr.com/chains-list';

import { chainGroups, getName } from 'modules/endpoints/constants/groups';
import { Tab } from 'modules/common/hooks/useTabs';
import { ChainProtocol } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';

import { flatChain } from './flatChain';

const EXCLUDED_GROUPS = [
  getName('standard-evm-api'),
  getName('ethereum-endpoint'),
];

// tron has two mainnets
const IGNORE_MAINNET_FILTERING = [ChainID.TRON];

const HIDDEN_SUBCHAIN_LABELS = [
  ChainID.HORIZEN_EVM,
  ChainID.HORIZEN_TESTNET_EVM,
  ChainID.TENET_EVM,
];

const EXCLUDED_TESTNETS = [ChainID.ETH];

export const getChainLabels = (
  chain: Chain,
  chainTypes: Tab<ChainType>[],
): string[] => {
  const flattedChain = flatChain(chain);

  // filter out empty paths and mainnet groups
  const subchains = flattedChain.filter(subchain => {
    // tron has two mainnets
    if (!IGNORE_MAINNET_FILTERING.includes(subchain.id)) {
      // exclude mainnet group
      return subchain.id !== chain.id;
    }

    return subchain.paths && subchain.paths.length > 0;
  });

  const isOnlyOneTestnet = chain.testnets?.length === 1;
  const isOnlyOneDevnet = chain.devnets?.length === 1;

  // collect subchain labels
  const labels = subchains.map(subchain => {
    const shouldIgnoreTestnetGroup =
      isOnlyOneTestnet && subchain.type === EBlockchainType.Testnet;
    const shouldIgnoreDevnetGroup =
      isOnlyOneDevnet && subchain.type === EBlockchainType.Devnet;
    const shouldIgnoreLabel =
      shouldIgnoreTestnetGroup ||
      shouldIgnoreDevnetGroup ||
      HIDDEN_SUBCHAIN_LABELS.includes(subchain.id);

    if (shouldIgnoreLabel) {
      return '';
    }

    const currentGroup = chainGroups.find(group => {
      return group.chains.find(c => c === subchain.id);
    });

    if (currentGroup) {
      const { name } = currentGroup;

      if (EXCLUDED_GROUPS.includes(name)) {
        return '';
      }

      return name;
    }

    return '';
  });

  // add mainnet/testnet/devnet to start of labels
  labels.unshift(...chainTypes.map(type => capitalize(type.id)));

  // exclude testnet label for eth
  if (EXCLUDED_TESTNETS.includes(chain.id)) {
    labels.splice(labels.indexOf(capitalize(ChainType.Testnet)), 1);
  }

  // add beacon label if chain has beacon subchain
  if (subchains.find(subchain => subchain.id.includes(ChainProtocol.Beacon))) {
    labels.push(t('chain-item.header.beacon-label'));
  }

  // add opnode label if chain has beacon subchain
  if (subchains.find(subchain => subchain.id.includes(ChainProtocol.Opnode))) {
    labels.push(t('chain-item.header.opnode-label'));
  }

  // filter out empty labels
  labels.filter(Boolean);

  // remove duplicates
  return [...new Set(labels)];
};
