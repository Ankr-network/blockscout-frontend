import { t } from '@ankr.com/common';

import { WidgetTitle } from 'domains/account/screens/BillingPage/components/WidgetTitle';
import { EChargingModel } from 'modules/billing/types';
import { ChargingModelLabel } from 'domains/account/screens/BillingPage/components/ChargingModelLabel/ChargingModelLabel';

import { intlRoot } from '../../const';
import { useHeaderStyles } from './HeaderStyles';

export interface HeaderProps {
  className?: string;
  currentChargingModelType: EChargingModel;
  children?: React.ReactNode;
}

export const Header = ({
  className,
  currentChargingModelType,
  children,
}: HeaderProps) => {
  const { classes, cx } = useHeaderStyles();

  return (
    <div className={cx(classes.root, className)}>
      <WidgetTitle>{t(`${intlRoot}.title`)}</WidgetTitle>
      <ChargingModelLabel
        currentChargingModelType={currentChargingModelType}
        size="large"
      />
      {children}
    </div>
  );
};
