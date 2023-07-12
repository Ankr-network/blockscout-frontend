import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { useHeaderStyles } from './useHeaderStyles';
import { newProjectIntlRoot } from 'domains/projects/const';
import { Stepper } from '../Stepper';
import { NewProjectStep } from 'domains/projects/types';
import { FinalPrice } from '../FinalPrice';
import { renderAmount } from '../../utils/renderAmount';

interface HeaderProps {
  step: NewProjectStep;
  amount?: string;
}

const SHOULD_SHOW_FINAL_PRICE = false;

export const Header = ({ step, amount }: HeaderProps) => {
  const { classes } = useHeaderStyles();

  const renderedAmount = useMemo(() => renderAmount(amount), [amount]);

  return (
    <div className={classes.root}>
      <div>
        <Typography className={classes.title} variant="h5">
          {t(`${newProjectIntlRoot}.title`)}
        </Typography>
        <Stepper step={step} />
      </div>
      {SHOULD_SHOW_FINAL_PRICE && <FinalPrice amount={renderedAmount} />}
    </div>
  );
};
