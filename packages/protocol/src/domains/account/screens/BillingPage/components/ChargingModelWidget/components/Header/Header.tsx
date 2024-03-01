import { t } from '@ankr.com/common';
import { Button } from '@mui/material';
import { useCallback } from 'react';

import { WidgetTitle } from 'domains/account/screens/BillingPage/components/WidgetTitle';
import { UserLabel } from 'uiKit/UserLabel';
import { EChargingModel } from 'modules/billing/types';

import { PAYGLabel } from '../PAYGLabel';
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

  const renderLabel = useCallback(() => {
    switch (currentChargingModelType) {
      case EChargingModel.PAYG:
        return <PAYGLabel />;
      case EChargingModel.Free:
        return (
          <UserLabel
            hasPremium={false}
            hasEnterpriseStatus={false}
            hasStatusTransition={false}
            isLoading={false}
          />
        );
      default:
        return (
          <UserLabel
            hasPremium={false}
            chargingModel={currentChargingModelType}
            hasEnterpriseStatus={false}
            hasStatusTransition={false}
            isLoading={false}
          />
        );
    }
  }, [currentChargingModelType]);

  return (
    <div className={cx(classes.root, className)}>
      <WidgetTitle>{t(`${intlRoot}.title`)}</WidgetTitle>
      {renderLabel()}
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
