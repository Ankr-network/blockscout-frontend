import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router';

import { t } from 'common';
import { PolkadotProvider } from 'polkadot';

import { useDialog } from 'modules/common/hooks/useDialog';
import { FormErrors } from 'modules/common/types/FormErrors';
import { ResponseData } from 'modules/common/types/ResponseData';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { fetchUnstakeStats } from 'modules/stake-polkadot/actions/fetchUnstakeStats';
import { unstake } from 'modules/stake-polkadot/actions/unstake';
import { useETHPolkadotProvidersEffect } from 'modules/stake-polkadot/hooks/useETHPolkadotProvidersEffect';
import {
  EPolkadotETHReverseMap,
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';
import { IUnstakeUserWalletFormValues } from 'modules/stake/components/UnstakeUserWallet';

interface IUseUnstakePolkadotData {
  ethToken: TPolkadotETHToken;
  isActiveSuccessForm: boolean;
  isActiveUnstakeForm: boolean;
  isActiveUserWalletForm: boolean;
  isFetchStatsLoading: boolean;
  isUnstakeLoading: boolean;
  fetchStatsData: ResponseData<typeof fetchUnstakeStats> | null;
  fetchStatsError: Error | null;
  maxAmountDecimals: number | undefined;
  networkName: string;
  polkadotToken: TPolkadotToken;
  userAmount: BigNumber | null;
  onSuccessClose: () => void;
  onUnstakeFormClose: () => void;
  onUnstakeSubmit: ({ amount }: IUnstakeFormValues) => void;
  onUserWalletClose: () => void;
  onUserWalletExtraValidation: (
    data: Partial<IUnstakeUserWalletFormValues>,
    errors: FormErrors<IUnstakeUserWalletFormValues>,
  ) => FormErrors<IUnstakeUserWalletFormValues>;
  onUserWalletSubmit: ({ userWallet }: IUnstakeUserWalletFormValues) => void;
}

export const useUnstakePolkadotData = (
  network: EPolkadotNetworks,
): IUseUnstakePolkadotData => {
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();

  const [userAmount, setUserAmount] = useState<BigNumber | null>(null);

  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const {
    isOpened: isUserWalletOpened,
    onClose: onUserWalletClose,
    onOpen: onUserWalletOpen,
  } = useDialog();

  const {
    data: fetchStatsData,
    error: fetchStatsError,
    loading: isFetchStatsLoading,
  } = useQuery({
    type: fetchUnstakeStats,
  });

  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const isActiveUnstakeForm = !isUserWalletOpened && !isSuccessOpened;
  const isActiveUserWalletForm = isUserWalletOpened && !isSuccessOpened;
  const isActiveSuccessForm = !isUserWalletOpened && isSuccessOpened;

  const ethToken = useMemo(
    () => EPolkadotETHReverseMap[network] as unknown as TPolkadotETHToken,
    [network],
  );

  const maxAmountDecimals = useMemo(
    () => fetchStatsData?.maxETHTokenDecimals.toNumber(),
    [fetchStatsData?.maxETHTokenDecimals],
  );

  const networkName = useMemo(
    () => t(`stake-polkadot.networks.${network}`),
    [network],
  );

  const polkadotToken = useMemo(() => Token[network], [network]);

  const onUnstakeFormClose = useCallback((): void => {
    history.push(DashboardRoutes.dashboard.generatePath());
  }, [history]);

  const onUnstakeSubmit = ({ amount }: IUnstakeFormValues): void => {
    if (typeof amount !== 'string') {
      return;
    }

    const resultAmount = new BigNumber(amount);

    setUserAmount(resultAmount);

    onUserWalletOpen();
  };

  const onUserWalletExtraValidation = (
    data: Partial<IUnstakeUserWalletFormValues>,
    errors: FormErrors<IUnstakeUserWalletFormValues>,
  ): FormErrors<IUnstakeUserWalletFormValues> => {
    if (
      typeof data.userWallet === 'string' &&
      !PolkadotProvider.isValidAddress(data.userWallet)
    ) {
      errors.userWallet = t('validation.invalid-network-address', {
        network: networkName,
      });
    }

    return errors;
  };

  const onUserWalletSubmit = ({
    userWallet,
  }: IUnstakeUserWalletFormValues): void => {
    if (userAmount === null || typeof userWallet !== 'string') {
      return;
    }

    dispatchRequest(unstake(network, userWallet, userAmount)).then(
      ({ error }): void => {
        if (!error) {
          onUserWalletClose();

          onSuccessOpen();
        }
      },
    );
  };

  useETHPolkadotProvidersEffect(() => {
    dispatchRequest(fetchUnstakeStats());
  }, [dispatchRequest, fetchUnstakeStats]);

  return {
    ethToken,
    isActiveSuccessForm,
    isActiveUnstakeForm,
    isActiveUserWalletForm,
    isFetchStatsLoading,
    isUnstakeLoading,
    fetchStatsData,
    fetchStatsError,
    maxAmountDecimals,
    networkName,
    polkadotToken,
    userAmount,
    onSuccessClose,
    onUnstakeFormClose,
    onUnstakeSubmit,
    onUserWalletClose,
    onUserWalletExtraValidation,
    onUserWalletSubmit,
  };
};
