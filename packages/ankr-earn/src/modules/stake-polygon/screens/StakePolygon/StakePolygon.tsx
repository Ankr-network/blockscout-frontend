import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { t, tHTML } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Faq } from 'modules/common/components/Faq';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/components/ResponseData';
import { DECIMAL_PLACES, DEFAULT_FIXED } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchAPY } from 'modules/stake-polygon/actions/fetchAPY';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { TokenVariant } from 'modules/stake/components/TokenVariant';
import { TokenVariantList } from 'modules/stake/components/TokenVariantList';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { AMATICCIcon } from 'uiKit/Icons/AMATICCIcon';

import { fetchStats } from '../../actions/fetchStats';

import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakePolygonStyles } from './useStakePolygonStyles';

export const StakePolygon = (): JSX.Element => {
  const classes = useStakePolygonStyles();
  const dispatchRequest = useDispatchRequest();
  const { data: apy } = useQuery({ type: fetchAPY });

  const {
    amount,
    handleFormChange,
    handleSubmit,
    isStakeLoading,
    tokenIn,
    tokenOut,
    onTokenSelect,
    isFetchStatsLoading,
    aMATICcRatio,
    totalAmount,
  } = useStakeForm();

  const faqItems = useFaq();

  useProviderEffect(() => {
    dispatchRequest(getMetrics());
    dispatchRequest(fetchAPY());
    dispatchRequest(fetchStats());
  }, [dispatchRequest]);

  const renderStats = () => {
    return (
      <>
        <TokenVariantList my={5}>
          <TokenVariant
            description={tHTML('stake-polygon.amaticb-descr')}
            iconSlot={<AMATICBIcon />}
            isActive={tokenOut === Token.aMATICb}
            isDisabled={isStakeLoading}
            title={t('unit.amaticb')}
            onClick={onTokenSelect(Token.aMATICb)}
          />

          <TokenVariant
            description={tHTML('stake-polygon.amaticc-descr', {
              rate: isFetchStatsLoading
                ? '...'
                : aMATICcRatio.decimalPlaces(DEFAULT_FIXED).toFormat(),
            })}
            iconSlot={<AMATICCIcon />}
            isActive={tokenOut === Token.aMATICc}
            isDisabled={isStakeLoading}
            title={t('unit.amaticc')}
            onClick={onTokenSelect(Token.aMATICc)}
          />
        </TokenVariantList>

        <StakeDescriptionContainer>
          <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

          <StakeDescriptionValue>
            <StakeDescriptionAmount
              symbol={tokenOut}
              value={totalAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
            />
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      </>
    );
  };

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
              tokenIn={tokenIn}
              tokenOut={tokenOut}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
            />

            <StakeStats
              amount={amount}
              apy={apy ?? undefined}
              metricsServiceName={EMetricsServiceName.MATIC}
            />

            <Faq data={faqItems} />
          </StakeContainer>
        </section>
      )}
    </Queries>
  );
};
