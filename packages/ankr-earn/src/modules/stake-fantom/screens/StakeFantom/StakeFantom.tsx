import { ButtonBase } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { Faq } from 'modules/common/components/Faq';
import { DECIMAL_PLACES } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { useCallback } from 'react';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStats } from './hooks/useStakeStats';
import { useStakeFantomStyles } from './useStakeFantomStyles';

export const StakeFantom = () => {
  const classes = useStakeFantomStyles();

  const {
    amount,
    onSubmit,
    balance,
    stakingAmountStep,
    minAmount,
    loading,
    tokenIn,
    tokenOut,
    onChange,
  } = useStakeForm();

  const stats = useStakeStats(+amount);
  const faqItems = useFaq();

  const renderStats = useCallback(
    (amount: number) => {
      return (
        <StakeDescriptionContainer>
          <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

          <StakeDescriptionValue>
            {t('unit.token-value', {
              token: tokenOut,
              value: new BigNumber(amount).decimalPlaces(DECIMAL_PLACES),
            })}

            {/* todo: set actual tooltip text */}
            <Tooltip title={t('Some tooltip')}>
              <ButtonBase className={classes.questionBtn}>
                <QuestionIcon size="xs" />
              </ButtonBase>
            </Tooltip>
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      );
    },
    [classes, tokenOut],
  );

  return (
    <section className={classes.root}>
      <StakeContainer>
        <StakeForm
          onSubmit={onSubmit}
          balance={balance}
          stakingAmountStep={stakingAmountStep}
          minAmount={minAmount}
          loading={loading}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          onChange={onChange}
          renderStats={renderStats}
        />

        <StakeStats stats={stats} />

        <Faq data={faqItems} />
      </StakeContainer>
    </section>
  );
};
