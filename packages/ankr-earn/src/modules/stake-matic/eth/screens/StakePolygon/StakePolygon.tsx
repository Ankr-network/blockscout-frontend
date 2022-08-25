import { useDispatchRequest } from '@redux-requests/react';

import { t, tHTML } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import { Faq } from 'modules/common/components/Faq';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/components/ResponseData';
import {
  AUDIT_LINKS,
  DECIMAL_PLACES,
  DEFAULT_FIXED,
  featuresConfig,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { NetworkTitle } from 'modules/stake-matic/common/components/NetworkTitle';
import { useMaticFaq } from 'modules/stake-matic/common/hooks/useMaticFaq';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { getStakeTradeInfoData } from 'modules/stake/actions/getStakeTradeInfoData';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeTradeInfo } from 'modules/stake/components/StakeTradeInfo';
import { TokenVariant } from 'modules/stake/components/TokenVariant';
import { TokenVariantList } from 'modules/stake/components/TokenVariantList';
import { EOpenOceanNetworks, EOpenOceanTokens } from 'modules/stake/types';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { AMATICCIcon } from 'uiKit/Icons/AMATICCIcon';

import { fetchStats } from '../../actions/fetchStats';

import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakePolygonStyles } from './useStakePolygonStyles';

export const StakePolygon = (): JSX.Element => {
  const classes = useStakePolygonStyles();
  const dispatchRequest = useDispatchRequest();

  const {
    aMATICcRatio,
    amount,
    certificateRatio,
    isFetchStatsLoading,
    isStakeLoading,
    tokenIn,
    tokenOut,
    totalAmount,
    handleFormChange,
    handleSubmit,
    onTokenSelect,
  } = useStakeForm();

  const faqItems = useFaq();
  const commonFaqItems = useMaticFaq();

  const renderStats = () => {
    return (
      <>
        <TokenVariantList my={5}>
          <TokenVariant
            description={tHTML('stake-matic-eth.amaticb-descr')}
            iconSlot={<AMATICBIcon />}
            isActive={tokenOut === Token.aMATICb}
            isDisabled={isStakeLoading}
            title={t('unit.amaticb')}
            onClick={onTokenSelect(Token.aMATICb)}
          />

          <TokenVariant
            description={tHTML('stake-matic-eth.amaticc-descr', {
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

  useProviderEffect(() => {
    dispatchRequest(getMetrics());
    dispatchRequest(fetchStats());
  }, [dispatchRequest]);

  useProviderEffect(() => {
    if (!featuresConfig.isActiveStakeTradeInfo) {
      return;
    }

    dispatchRequest(
      getStakeTradeInfoData({
        baseToken: EOpenOceanTokens.MATIC,
        bondToken: EOpenOceanTokens.aMATICb,
        certificateRatio,
        certificateToken: EOpenOceanTokens.aMATICc,
        network: EOpenOceanNetworks.ETH,
      }),
    );
  }, [certificateRatio, dispatchRequest]);

  return (
    <Queries<ResponseData<typeof fetchStats>> requestActions={[fetchStats]}>
      {({ data }) => (
        <section className={classes.root}>
          <StakeContainer>
            {featuresConfig.isActiveStakeTradeInfo && <StakeTradeInfo />}

            <StakeForm
              auditSlot={
                <AuditInfo>
                  <AuditInfoItem link={AUDIT_LINKS.matic} variant="beosin" />
                </AuditInfo>
              }
              balance={data.maticBalance}
              loading={isStakeLoading}
              maxAmount={data.maticBalance}
              minAmount={data.minimumStake}
              networkTitleSlot={<NetworkTitle />}
              renderStats={renderStats}
              tokenIn={tokenIn}
              tokenOut={tokenOut}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
            />

            <StakeStats
              amount={amount}
              metricsServiceName={EMetricsServiceName.MATIC}
            />

            <Faq
              data={
                featuresConfig.maticPolygonStaking ? commonFaqItems : faqItems
              }
            />
          </StakeContainer>
        </section>
      )}
    </Queries>
  );
};
