import { ButtonBase } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq } from 'modules/common/components/Faq';
import { DECIMAL_PLACES } from 'modules/common/const';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeSuccessDialog } from 'modules/stake/components/StakeSuccessDialog';
import { useCallback, useEffect } from 'react';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';
import { useErrorMessage } from './hooks/useErrorMessage';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStats } from './hooks/useStakeStats';
import { useSuccessDialog } from './hooks/useSuccessDialog';
import { useStakeFantomStyles } from './useStakeFantomStyles';

export const StakeFantom = () => {
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

  const stats = useStakeStats(+amount);
  const faqItems = useFaq();

  useEffect(() => {
    dispatchRequest(getCommonData());
  }, [dispatchRequest]);

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
            onClose={onSuccessClose}
            onAddTokenClick={onAddTokenClick}
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
            stakingAmountStep={stakingAmountStep}
            minAmount={minAmount ? new BigNumber(minAmount) : new BigNumber(0)}
            loading={hasError || loading}
            isBalanceLoading={hasError || isCommonDataLoading}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            onSubmit={onSubmit}
            onChange={onChange}
            renderStats={renderStats}
          />

          <StakeStats stats={stats} />

          <Faq data={faqItems} />
        </StakeContainer>
      )}
    </section>
  );
};
