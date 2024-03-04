import { ECryptoDepositStepStatus } from 'modules/billing/types';

import { useLabelStyles } from './useLabelStyles';
import { renderLabelIcon } from './utils/renderLabelIcon';

export interface ILabelProps {
  status?: ECryptoDepositStepStatus;
  text: string;
}

export const Label = ({ status, text }: ILabelProps) => {
  const { classes } = useLabelStyles();

  return (
    <div className={classes.root}>
      {renderLabelIcon(status)}
      {text}
    </div>
  );
};
