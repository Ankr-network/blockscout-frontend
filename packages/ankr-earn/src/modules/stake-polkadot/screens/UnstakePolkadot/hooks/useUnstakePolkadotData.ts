import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router';

import { PolkadotProvider } from 'polkadot';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { useDialog } from 'modules/common/hooks/useDialog';
import { FormErrors } from 'modules/common/types/FormErrors';
import { ResponseData } from 'modules/common/types/ResponseData';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { t } from 'modules/i18n/utils/intl';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';
import { IUnstakeUserWalletFormValues } from 'modules/stake/components/UnstakeUserWallet';

import { fetchStats } from '../../../actions/fetchStats';
import { unstake } from '../../../actions/unstake';
import { useFetchStats } from '../../../hooks/useFetchStats';
import {
  EPolkadotETHReverseMap,
  EPolkadotNetworks,
  TPolkadotToken,
} from '../../../types';
import { getRedeemPeriod } from '../../../utils/getRedeemPeriod';

interface IUseUnstakePolkadotData {
  ethToken: Token;
  isActiveSuccessForm: boolean;
  isActiveUnstakeForm: boolean;
  isActiveUserWalletForm: boolean;
  isFetchStatsLoading: boolean;
  isUnstakeLoading: boolean;
  fetchStatsData: ResponseData<typeof fetchStats> | null;
  fetchStatsError: Error | null;
  networkName: string;
  polkadotToken: TPolkadotToken;
  redeemPeriodTxt: string;
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
    isLoading: isFetchStatsLoading,
    error: fetchStatsError,
    stats: fetchStatsData,
  } = useFetchStats();

  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const isActiveUnstakeForm = !isUserWalletOpened && !isSuccessOpened;
  const isActiveUserWalletForm = isUserWalletOpened && !isSuccessOpened;
  const isActiveSuccessForm = !isUserWalletOpened && isSuccessOpened;

  const ethToken = useMemo(
    () => EPolkadotETHReverseMap[network] as unknown as Token,
    [network],
  );

  const networkName = useMemo(
    () => t(`stake-polkadot.networks.${network}`),
    [network],
  );

  const polkadotToken = useMemo(() => Token[network], [network]);

  const redeemPeriodTxt = useMemo(
    () =>
      t('stake-polkadot.unstake.info', {
        token: polkadotToken,
        period: getRedeemPeriod(network),
      }),
    [network, polkadotToken],
  );

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

    dispatchRequest(unstake(userWallet, userAmount)).then(({ error }): void => {
      if (!error) {
        onUserWalletClose();

        onSuccessOpen();
      }
    });
  };

  useProviderEffect(() => {
    dispatchRequest(fetchStats());
  }, [dispatchRequest]);

  return {
    ethToken,
    isActiveSuccessForm,
    isActiveUnstakeForm,
    isActiveUserWalletForm,
    isFetchStatsLoading,
    isUnstakeLoading,
    fetchStatsData,
    fetchStatsError,
    networkName,
    polkadotToken,
    redeemPeriodTxt,
    userAmount,
    onSuccessClose,
    onUnstakeFormClose,
    onUnstakeSubmit,
    onUserWalletClose,
    onUserWalletExtraValidation,
    onUserWalletSubmit,
  };
};
