import { useMemo } from 'react';
import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ProgressBar } from 'modules/common/components/ProgressBar';
import { EChargingModel } from 'modules/billing/types';
import { CHARGING_MODEL_DEAL_DOCS_LINK } from 'modules/common/constants/const';

import { useBalanceProgressBarStyles } from './useBalanceProgressBarStyles';

interface IBalanceProgressBarProps {
  chargingModel: EChargingModel;
  progressValue?: number;
  progressLabel?: string;
  maxLabel?: string;
  isExpired?: boolean;
  onSwitchChargingModel?: () => void;
}

export const BalanceProgressBar = ({
  chargingModel,
  progressValue,
  progressLabel,
  maxLabel,
  isExpired,
  onSwitchChargingModel,
}: IBalanceProgressBarProps) => {
  const { classes } = useBalanceProgressBarStyles();

  const expiredNoticeContent = useMemo(
    () => (
      <>
        <Typography
          className={classes.expiredNotice}
          variant="body3"
          component="p"
        >
          {t(`account.charging-model.package.expired-notice`)}
        </Typography>

        <Button
          className={classes.btn}
          size="medium"
          onClick={onSwitchChargingModel}
        >
          {t(`account.charging-model.package.switch-btn`)}
        </Button>
      </>
    ),
    [classes.btn, classes.expiredNotice, onSwitchChargingModel],
  );

  const actualNoticeContent = useMemo(
    () => (
      <>
        <Typography
          className={classes.expiredNotice}
          variant="body3"
          component="p"
        >
          {t(`account.charging-model.package.package-notice`)}
        </Typography>

        <Button
          className={classes.btn}
          size="medium"
          href={CHARGING_MODEL_DEAL_DOCS_LINK} // TODO: add link
          component="a"
          target="_blank"
        >
          {t(`account.charging-model.package.learn-more`)}
        </Button>
      </>
    ),
    [classes.btn, classes.expiredNotice],
  );

  switch (chargingModel) {
    case EChargingModel.Package:
      return (
        <>
          <ProgressBar
            className={classes.progressBar}
            progress={progressValue}
            max={100}
            progressLabel={progressLabel}
            maxLabel={maxLabel}
          />
          <div className={classes.expiredNoticeWrapper}>
            {isExpired ? expiredNoticeContent : actualNoticeContent}
          </div>
        </>
      );

    case EChargingModel.Deal:
      return (
        <ProgressBar
          className={classes.progressBar}
          progress={progressValue}
          max={100}
          progressLabel={progressLabel}
          maxLabel={maxLabel}
        />
      );

    default:
    case EChargingModel.PAYG:
      return null;
  }
};
