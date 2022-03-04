import { t } from 'modules/i18n/utils/intl';

import { validETHChainId } from '../const';

/**
 *  @deprecated
 *
 *  Note: For a quick release only
 *  TODO Please to remove it
 */
export const getETHNetworkErrMsg = (): string => {
  const networkName: string = t(`chain.${validETHChainId}`);

  return `Please switch to the ${networkName} and refresh the page`;
};
