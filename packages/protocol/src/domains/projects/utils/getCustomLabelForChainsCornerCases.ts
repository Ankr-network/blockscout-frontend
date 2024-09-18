import { t } from '@ankr.com/common';
import { ChainID, ZETACHAIN_ATHENS3_CHAINS } from '@ankr.com/chains-list';

import { tendermintRestChains } from 'modules/endpoints/constants/groups';
import { renderNervosName } from 'uiKit/utils/metatags';

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
      return 'Sei Tendermint';
    }

    if (chainId === ChainID.SEI_REST_TESTNET) {
      return 'Sei Testnet Tendermint';
    }

    if (chainId === ChainID.SECRET_REST) {
      return 'Secret Network Tendermint';
    }

    if (chainId === ChainID.ALLORA_TESTNET_REST) {
      return 'Allora Testnet Tendermint';
    }
  }

  if (chainId === ChainID.KAVA_TENDERMINT_REST) {
    return 'Kava Tendermint';
  }

  if (chainId === ChainID.KAVA_TENDERMINT_REST_TESTNET) {
    return 'Kava testnet Tendermint';
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
