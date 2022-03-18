import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq } from 'modules/common/components/Faq';
import { DEFAULT_FIXED, featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { getAPY } from 'modules/stake-eth/actions/getAPY';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeFeeInfo } from 'modules/stake/components/StakeFeeInfo';
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
  const dispatchRequest = useDispatchRequest();
  const classes = useStakeEthereumStyles();

  const { onErroMessageClick, hasError } = useErrorMessage();

  const { isSuccessOpened, onAddTokenClick, onSuccessClose, onSuccessOpen } =
    useSuccessDialog();

  const {
    isCommonDataLoading,
    isEthRatioLoading,
    isFeeLoading,
    isTokenVariantDisabled,
    resultAmount,
    balance,
    fee,
    ethRatio,
    amount,
    minAmount,
    maxAmount,
    loading,
    tokenIn,
    tokenOut,
    onInputChange,
    onSubmit,
    onTokenSelect,
  } = useStakeForm(onSuccessOpen);

  const stats = useStakeStats(amount);
  const faqItems = useFaq();

  useProviderEffect(() => {
    dispatchRequest(getCommonData());
    dispatchRequest(getAPY());
  }, [dispatchRequest]);

  const renderStats = useCallback(
    () => (
      <FormStats
        amount={resultAmount}
        isLoading={isFeeLoading}
        tokenOut={tokenOut}
        tokenVariantsSlot={
          <TokenVariantList>
            <TokenVariant
              description={tHTML('stake-ethereum.aethb-descr')}
              icon={Token.aETHb}
              isActive={tokenOut === Token.aETHb}
              isDisabled={isTokenVariantDisabled}
              title={t('unit.feth')}
              onClick={onTokenSelect(Token.aETHb)}
            />

            <TokenVariant
              description={tHTML('stake-ethereum.aethc-descr', {
                ethRate: isEthRatioLoading
                  ? '...'
                  : ethRatio.decimalPlaces(DEFAULT_FIXED).toFormat(),
              })}
              icon={Token.aETHc}
              isActive={tokenOut === Token.aETHc}
              isDisabled={isTokenVariantDisabled}
              title={t('unit.aeth')}
              onClick={onTokenSelect(Token.aETHc)}
            />
          </TokenVariantList>
        }
      />
    ),
    [
      ethRatio,
      isEthRatioLoading,
      isFeeLoading,
      isTokenVariantDisabled,
      onTokenSelect,
      resultAmount,
      tokenOut,
    ],
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
            feeSlot={
              featuresConfig.stakeETHFee && (
                <StakeFeeInfo
                  isLoading={isFeeLoading}
                  value={t('unit.token-value', {
                    token: t('unit.eth'),
                    value: fee.toFormat(),
                  })}
                />
              )
            }
            isBalanceLoading={hasError || isCommonDataLoading}
            isDisabled={loading}
            isMaxBtnShowed={featuresConfig.maxStakeAmountBtn}
            loading={hasError || loading}
            maxAmount={maxAmount}
            minAmount={minAmount}
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
