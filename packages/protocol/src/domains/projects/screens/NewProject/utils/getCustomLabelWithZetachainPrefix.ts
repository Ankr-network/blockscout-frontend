import {
  ZETACHAIN_ATHENS2_CHAINS,
  ZETACHAIN_ATHENS3_CHAINS,
} from 'domains/chains/types';
import { tendermintRestChains } from 'modules/endpoints/constants/groups';

import { NestedItemBase } from '../components/TypeSelector/hooks/useNestedChainItemsSelection';

export const getCustomLabelWithZetachainPrefix = (item: NestedItemBase) => {
  if (ZETACHAIN_ATHENS2_CHAINS.includes(item.chainId)) {
    if (tendermintRestChains.includes(item.chainId)) {
      return `Athens 2 Zetachain Tendermint`;
    }

    return `Athens 2 ${item.label}`;
  }

  if (ZETACHAIN_ATHENS3_CHAINS.includes(item.chainId)) {
    if (tendermintRestChains.includes(item.chainId)) {
      return `Athens 3 Zetachain Tendermint`;
    }

    return `Athens 3 ${item.label}`;
  }

  if (tendermintRestChains.includes(item.chainId)) {
    return `Tendermint`;
  }

  return item.label;
};
