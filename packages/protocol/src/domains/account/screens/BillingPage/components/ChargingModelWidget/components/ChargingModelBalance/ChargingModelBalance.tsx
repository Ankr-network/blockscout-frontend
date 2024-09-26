import { selectActiveChargingModel } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { BalanceProgressBar } from '../BalanceProgressBar';
import { renderBalance } from '../../utils/renderBalance';
import { useChargingModelBalanceStyles } from './useCharginModelBalanceStyles';

export interface IChargingModelBalanceProps {
  className: string;
}

export const ChargingModelBalance = ({
  className,
}: IChargingModelBalanceProps) => {
  const chargingModel = useAppSelector(selectActiveChargingModel);

  const { type } = chargingModel;

  const { classes } = useChargingModelBalanceStyles();

  return (
    <>
      {renderBalance({ chargingModel, className })}
      <div className={classes.progressBar}>
        <BalanceProgressBar chargingModel={type} {...chargingModel} />
      </div>
    </>
  );
};
