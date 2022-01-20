import { isMainnet } from 'modules/common/const';
import { BlockchainNetworkId } from 'modules/common/types';
import { t } from 'modules/i18n/utils/intl';

const chainId: BlockchainNetworkId = isMainnet
  ? BlockchainNetworkId.mainnet
  : BlockchainNetworkId.goerli;

/**
 *  @deprecated
 *
 *  Note: For a quick release only
 *  TODO Please to remove it
 */
export const setErrorMsg = (message: string): string => {
  const networkName: string = t(`chain.${chainId}`);

  if (
    message.includes("Returned values aren't valid, did it run Out of Gas?")
  ) {
    return `Error: Please switch to the ${networkName} and refresh the page`;
  }

  return message;
};
