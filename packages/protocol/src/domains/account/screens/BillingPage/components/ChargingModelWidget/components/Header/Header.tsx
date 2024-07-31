import { t } from '@ankr.com/common';

import { ChargingModelLabel } from 'domains/account/screens/BillingPage/components/ChargingModelLabel';
import { EChargingModel, IChargingModelData } from 'modules/payments/types';
import { PromoBadge } from 'modules/common/components/PromoBadge';
import { WidgetTitle } from 'domains/account/screens/BillingPage/components/WidgetTitle';
import { selectHasPromoBundle } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

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
  const hasPromoBundle = useAppSelector(selectHasPromoBundle);

  const { classes, cx } = useHeaderStyles();

  return (
    <div className={cx(classes.root, className)}>
      <WidgetTitle>{t(`${intlRoot}.title`)}</WidgetTitle>
      <div className={classes.badges}>
        {hasPromoBundle && <PromoBadge />}
        <ChargingModelLabel
          currentChargingModel={currentChargingModel}
          currentChargingModelType={currentChargingModelType}
          size="medium"
        />
      </div>
      {children}
    </div>
  );
};
