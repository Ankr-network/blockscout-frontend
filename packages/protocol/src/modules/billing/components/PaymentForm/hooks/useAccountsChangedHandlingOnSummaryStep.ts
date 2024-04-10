import { useCallback } from 'react';
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

  const onAccountsChanged = useCallback(async () => {
    // waiting for updating currentAccount field in provider
    await waitFor(MilliSeconds.Second);

    dispatch(web3Api.util.invalidateTags(tagsToInvalidate));
  }, [dispatch]);

  useConnectedAddress({ onAccountsChanged });
};
