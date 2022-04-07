import { ButtonBase } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq } from 'modules/common/components/Faq';
import { DECIMAL_PLACES, featuresConfig, ZERO } from 'modules/common/const';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { getAPY } from 'modules/stake-fantom/actions/getAPY';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useErrorMessage } from './hooks/useErrorMessage';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStats } from './hooks/useStakeStats';
import { useStakeFantomStyles } from './useStakeFantomStyles';

export const StakeFantom = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();
  const classes = useStakeFantomStyles();

  const { onErroMessageClick, hasError } = useErrorMessage();

  const {
    isCommonDataLoading,
    amount,
    balance,
    minAmount,
    loading,
    tokenIn,
    tokenOut,
    onChange,
    onSubmit,
  } = useStakeForm();

  const faqItems = useFaq();
  const stats = useStakeStats(amount);

  useProviderEffect(() => {
    dispatchRequest(getCommonData());
    dispatchRequest(getAPY());
  }, [dispatchRequest]);

  const renderStats = useCallback(
    (formAmount: BigNumber) => {
      return (
        <StakeDescriptionContainer>
          <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

          <StakeDescriptionValue>
            <StakeDescriptionAmount
              symbol={tokenOut}
              value={formAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
            />

            <Tooltip title={tHTML('stake-fantom.aftmb-tooltip')}>
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
        {hasError && (
          <ErrorMessage title={t('error.some')} onClick={onErroMessageClick} />
        )}

        <StakeForm
          balance={balance}
          isBalanceLoading={hasError || isCommonDataLoading}
          isMaxBtnShowed={featuresConfig.maxStakeAmountBtn}
          loading={hasError || loading}
          minAmount={minAmount ? new BigNumber(minAmount) : ZERO}
          renderStats={renderStats}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          onChange={onChange}
          onSubmit={onSubmit}
        />

        <StakeStats stats={stats} />

        <Faq data={faqItems} />
      </StakeContainer>
    </section>
  );
};
