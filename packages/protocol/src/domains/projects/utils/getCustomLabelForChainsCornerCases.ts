import { t } from '@ankr.com/common';
import { ChainID, ZETACHAIN_ATHENS3_CHAINS } from '@ankr.com/chains-list';

import { tendermintRestChains } from 'modules/endpoints/constants/groups';
import { renderNervosName } from 'uiKit/utils/metatags';
import {
  ALLORA_TESTNET_TENDERMINT_NAME,
  KAVA_TENDERMINT_NAME,
  KAVA_TESTNET_TENDERMINT_NAME,
  SECRET_TENDERMINT_NAME,
  SEI_TENDERMINT_NAME,
  SEI_TESTNET_TENDERMINT_NAME,
  ZERO_G_TESTNET_TENDERMINT_NAME,
} from 'modules/chains/constants';

import { NestedItemBase } from '../screens/NewProject/components/TypeSelector/hooks/useNestedChainItemsSelection';

const PART_TO_DELETE_FROM_STRING = '(testnet)';

const TENDERMINT_REST = `Tendermint REST`;

export const getCustomLabelForChainsCornerCases = ({
  chainId,
  label,
}: NestedItemBase) => {
  if (ZETACHAIN_ATHENS3_CHAINS.includes(chainId)) {
    if (tendermintRestChains.includes(chainId)) {
      return `Athens 3 Zetachain Tendermint`;
    }

    return `Athens 3 ${label.replace(PART_TO_DELETE_FROM_STRING, '')}`;
  }

  if (tendermintRestChains.includes(chainId)) {
    if (label === TENDERMINT_REST) {
      return 'Tendermint';
    }

    if (chainId === ChainID.SEI_REST) {
      return SEI_TENDERMINT_NAME;
    }

    if (chainId === ChainID.SEI_REST_TESTNET) {
      return SEI_TESTNET_TENDERMINT_NAME;
    }

    if (chainId === ChainID.SECRET_REST) {
      return SECRET_TENDERMINT_NAME;
    }

    if (chainId === ChainID.ALLORA_TESTNET_REST) {
      return ALLORA_TESTNET_TENDERMINT_NAME;
    }

    if (chainId === ChainID.ZERO_G_NEWTON_TENDERMINT_REST) {
      return ZERO_G_TESTNET_TENDERMINT_NAME;
    }
  }

  if (chainId === ChainID.ZERO_G_NEWTON_TENDERMINT_REST) {
    return TENDERMINT_REST;
  }

  if (label === '0G Newton Testnet RPC') {
    return '0G Newton Testnet EVM JSON-RPC';
  }

  if (chainId === ChainID.KAVA_TENDERMINT_REST) {
    return KAVA_TENDERMINT_NAME;
  }

  if (chainId === ChainID.KAVA_TENDERMINT_REST_TESTNET) {
    return KAVA_TESTNET_TENDERMINT_NAME;
  }

  if (chainId === ChainID.NERVOS_GW || chainId === ChainID.NERVOS_CKB) {
    return renderNervosName(chainId);
  }

  if (chainId === ChainID.ROLLUX_OPNODE) {
    return t('projects.new-project.step-2.mainnet-postfix', {
      label,
    });
  }

  if (chainId === ChainID.SUI_TESTNET) {
    return 'Sui testnet';
  }

  return label;
};
