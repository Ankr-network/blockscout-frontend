import { t } from '@ankr.com/common';

import { WidgetTitle } from 'domains/account/screens/BillingPage/components/WidgetTitle';
import { EChargingModel, IChargingModelData } from 'modules/payments/types';
import { ChargingModelLabel } from 'domains/account/screens/BillingPage/components/ChargingModelLabel';

import { intlRoot } from '../../const';
import { useHeaderStyles } from './HeaderStyles';

export interface HeaderProps {
  className?: string;
  currentChargingModelType: EChargingModel;
  children?: React.ReactNode;
  currentChargingModel: IChargingModelData;
}

export const Header = ({
  children,
  className,
  currentChargingModel,
  currentChargingModelType,
}: HeaderProps) => {
  const { classes, cx } = useHeaderStyles();

  return (
    <div className={cx(classes.root, className)}>
      <WidgetTitle>{t(`${intlRoot}.title`)}</WidgetTitle>
      <ChargingModelLabel
        currentChargingModel={currentChargingModel}
        currentChargingModelType={currentChargingModelType}
        size="large"
      />
      {children}
    </div>
  );
};
