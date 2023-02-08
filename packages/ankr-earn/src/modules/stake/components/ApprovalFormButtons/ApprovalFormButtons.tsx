import { t } from '@ankr.com/common';
import { ButtonBase, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { ZERO } from 'modules/common/const';
import { Button } from 'uiKit/Button';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { ApprovalSettingsDialog } from '../ApprovalSettingsDialog/ApprovalSettingsDialog';
import {
  ApprovalOption,
  IApprovalSettingsFormValues,
} from '../ApprovalSettingsDialog/types';
import { useApprovalForm } from '../ApprovalSettingsDialog/useApprovalForm';

import { useApprovalFormButtonsStyles } from './useApprovalFormButtonsStyles';

interface IApprovalFormButtonsProps {
  isApproveLoading: boolean;
  isStakeLoading: boolean;
  tokenName: string;
  amount: BigNumber;
  allowance: BigNumber;
  minAmount?: BigNumber;
  approvalSettingsMode: ApprovalOption;
  onApproveSubmit(amount: BigNumber): void;
  onApprovalSettingsFormSubmit(values: IApprovalSettingsFormValues): void;
}

export const ApprovalFormButtons = ({
  allowance,
  isApproveLoading,
  isStakeLoading,
  tokenName,
  amount,
  approvalSettingsMode,
  onApproveSubmit,
  onApprovalSettingsFormSubmit,
  minAmount = ZERO,
}: IApprovalFormButtonsProps): JSX.Element => {
  const classes = useApprovalFormButtonsStyles();

  const {
    isApproved,
    notZero,
    isOpened,
    onClose,
    onOpen,
    onApproveClick,
    onApprovalSettingsSubmit,
  } = useApprovalForm({
    allowance,
    amount,
    onApproveSubmit,
    onApprovalSettingsFormSubmit,
  });

  const isBelowMinAmount = amount.isLessThan(minAmount);
  const isApproveDisabled = isApproved || isApproveLoading || isBelowMinAmount;
  const isSubmitDisabled =
    isStakeLoading ||
    !isApproved ||
    isApproveLoading ||
    !notZero ||
    isBelowMinAmount;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Button
            fullWidth
            color="primary"
            disabled={isApproveDisabled}
            endIcon={
              <QuestionWithTooltip
                className={classNames(
                  isApproveDisabled
                    ? classes.questionBtnDisabled
                    : classes.questionBtnActive,
                )}
              >
                {t('common.tooltips.allowance')}
              </QuestionWithTooltip>
            }
            isLoading={isApproveLoading}
            size="large"
            onClick={onApproveClick}
          >
            <span
              className={classNames(classes.stepperLabel, {
                [classes.stepperLabelDisabled]: isApproveDisabled,
              })}
            >
              {t('approval.steps.1')}
            </span>

            {t('stake-matic-eth.btn.approve')}
          </Button>

          <ButtonBase className={classes.approvalSettings} onClick={onOpen}>
            {t('unstake-dialog.approval-settings', { token: tokenName })}
          </ButtonBase>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Button
            fullWidth
            color="primary"
            disabled={isSubmitDisabled}
            isLoading={isStakeLoading}
            size="large"
            type="submit"
          >
            <span
              className={classNames(classes.stepperLabel, {
                [classes.stepperLabelDisabled]: isSubmitDisabled,
              })}
            >
              {t('approval.steps.2')}
            </span>

            {t('stake-matic-eth.btn.submit', {
              token: tokenName,
            })}
          </Button>
        </Grid>
      </Grid>

      {!!onApprovalSettingsSubmit && (
        <ApprovalSettingsDialog
          amount={amount.toString()}
          approvalSettingsMode={approvalSettingsMode}
          isLoading={isApproveLoading}
          isOpen={isOpened}
          minAmount={minAmount}
          token={tokenName}
          onClose={onClose}
          onSubmit={onApprovalSettingsSubmit}
        />
      )}
    </>
  );
};
