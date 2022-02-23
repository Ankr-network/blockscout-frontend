import { ButtonBase } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq } from 'modules/common/components/Faq';
import { DECIMAL_PLACES, featuresConfig } from 'modules/common/const';
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
import { StakeSuccessDialog } from 'modules/stake/components/StakeSuccessDialog';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useErrorMessage } from './hooks/useErrorMessage';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStats } from './hooks/useStakeStats';
import { useSuccessDialog } from './hooks/useSuccessDialog';
import { useStakeFantomStyles } from './useStakeFantomStyles';

export const StakeFantom = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();
  const classes = useStakeFantomStyles();

  const { onErroMessageClick, hasError } = useErrorMessage();

  const { isSuccessOpened, onAddTokenClick, onSuccessClose, onSuccessOpen } =
    useSuccessDialog();

  const {
    isCommonDataLoading,
    amount,
    balance,
    stakingAmountStep,
    minAmount,
    loading,
    tokenIn,
    tokenOut,
    onChange,
    onSubmit,
  } = useStakeForm(onSuccessOpen);

  const faqItems = useFaq();
  const stats = useStakeStats(amount);

  useProviderEffect(() => {
    dispatchRequest(getCommonData());
    dispatchRequest(getAPY());
  }, [dispatchRequest]);

  const renderStats = useCallback(
    (value: BigNumber) => {
      return (
        <StakeDescriptionContainer>
          <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

          <StakeDescriptionValue>
            <StakeDescriptionAmount symbol={tokenOut}>
              {value.decimalPlaces(DECIMAL_PLACES).toFormat()}
            </StakeDescriptionAmount>

            <small>{tokenOut}</small>

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
      {isSuccessOpened ? (
        <Container>
          <StakeSuccessDialog
            tokenName={tokenOut}
            onAddTokenClick={onAddTokenClick}
            onClose={onSuccessClose}
          />
        </Container>
      ) : (
        <StakeContainer>
          {hasError && (
            <ErrorMessage
              title={t('error.some')}
              onClick={onErroMessageClick}
            />
          )}

          <StakeForm
            balance={balance}
            isBalanceLoading={hasError || isCommonDataLoading}
            isMaxBtnShowed={featuresConfig.maxStakeAmountBtn}
            loading={hasError || loading}
            minAmount={minAmount ? new BigNumber(minAmount) : new BigNumber(0)}
            renderStats={renderStats}
            stakingAmountStep={stakingAmountStep}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            onChange={onChange}
            onSubmit={onSubmit}
          />

          <StakeStats stats={stats} />

          <Faq data={faqItems} />
        </StakeContainer>
      )}
    </section>
  );
};
