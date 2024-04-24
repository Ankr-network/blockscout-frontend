import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { MilliSeconds } from 'modules/common/constants/const';
import { RequestType, web3Api } from 'store/queries';
import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';
import { waitFor } from 'modules/common/utils/waitFor';

const tagsToInvalidate = [
  RequestType.WalletTokenBalance,
  RequestType.ANKRAllowanceFee,
  RequestType.ANKRDepositFee,
];

export const useAccountsChangedHandlingOnSummaryStep = () => {
  const dispatch = useDispatch();

  const { connectedAddress } = useConnectedAddress();

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
