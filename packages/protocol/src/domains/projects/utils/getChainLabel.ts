import { EBlockchainType, IBlockchainEntity } from '@ankr.com/chains-list';
import { t } from '@ankr.com/common';

export const getChainLabel = (
  fallBackName: string,
  chain?: IBlockchainEntity,
) => {
  const label = chain?.name;

  if (label) {
    if (chain?.type === EBlockchainType.Mainnet) {
      return t('projects.new-project.step-2.mainnet-postfix', { label });
    }

    return label;
  }

  return fallBackName;
};
