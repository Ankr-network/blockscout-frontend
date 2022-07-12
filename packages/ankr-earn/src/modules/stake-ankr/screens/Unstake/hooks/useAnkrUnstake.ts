import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { ZERO } from 'modules/common/const';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { IAnkrStakeSubmitPayload } from 'modules/stake-ankr/types';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

interface IUseAnkrUnstake {
  isUnstakeLoading: boolean;
  isBalanceLoading: boolean;
  balance: BigNumber;
  tokenIn: string;
  closeHref: string;
  isDisabled: boolean;
  providerId: string;
  providerName?: string;
  onSubmit: (values: IAnkrStakeSubmitPayload) => void;
}

export const useAnkrUnstake = (): IUseAnkrUnstake => {
  const { data: providers, loading: isProvidersLoading } = useQuery({
    type: getProviders,
  });

  const { data, loading: isBalanceLoading } = useQuery({
    type: getCommonData,
  });

  const { provider: queryProvider } = RoutesConfig.stake.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  return {
    isUnstakeLoading: false,
    isBalanceLoading,
    isDisabled: isProvidersLoading || isBalanceLoading,
    balance: data?.ankrBalance ?? ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerId: initialProvider ?? '',
    providerName: providerName ?? '',
    onSubmit: () => {},
  };
};
