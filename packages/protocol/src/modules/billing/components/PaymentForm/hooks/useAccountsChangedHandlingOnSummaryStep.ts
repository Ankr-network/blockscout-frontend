import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { MilliSeconds } from 'modules/common/constants/const';
import { RequestType, web3Api } from 'store/queries';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';
import { waitFor } from 'modules/common/utils/waitFor';

const tagsToInvalidate = [
  RequestType.WalletANKRTokenBalance,
  RequestType.ANKRAllowanceFee,
  RequestType.ANKRDepositFee,

  RequestType.WalletUSDTTokenBalance,
  RequestType.USDTAllowanceFee,
  RequestType.USDTDepositFee,

  RequestType.WalletUSDCTokenBalance,
  RequestType.USDCAllowanceFee,
  RequestType.USDCDepositFee,
];

export const useAccountsChangedHandlingOnSummaryStep = () => {
  const dispatch = useDispatch();

  const { walletAddress: connectedAddress } = useWalletAddress();

  useEffect(
    () => {
      const invalidateTags = () =>
        dispatch(web3Api.util.invalidateTags(tagsToInvalidate));

      // waiting for updating currentAccount field in provider
      waitFor(MilliSeconds.Second).then(invalidateTags);
    },
    // We should only track connectedAddress change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [connectedAddress],
  );
};
