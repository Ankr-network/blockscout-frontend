import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useHistory } from 'react-router';

import { t } from 'common';
import { TPolkadotAddress } from 'polkadot';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { claim } from 'modules/stake-polkadot/actions/claim';
import { fetchETHTokenClaimableBalance } from 'modules/stake-polkadot/actions/fetchETHTokenClaimableBalance';
import { POLKADOT_WRITE_PROVIDER_ID } from 'modules/stake-polkadot/const';
import { useSuccessDialog } from 'modules/stake-polkadot/hooks/useSuccessDialog';
import {
  EPolkadotETHReverseMap,
  EPolkadotNetworks,
  IPolkadotClaimFormPayload,
  TPolkadotETHToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';

interface IUseClaimFormData {
  amount: BigNumber;
  ethToken: TPolkadotETHToken;
  isLoadingClaim: boolean;
  isSuccessOpened: boolean;
  polkadotAddress?: TPolkadotAddress;
  successTitle: string;
  onAddTokenClick: () => void;
  onFormSubmit: (data: IPolkadotClaimFormPayload) => Promise<void>;
  onSuccessClose: () => void;
}

export const useClaimForm = (network: EPolkadotNetworks): IUseClaimFormData => {
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();

  const { address: polkadotAddress } = useConnectedData(
    POLKADOT_WRITE_PROVIDER_ID,
  );

  const { loading: isLoadingClaim } = useMutation({
    type: claim,
  });

  const { isSuccessOpened, onAddTokenClick, onSuccessOpen } =
    useSuccessDialog(network);

  const { data: claimableBalance } = useQuery({
    type: fetchETHTokenClaimableBalance,
    requestKey: getPolkadotRequestKey(network),
  });

  const amount = claimableBalance?.claimable ?? ZERO;

  const ethToken = useMemo(
    () => EPolkadotETHReverseMap[network] as unknown as TPolkadotETHToken,
    [network],
  );

  const successTitle = t('stake-polkadot.claim.success-title');

  const onFormSubmit = async ({
    isLedgerWallet,
  }: IPolkadotClaimFormPayload): Promise<void> => {
    if (amount.isLessThanOrEqualTo(0)) {
      return;
    }

    const { error } = await dispatchRequest(
      claim({
        claimableAmount: amount,
        isLedgerWallet,
        network,
      }),
    );

    if (!(error instanceof Error)) {
      onSuccessOpen();
    }
  };

  const onSuccessClose = (): void => {
    history.push(DashboardRoutes.dashboard.generatePath());
  };

  useProviderEffect(
    () => {
      if (typeof polkadotAddress !== 'string') {
        return;
      }

      dispatchRequest(
        fetchETHTokenClaimableBalance({
          address: polkadotAddress,
          network,
        }),
      );
    },
    [dispatchRequest, fetchETHTokenClaimableBalance, network, polkadotAddress],
    POLKADOT_WRITE_PROVIDER_ID,
  );

  return {
    amount,
    ethToken,
    isLoadingClaim,
    isSuccessOpened,
    polkadotAddress,
    successTitle,
    onAddTokenClick,
    onFormSubmit,
    onSuccessClose,
  };
};
