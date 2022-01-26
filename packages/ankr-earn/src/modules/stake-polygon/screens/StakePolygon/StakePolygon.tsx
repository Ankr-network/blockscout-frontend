import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { Faq } from 'modules/common/components/Faq';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/components/ResponseData';
import { DECIMAL_PLACES } from 'modules/common/const';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { t } from 'modules/i18n/utils/intl';
import { MATIC_STAKING_AMOUNT_STEP } from 'modules/stake-polygon/const';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeSuccessDialog } from 'modules/stake/components/StakeSuccessDialog';
import { useCallback } from 'react';
import { fetchStats } from '../../actions/fetchStats';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStats } from './hooks/useStakeStats';
import { useSuccessDialog } from './hooks/useSuccessDialog';
import { useStakePolygonStyles } from './useStakePolygonStyles';

export const StakePolygon = () => {
  const classes = useStakePolygonStyles();
  const dispatchRequest = useDispatchRequest();
  const {
    token,
    onAddTokenClick,
    onSuccessOpen,
    onSuccessClose,
    isSuccessOpened,
  } = useSuccessDialog();

  const { amount, handleFormChange, handleSubmit, isStakeLoading } =
    useStakeForm({
      openSuccessModal: onSuccessOpen,
    });

  const stats = useStakeStats(+amount);
  const faqItems = useFaq();

  useInitEffect(() => {
    dispatchRequest(fetchStats());
  });

  const renderStats = useCallback((amount: number) => {
    const isZeroAmount: boolean = amount === 0;
    return (
      <StakeDescriptionContainer>
        <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

        <StakeDescriptionValue>
          {t(isZeroAmount ? 'unit.matic-value' : 'unit.~polygon', {
            value: new BigNumber(amount).decimalPlaces(DECIMAL_PLACES),
          })}
        </StakeDescriptionValue>
      </StakeDescriptionContainer>
    );
  }, []);

  return (
    <Queries<ResponseData<typeof fetchStats>> requestActions={[fetchStats]}>
      {({ data }) => (
        <section className={classes.root}>
          <StakeContainer>
            <StakeForm
              onSubmit={handleSubmit}
              balance={data.maticBalance}
              maxAmount={data.maticBalance.toNumber()}
              stakingAmountStep={MATIC_STAKING_AMOUNT_STEP}
              minAmount={data.minimumStake.toNumber()}
              loading={isStakeLoading}
              tokenIn={t('unit.polygon')}
              tokenOut={t('unit.amaticb')}
              renderStats={renderStats}
              onChange={handleFormChange}
            />

            <StakeStats stats={stats} />

            <Faq data={faqItems} />

            <StakeSuccessDialog
              isOpened={isSuccessOpened}
              onClose={onSuccessClose}
              token={token}
              onAddTokenClick={undefined}
            />
          </StakeContainer>
        </section>
      )}
    </Queries>
  );
};
