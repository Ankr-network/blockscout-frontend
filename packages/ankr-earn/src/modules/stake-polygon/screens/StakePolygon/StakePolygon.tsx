import { ButtonBase } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Faq } from 'modules/common/components/Faq';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/components/ResponseData';
import { DECIMAL_PLACES } from 'modules/common/const';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { fetchValidatorsDetails } from 'modules/metrics/actions/fetchValidatorsDetails';
import { fetchAPY } from 'modules/stake-polygon/actions/fetchAPY';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { fetchStats } from '../../actions/fetchStats';

import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStats } from './hooks/useStakeStats';
import { useStakePolygonStyles } from './useStakePolygonStyles';

export const StakePolygon = (): JSX.Element => {
  const classes = useStakePolygonStyles();
  const dispatchRequest = useDispatchRequest();

  const { amount, apy, handleFormChange, handleSubmit, isStakeLoading } =
    useStakeForm();

  const faqItems = useFaq();
  const stats = useStakeStats({
    amount,
    apy,
  });

  useProviderEffect(() => {
    dispatchRequest(fetchValidatorsDetails());
    dispatchRequest(fetchAPY());
    dispatchRequest(fetchStats());
  }, [dispatchRequest]);

  const renderStats = useCallback(
    (formAmount: BigNumber) => {
      return (
        <StakeDescriptionContainer>
          <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

          <StakeDescriptionValue>
            <StakeDescriptionAmount
              symbol={t('unit.amaticb')}
              value={formAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
            />

            <Tooltip
              title={<div>{tHTML('stake-polygon.matic-tooltip-body')}</div>}
            >
              <ButtonBase className={classes.questionBtn}>
                <QuestionIcon className={classes.questionIcon} size="xs" />
              </ButtonBase>
            </Tooltip>
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      );
    },
    [classes],
  );

  return (
    <Queries<ResponseData<typeof fetchStats>> requestActions={[fetchStats]}>
      {({ data }) => (
        <section className={classes.root}>
          <StakeContainer>
            <StakeForm
              balance={data.maticBalance}
              loading={isStakeLoading}
              maxAmount={data.maticBalance}
              minAmount={data.minimumStake}
              renderStats={renderStats}
              tokenIn={t('unit.polygon')}
              tokenOut={t('unit.amaticb')}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
            />

            <StakeStats stats={stats} />

            <Faq data={faqItems} />
          </StakeContainer>
        </section>
      )}
    </Queries>
  );
};
