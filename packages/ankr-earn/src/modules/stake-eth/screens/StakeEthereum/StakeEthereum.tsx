import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq } from 'modules/common/components/Faq';
import { featuresConfig, ZERO } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { ETokenVariant } from 'modules/stake-eth/const';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { StakeStats } from 'modules/stake/components/StakeStats';
import { StakeSuccessDialog } from 'modules/stake/components/StakeSuccessDialog';
import { Container } from 'uiKit/Container';

import { FormStats } from './components/FormStats';
import { TokenVariant } from './components/TokenVariant';
import { TokenVariantList } from './components/TokenVariantList';
import { useErrorMessage } from './hooks/useErrorMessage';
import { useFaq } from './hooks/useFaq';
import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStats } from './hooks/useStakeStats';
import { useSuccessDialog } from './hooks/useSuccessDialog';
import { useStakeEthereumStyles } from './useStakeEthereumStyles';

export const StakeEthereum = (): JSX.Element => {
  const classes = useStakeEthereumStyles();

  const { onErroMessageClick, hasError } = useErrorMessage();

  const { isSuccessOpened, onAddTokenClick, onSuccessClose, onSuccessOpen } =
    useSuccessDialog();

  const {
    isCommonDataLoading,
    amount,
    balance,
    minAmount,
    loading,
    tokenIn,
    tokenOut,
    tokenTooltip,
    onInputChange,
    onSubmit,
    onTokenSelect,
  } = useStakeForm(onSuccessOpen);

  const stats = useStakeStats(amount);
  const { onQuestionClick, items: faqItems } = useFaq();

  const renderStats = useCallback(
    (formAmount: BigNumber) => (
      <FormStats
        amount={formAmount}
        tokenOut={tokenOut}
        tokenTooltip={tokenTooltip}
        tokenVariantsSlot={
          <TokenVariantList>
            <TokenVariant
              icon={ETokenVariant.aETHb}
              isActive={tokenOut === ETokenVariant.aETHb}
              title={t('unit.feth')}
              onClick={onTokenSelect(ETokenVariant.aETHb)}
            />

            <TokenVariant
              icon={ETokenVariant.aETHc}
              isActive={tokenOut === ETokenVariant.aETHc}
              title={t('unit.aeth')}
              onClick={onTokenSelect(ETokenVariant.aETHc)}
            />
          </TokenVariantList>
        }
        onQuestionClick={onQuestionClick}
      />
    ),
    [onQuestionClick, onTokenSelect, tokenOut, tokenTooltip],
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
            minAmount={minAmount ? new BigNumber(minAmount) : ZERO}
            renderStats={renderStats}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            onChange={onInputChange}
            onSubmit={onSubmit}
          />

          <StakeStats stats={stats} />

          <Faq data={faqItems} />
        </StakeContainer>
      )}
    </section>
  );
};
