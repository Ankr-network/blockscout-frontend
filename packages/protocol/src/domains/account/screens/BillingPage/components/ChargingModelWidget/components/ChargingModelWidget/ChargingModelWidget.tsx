import { Typography } from '@mui/material';

import { renderChargingModelTitle } from 'modules/payments/utils/renderChargingModelTitle';
import { EChargingModel } from 'modules/payments/types';

import { useChargingModelWidgetStyles } from './useChargingModelWidgetStyles';

interface IChargingModelWidgetProps {
  chargingModel: EChargingModel;
  children: React.ReactNode;
  className?: string;
  isCurrentModel: boolean;
  isPromo?: boolean;
}

export const ChargingModelWidget = ({
  chargingModel,
  children,
  className,
  isCurrentModel,
  isPromo,
}: IChargingModelWidgetProps) => {
  const { classes, cx } = useChargingModelWidgetStyles({ isPromo });

  return (
    <div
      className={cx(
        classes.chargingModelWidgetRoot,
        {
          [classes.currentModel]: isCurrentModel,
        },
        className,
      )}
    >
      <Typography className={classes.title} component="p" variant="subtitle1">
        {renderChargingModelTitle(chargingModel)}
      </Typography>
      {children}
    </div>
  );
};
