import { Typography } from '@mui/material';

import { renderChargingModelTitle } from 'modules/payments/utils/renderChargingModelTitle';
import { EChargingModel } from 'modules/payments/types';

import { useChargingModelWidgetStyles } from './useChargingModelWidgetStyles';

interface IChargingModelWidgetProps {
  isCurrentModel: boolean;
  className?: string;
  chargingModel: EChargingModel;
  children: React.ReactNode;
}

export const ChargingModelWidget = ({
  chargingModel,
  children,
  className,
  isCurrentModel,
}: IChargingModelWidgetProps) => {
  const { classes, cx } = useChargingModelWidgetStyles();

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
      <Typography
        component="p"
        variant="subtitle1"
        color="primary"
        className={classes.title}
      >
        {renderChargingModelTitle(chargingModel)}
      </Typography>
      {children}
    </div>
  );
};
