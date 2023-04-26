import { RadioGroup, RadioGroupProps } from '@ankr.com/ui';
import { Skeleton } from '@mui/material';

import { useUSDPriceSelectorStyles } from './USDPriceSelectorStyles';

export interface USDPriceSelectorProps extends RadioGroupProps {
  loading?: boolean;
}

export const USDPriceSelector = ({
  loading,
  ...props
}: USDPriceSelectorProps) => {
  const { classes } = useUSDPriceSelectorStyles();

  if (loading) {
    return <Skeleton className={classes.skeleton} />;
  }

  return <RadioGroup {...props} />;
};
