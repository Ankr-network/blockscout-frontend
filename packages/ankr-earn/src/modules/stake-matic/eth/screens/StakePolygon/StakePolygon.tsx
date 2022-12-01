import { t } from '@ankr.com/common';
import { Grid } from '@material-ui/core';
import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import classNames from 'classnames';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import { Faq } from 'modules/common/components/Faq';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/components/ResponseData';
import {
  AUDIT_LINKS,
  DECIMAL_PLACES,
  DUNE_ANALYTICS_LINK,
  featuresConfig,
  ONE,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { NetworkTitle } from 'modules/stake-matic/common/components/NetworkTitle';
import { getFAQ } from 'modules/stake/actions/getFAQ';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { getStakeTradeInfoData } from 'modules/stake/actions/getStakeTradeInfoData';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeTradeInfo } from 'modules/stake/components/StakeTradeInfo';
import { EOpenOceanNetworks, EOpenOceanTokens } from 'modules/stake/types';
import { useAppDispatch } from 'store/useAppDispatch';
import { Button } from 'uiKit/Button';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';
import { NumericStepper } from 'uiKit/Stepper';

import { StakeTokenInfo } from '../../../../stake/components/StakeTokenInfo/StakeTokenInfo';
import { useBTokenNotice } from '../../../../stake/hooks/useBTokenNotice';
import { approveMATICStake } from '../../actions/approveMATICStake';
import { fetchStats } from '../../actions/fetchStats';
import { getStakeGasFee } from '../../actions/getStakeGasFee';

import { useStakeForm } from './hooks/useStakeForm';
import { useStakePolygonStyles } from './useStakePolygonStyles';

const resetRequests = () =>
  resetReduxRequests([
    approveMATICStake.toString(),
    fetchStats.toString(),
    getFAQ.toString(),
    getMetrics.toString(),
    getStakeGasFee.toString(),
  ]);

export const StakePolygon = (): JSX.Element => {
  const classes = useStakePolygonStyles();

  const dispatch = useAppDispatch();

  const {
    aMATICcRatio,
    activeStep,
    amount,
    certificateRatio,
    faqItems,
    gasFee,
    isApproveLoading,
    isApproved,
    isShouldBeApproved,
    isShowGasFee,
    isStakeLoading,
    tokenIn,
    tokenOut,
    totalAmount,
    handleFormChange,
    handleSubmit,
  } = useStakeForm();

  const renderStats = () => {
    return (
      <>
        <StakeTokenInfo
          nativeAmount={ONE.multipliedBy(aMATICcRatio).round().toString()}
          nativeToken={Token.MATIC}
          token={t('unit.amaticc')}
        />

        <StakeDescriptionContainer>
          <StakeDescriptionName>
            {t('stake.you-will-receive')}
          </StakeDescriptionName>

          <StakeDescriptionValue>
            <StakeDescriptionAmount
              symbol={getTokenName(tokenOut)}
              value={totalAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
            />
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      </>
    );
  };

  const renderFooter = (): JSX.Element => (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <Button
            fullWidth
            color="primary"
            disabled={isApproved || isApproveLoading}
            endIcon={
              <QuestionWithTooltip
                className={classNames(
                  isApproved
                    ? classes.questionBtnDisabled
                    : classes.questionBtnActive,
                )}
              >
                {t('common.tooltips.allowance')}
              </QuestionWithTooltip>
            }
            isLoading={isApproveLoading}
            size="large"
            type="submit"
          >
            {t('stake-matic-eth.btn.approve')}
          </Button>
        </Grid>

        <Grid item xs>
          <Button
            fullWidth
            color="primary"
            disabled={isStakeLoading || isShouldBeApproved}
            isLoading={isStakeLoading}
            size="large"
            type="submit"
          >
            {t('stake-matic-eth.btn.submit', {
              token: getTokenName(tokenOut),
            })}
          </Button>
        </Grid>
      </Grid>

      <NumericStepper
        activeStep={activeStep}
        className={classes.stepper}
        stepsCount={2}
      />
    </>
  );

  useProviderEffect(() => {
    dispatch(resetRequests());

    dispatch(fetchStats());
    dispatch(getFAQ(Token.MATIC));
    dispatch(getMetrics());

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);

  useProviderEffect(() => {
    if (!featuresConfig.isActiveStakeTradeInfo) {
      return;
    }

    dispatch(
      getStakeTradeInfoData({
        baseToken: EOpenOceanTokens.MATIC,
        bondToken: EOpenOceanTokens.aMATICb,
        certificateRatio,
        certificateToken: EOpenOceanTokens.aMATICc,
        network: EOpenOceanNetworks.ETH,
      }),
    );
  }, [certificateRatio, dispatch]);

  const noticeText = useBTokenNotice({
    bToken: Token.aMATICb,
    cToken: Token.aMATICc,
    nativeToken: Token.MATIC,
  });

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
              feeSlot={
                isShowGasFee && (
                  <StakeFeeInfo mt={-1.5} token={Token.ETH} value={gasFee} />
                )
              }
              isDisabled={isApproved || isApproveLoading}
              loading={isStakeLoading}
              maxAmount={data.maticBalance}
              minAmount={data.minimumStake}
              networkTitleSlot={<NetworkTitle />}
              noticeSlot={noticeText}
              renderFooter={renderFooter}
              renderStats={renderStats}
              tokenIn={tokenIn}
              tokenOut={tokenOut}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
            />

            <StakeStats
              amount={amount}
              analyticsLink={DUNE_ANALYTICS_LINK.matic}
              metricsServiceName={EMetricsServiceName.MATIC}
            />

            <Faq data={faqItems} />
          </StakeContainer>
        </section>
      )}
    </Queries>
  );
};
