import { t } from '@ankr.com/common';

import {
  ChainID,
  ZETACHAIN_ATHENS2_CHAINS,
  ZETACHAIN_ATHENS3_CHAINS,
} from 'domains/chains/types';
import { tendermintRestChains } from 'modules/endpoints/constants/groups';
import { renderNervosName } from 'uiKit/utils/metatags';

import { NestedItemBase } from '../screens/NewProject/components/TypeSelector/hooks/useNestedChainItemsSelection';

const PART_TO_DELETE_FROM_STRING = '(testnet)';

export const getCustomLabelForChainsCornerCases = ({
  chainId,
  label,
}: NestedItemBase) => {
  if (ZETACHAIN_ATHENS2_CHAINS.includes(chainId)) {
    if (tendermintRestChains.includes(chainId)) {
      return `Athens 2 Zetachain Tendermint`;
    }

    return `Athens 2 ${label.replace(PART_TO_DELETE_FROM_STRING, '')}`;
  }

  if (ZETACHAIN_ATHENS3_CHAINS.includes(chainId)) {
    if (tendermintRestChains.includes(chainId)) {
      return `Athens 3 Zetachain Tendermint`;
    }

    return `Athens 3 ${label.replace(PART_TO_DELETE_FROM_STRING, '')}`;
  }

  if (tendermintRestChains.includes(chainId)) {
    return `Tendermint`;
  }

  if (chainId === ChainID.NERVOS_GW || chainId === ChainID.NERVOS_CKB) {
    return renderNervosName(chainId);
  }

  if (chainId === ChainID.ROLLUX_OPNODE) {
    return t('projects.new-project.step-1.mainnet-postfix', {
      label,
    });
  }

  if (chainId === ChainID.SUI_TESTNET) {
    return 'Sui testnet';
  }

  return label;
};
