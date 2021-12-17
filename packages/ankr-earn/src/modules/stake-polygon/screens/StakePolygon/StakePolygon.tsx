import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import {
  IStakeSubmitPayload,
  StakeForm,
} from 'modules/stake/components/StakeForm';
import { RoutesConfig } from '../../Routes';
import { t } from 'modules/i18n/utils/intl';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { fetchStats } from '../../actions/fetchStats';
import { Queries } from 'modules/common/components/Queries/Queries';
import { stake } from '../../actions/stake';
import { DECIMAL_PLACES } from 'modules/common/const';
import { ResponseData } from 'modules/common/components/ResponseData';

export const StakePolygon = () => {
  const { push } = useHistory();
  const dispatchRequest = useDispatchRequest();

  useInitEffect(() => {
    dispatchRequest(fetchStats());
  });

  const handleSubmit = ({ amount }: IStakeSubmitPayload): void => {
    dispatchRequest(stake({ amount: new BigNumber(amount) })).then(
      ({ error }) => {
        if (!error) {
          push(RoutesConfig.dashboard.generatePath());
        }
      },
    );
  };

  const { loading } = useMutation({ type: stake.toString() });

  const handleCancel = useCallback(() => {
    push(RoutesConfig.dashboard.generatePath());
  }, [push]);

  const yearlyInterest = useMemo(() => new BigNumber(0.12), []);

  // TODO: proper "you will get" value

  const renderStats = useCallback(
    (amount: number) => {
      const isZeroAmount: boolean = amount === 0;
      return (
        <StakeDescriptionContainer>
          <>
            <StakeDescriptionName>
              {t('stake.you-will-get')}
            </StakeDescriptionName>

            <StakeDescriptionValue>
              {t(isZeroAmount ? 'unit.matic-value' : 'unit.~polygon', {
                value: new BigNumber(amount)
                  .multipliedBy(yearlyInterest)
                  .decimalPlaces(DECIMAL_PLACES),
              })}
            </StakeDescriptionValue>
          </>
        </StakeDescriptionContainer>
      );
    },
    [yearlyInterest],
  );

  return (
    <Queries<ResponseData<typeof fetchStats>> requestActions={[fetchStats]}>
      {({ data }) => (
        <StakeForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          balance={/*data.maticBalance*/ new BigNumber(123)}
          maxAmount={/*data.maticBalance.toNumber()*/ 123}
          stakingAmountStep={0.1}
          minAmount={/*data.minimumStake.toNumber()*/ 123}
          loading={loading}
          currency={t('unit.polygon')}
          renderStats={renderStats}
        />
      )}
    </Queries>
  );
};
