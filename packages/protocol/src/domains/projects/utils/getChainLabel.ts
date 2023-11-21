import { BlockchainType, IBlockchainEntity } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

export const getChainLabel = (
  fallBackName: string,
  chain?: IBlockchainEntity,
) => {
  const label = chain?.name;

  if (label) {
    if (chain?.type === BlockchainType.Mainnet) {
      return t('projects.new-project.step-2.mainnet-postfix', { label });
    }

    return label;
  }

  return fallBackName;
};
