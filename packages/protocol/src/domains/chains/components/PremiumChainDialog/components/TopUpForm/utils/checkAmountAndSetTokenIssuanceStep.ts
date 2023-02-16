import BigNumber from 'bignumber.js';
import { EventData } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

export interface CheckingAmountParams {
  handleTokenIssue: (amount: BigNumber) => void;
  handleTokenExpiration: () => void;
  isTokenExpired?: boolean;
  lastLockedFundsEvent: EventData;
}

export const checkAmountAndSetTokenIssuanceStep = async ({
  handleTokenIssue,
  handleTokenExpiration,
  isTokenExpired,
  lastLockedFundsEvent,
}: CheckingAmountParams) => {
  const service = await MultiService.getWeb3Service();
  const keyProvider = service.getKeyProvider();

  const { currentAccount: address } = keyProvider;

  if (isTokenExpired) {
    handleTokenExpiration();

    return;
  }

  const value = keyProvider
    .getWeb3()
    .utils.fromWei(lastLockedFundsEvent.returnValues?.amount);

  if (!value) return;

  const amount = new BigNumber(value);
  const shouldIssueToken = await service.shouldIssueToken(address);

  if (shouldIssueToken) {
    handleTokenIssue(amount);
  }
};
