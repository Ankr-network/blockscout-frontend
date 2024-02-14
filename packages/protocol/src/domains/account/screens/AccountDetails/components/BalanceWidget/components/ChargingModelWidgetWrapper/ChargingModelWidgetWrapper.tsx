import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useCallback, useMemo } from 'react';

import { EChargingModel } from 'modules/billing/types';
import { ProgressBar } from 'modules/common/components/ProgressBar';
import { CHARGING_MODEL_DEAL_DOCS_LINK } from 'modules/common/constants/const';

import { ChargingModelWidget } from '../ChargingModelWidget';
import { useChargingModelWidgetWrapperStyles } from './useChargingModelWidgetWrapperStyles';

interface IChargingModelWidgetWrapperProps {
  isCurrentModel?: boolean;
  balance: React.ReactNode;
  chargingModel: EChargingModel;
  isExpired?: boolean;
  progressValue?: number;
  progressLabel?: string;
  maxLabel?: string;
  onSwitchChargingModel?: () => void;
}

export const ChargingModelWidgetWrapper = ({
  isCurrentModel = false,
  balance,
  chargingModel,
  isExpired,
  progressValue,
  progressLabel,
  maxLabel,
  onSwitchChargingModel,
}: IChargingModelWidgetWrapperProps) => {
  const { classes } = useChargingModelWidgetWrapperStyles();

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

  const renderContent = useCallback(
    (model: EChargingModel) => {
      switch (model) {
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
    },
    [
      actualNoticeContent,
      classes.expiredNoticeWrapper,
      classes.progressBar,
      expiredNoticeContent,
      isExpired,
      maxLabel,
      progressLabel,
      progressValue,
    ],
  );

  return (
    <ChargingModelWidget
      isCurrentModel={isCurrentModel}
      chargingModel={chargingModel}
    >
      <>
        {balance}
        {renderContent(chargingModel)}
      </>
    </ChargingModelWidget>
  );
};
