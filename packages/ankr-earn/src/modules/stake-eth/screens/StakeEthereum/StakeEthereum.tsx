import { resetRequests } from '@redux-requests/core';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { Faq } from 'modules/common/components/Faq';
import { DEFAULT_FIXED, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { getAPY } from 'modules/stake-eth/actions/getAPY';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getStakeGasFee } from 'modules/stake-eth/actions/getStakeGasFee';
import { ETH_STAKING_AMOUNT_STEP } from 'modules/stake-eth/const';
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
  const dispatch = useDispatch();
  const classes = useStakeEthereumStyles();

  const { onErroMessageClick, hasError } = useErrorMessage();

  const { isSuccessOpened, onAddTokenClick, onSuccessClose, onSuccessOpen } =
    useSuccessDialog();

  const {
    isCommonDataLoading,
    isEthRatioLoading,
    isFeeLoading,
    isTokenVariantDisabled,
    totalAmount,
    balance,
    fee,
    ethRatio,
    amount,
    minAmount,
    loading,
    tokenIn,
    tokenOut,
    onInputChange,
    onSubmit,
    onTokenSelect,
  } = useStakeForm(onSuccessOpen);

  const stats = useStakeStats(amount ?? ZERO);
  const faqItems = useFaq();

  useProviderEffect(() => {
    dispatch(getCommonData());
    dispatch(getAPY());

    return () => {
      dispatch(resetRequests([getStakeGasFee.toString()]));
    };
  }, [dispatch]);

  const renderStats = useCallback(
    () => (
      <FormStats
        amount={totalAmount}
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
      totalAmount,
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
            isMaxBtnShowed
            balance={balance}
            feeSlot={
              <StakeFeeInfo
                isLoading={isFeeLoading}
                token={t('unit.eth')}
                value={fee}
              />
            }
            isBalanceLoading={hasError || isCommonDataLoading}
            isDisabled={loading}
            loading={hasError || loading}
            minAmount={minAmount}
            renderStats={renderStats}
            stakingAmountStep={ETH_STAKING_AMOUNT_STEP}
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
