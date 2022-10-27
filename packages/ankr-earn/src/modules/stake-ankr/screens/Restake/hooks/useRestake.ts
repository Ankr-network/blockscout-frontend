import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { useGetCommonDataQuery } from 'modules/stake-ankr/actions/getCommonData';
import { useGetEpochEndSecondsQuery } from 'modules/stake-ankr/actions/getEpochEndSeconds';
import { useGetProvidersQuery } from 'modules/stake-ankr/actions/getProviders';
import { useGetRestakableAmountQuery } from 'modules/stake-ankr/actions/getRestakableAmount';
import { useGetValidatorDelegatedAmountQuery } from 'modules/stake-ankr/actions/getValidatorDelegatedAmount';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';
import { getEndEpochText } from 'modules/stake-ankr/utils/getEndEpochText';

import { useRestakeMutation } from '../../../actions/restake';
import { RoutesConfig } from '../../../RoutesConfig';

interface IUseRestake {
  loading: boolean;
  restakable: BigNumber;
  newTotalStake?: BigNumber;
  tokenIn: string;
  closeHref: string;
  providerId: string;
  providerName: string;
  epochEnds: string;
  lockingPeriod?: Days;
  onSubmit: () => void;
}

export const useRestake = (): IUseRestake => {
  const { provider: queryProvider = '' } = RoutesConfig.stake.useParams();

  const { data: providers } = useGetProvidersQuery();
  const { data: delegatedAmount, isFetching: isDelegatedAmountLoading } =
    useGetValidatorDelegatedAmountQuery({ validator: queryProvider });

  const { data: commonData, refetch: getCommonDataRefetch } =
    useGetCommonDataQuery();

  const { data: epochEndsSeconds } = useGetEpochEndSecondsQuery(undefined, {
    pollingInterval: 30_000,
  });

  const [restake, { isLoading: isRestakeLoading }] = useRestakeMutation();

  const { data: restakableAmount, refetch: getRestakableAmountRefetch } =
    useGetRestakableAmountQuery({
      validator: queryProvider,
    });
  const readyRestakableAmount = restakableAmount ?? ZERO;
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  const epochEnds = getEndEpochText(epochEndsSeconds ?? 0);

  useProviderEffect(() => {
    getCommonDataRefetch();
    getRestakableAmountRefetch();
  }, []);

  const onSubmit = () => {
    restake({
      provider: queryProvider ?? '',
    });
  };

  return {
    loading: isRestakeLoading || isDelegatedAmountLoading,
    restakable: readyRestakableAmount,
    newTotalStake: delegatedAmount?.plus(readyRestakableAmount),
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerId: initialProvider ?? '',
    providerName: providerName ?? '',
    epochEnds,
    lockingPeriod: commonData?.lockingPeriod ?? undefined,
    onSubmit,
  };
};
