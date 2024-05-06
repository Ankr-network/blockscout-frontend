import { t } from '@ankr.com/common';

import { WidgetTitle } from 'domains/account/screens/BillingPage/components/WidgetTitle';
import { EChargingModel, IChargingModelData } from 'modules/billing/types';
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
  className,
  currentChargingModelType,
  children,
  currentChargingModel,
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
