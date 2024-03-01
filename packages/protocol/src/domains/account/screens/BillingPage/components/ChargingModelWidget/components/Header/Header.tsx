import { t } from '@ankr.com/common';
import { Button } from '@mui/material';
import { useMemo } from 'react';

import { WidgetTitle } from 'domains/account/screens/BillingPage/components/WidgetTitle';
import { EChargingModel } from 'modules/billing/types';
import { renderLabel } from 'domains/account/screens/BillingPage/utils/renderLabel';

import { intlRoot } from '../../const';
import { useHeaderStyles } from './HeaderStyles';

export interface HeaderProps {
  className?: string;
  onOpenBalanceDialog: () => void;
  currentChargingModelType: EChargingModel;
}

export const Header = ({
  className,
  onOpenBalanceDialog,
  currentChargingModelType,
}: HeaderProps) => {
  const { classes, cx } = useHeaderStyles();

  const label = useMemo(() => {
    return renderLabel({
      currentChargingModelType,
      isSmall: false,
    });
  }, [currentChargingModelType]);

  return (
    <div className={cx(classes.root, className)}>
      <WidgetTitle>{t(`${intlRoot}.title`)}</WidgetTitle>
      {label}
      <Button
        className={classes.assetsBtn}
        variant="outlined"
        onClick={onOpenBalanceDialog}
        disabled={currentChargingModelType === EChargingModel.Free}
      >
        {t(`${intlRoot}.assets-balance-button`)}
      </Button>
    </div>
  );
};
