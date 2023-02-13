import { t } from '@ankr.com/common';
import { Box, Typography } from '@material-ui/core';
import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { useCallback, useState } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { resetAllowance } from 'modules/common/store/allowanceSlice';
import { Token } from 'modules/common/types/token';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';
import { ApprovalFormButtons } from 'modules/stake/components/ApprovalFormButtons/ApprovalFormButtons';
import { FlashUnstake } from 'modules/stake/components/FlashUnstake/FlashUnstake';
import {
  IUnstakeFormValues,
  UnstakeDialog,
} from 'modules/stake/components/UnstakeDialog';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';
import { useAppDispatch } from 'store/useAppDispatch';
import { Container } from 'uiKit/Container';

import { useFlashUnstakeBinanceApprovalForm } from './hooks/useFlashUnstakeBinanceApprovalForm';
import { useUnstakeBinanceApprovalForm } from './hooks/useUnstakeBinanceApprovalForm';
import { useUnstakeBnb } from './hooks/useUnstakeBnb';
import { useUnstakeBinanceStyles } from './useUnstakeBinanceStyles';

const resetRequests = () => resetReduxRequests([getUnstakeDate.toString()]);

export const UnstakeBinance = (): JSX.Element => {
  const classes = useUnstakeBinanceStyles();
  const dispatch = useAppDispatch();

  const {
    closeHref,
    isFetchStatsLoading,
    isUnstakeLoading,
    isFlashUnstakeLoading,
    isWithApprove,
    minAmount,
    selectedToken,
    syntTokenBalance,
    calcTotalRecieve,
    calcFlashTotalRecieve,
    onExtraValidation,
    onFlashExtraValidation,
    onUnstakeSubmit,
    onFlashUnstakeSubmit,
    instantFee,
    poolBalance,
  } = useUnstakeBnb();

  const isFlashUnstakeAllowed = selectedToken === Token.aBNBc;

  const [isFlash, setIsFlash] = useState(isFlashUnstakeAllowed);

  const onIsFlashChange = useCallback(
    (isFlashValue: boolean) => {
      dispatch(resetAllowance());
      setIsFlash(isFlashValue);
    },
    [dispatch],
  );

  // Hack otherwise need make useless two-way binding
  const [, setAmount] = useState<IUnstakeFormValues>();

  const onSubmit = useCallback(
    values => {
      if (isFlash) {
        onFlashUnstakeSubmit(values);
      } else {
        onUnstakeSubmit(values);
      }
    },
    [onFlashUnstakeSubmit, onUnstakeSubmit, isFlash],
  );

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: Token.BNB,
  });

  const {
    isApproveLoading,
    onApprovalSettingsFormSubmit,
    onApproveSubmit,
    approvalSettingsMode,
    allowance,
  } = useUnstakeBinanceApprovalForm(isFlash);

  const {
    isApproveLoading: isSwapPoolApproveLoading,
    onApprovalSettingsFormSubmit: onFlashApprovalSettingsFormSubmit,
    onApproveSubmit: onFlashApproveSubmit,
    approvalSettingsMode: flashApprovalSettingsMode,
    allowance: swapPoolAllowance,
  } = useFlashUnstakeBinanceApprovalForm(isFlash);

  const instantUnstakeLabel = t('stake-bnb.unstake.instant');

  useProviderEffect(() => {
    dispatch(resetRequests());
    dispatch(getUnstakeDate());

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);

  const onRenderFormFooter = (amount: BigNumber): JSX.Element => {
    const value = amount;
    const isInvalidAmount =
      value.isNaN() ||
      (!isFlash && value.isLessThan(minAmount)) ||
      syntTokenBalance?.isLessThan(value);

    let totalRecieve = '0';
    if (!isInvalidAmount) {
      totalRecieve = isFlash
        ? calcFlashTotalRecieve(amount)
        : calcTotalRecieve(amount);
    }

    return (
      <>
        {isFlashUnstakeAllowed && (
          <FlashUnstake
            instantFee={instantFee}
            poolBalance={poolBalance}
            value={isFlash}
            onChange={onIsFlashChange}
          />
        )}

        <Box alignItems="center" display="flex" mt={2}>
          <Typography
            className={classes.infoLabel}
            color="textPrimary"
            variant="body2"
          >
            {t('stake.you-will-receive')}
          </Typography>

          <Box ml="auto" />

          <Typography
            className={classes.infoValue}
            color="textPrimary"
            variant="body2"
          >
            {t('unit.token-value', {
              value: totalRecieve,
              token: Token.BNB,
            })}
          </Typography>
        </Box>
      </>
    );
  };

  const renderFormApproveButtons = (amountValue: BigNumber) => (
    <ApprovalFormButtons
      allowance={isFlash ? swapPoolAllowance : allowance}
      amount={amountValue}
      approvalSettingsMode={
        isFlash ? flashApprovalSettingsMode : approvalSettingsMode
      }
      isApproveLoading={isFlash ? isSwapPoolApproveLoading : isApproveLoading}
      isStakeLoading={isFlash ? isFlashUnstakeLoading : isUnstakeLoading}
      minAmount={isFlash ? ZERO : minAmount}
      submitButtonLabel={t('unstake-dialog.btn')}
      tokenName={selectedToken}
      onApprovalSettingsFormSubmit={
        isFlash
          ? onFlashApprovalSettingsFormSubmit
          : onApprovalSettingsFormSubmit
      }
      onApproveSubmit={isFlash ? onFlashApproveSubmit : onApproveSubmit}
    />
  );

  const isDisabled =
    (isFlash ? isSwapPoolApproveLoading : isApproveLoading) ||
    (isFlash ? isFlashUnstakeLoading : isUnstakeLoading);

  return (
    <Box component="section" py={{ xs: 6, sm: 10 }}>
      <Container>
        <UnstakeDialog
          allowance={isFlash ? swapPoolAllowance : allowance}
          balance={syntTokenBalance}
          closeHref={closeHref}
          endText={isFlash ? instantUnstakeLabel : unstakeLabel}
          extraValidation={isFlash ? onFlashExtraValidation : onExtraValidation}
          isApproveLoading={
            isFlash ? isSwapPoolApproveLoading : isApproveLoading
          }
          isBalanceLoading={isFetchStatsLoading}
          isDisabled={isDisabled}
          isExternalAllowed={!isFlash}
          isLoading={isFlash ? isFlashUnstakeLoading : isUnstakeLoading}
          maxAmount={isFlash ? poolBalance : undefined}
          renderFormApproveButtons={
            isWithApprove ? renderFormApproveButtons : undefined
          }
          renderFormFooter={onRenderFormFooter}
          token={selectedToken}
          onChange={form => setAmount(form)}
          onSubmit={onSubmit}
        />
      </Container>
    </Box>
  );
};
