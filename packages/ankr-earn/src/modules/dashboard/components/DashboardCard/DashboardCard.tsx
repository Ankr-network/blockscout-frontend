import { Box, Paper } from '@material-ui/core';
import { ReactNode } from 'react';

import { useIsLGUp } from 'ui';

import { useDashboardCardStyles } from './useDashboardCardStyles';

interface IDashboardCardProps {
  amountSlot?: ReactNode;
  badgeSlot?: ReactNode;
  buttonsSlot?: ReactNode;
  networkAndIconSlot?: ReactNode;
  menuSlot?: ReactNode;
}

export const DashboardCard = ({
  amountSlot,
  badgeSlot,
  buttonsSlot,
  networkAndIconSlot,
  menuSlot,
}: IDashboardCardProps): JSX.Element => {
  const classes = useDashboardCardStyles();
  const isLgUp = useIsLGUp();

  return (
    <Paper className={classes.root}>
      <div className={classes.tokenInfoSlot}>{networkAndIconSlot}</div>

      {!isLgUp && <div className={classes.menuSlot}>{menuSlot}</div>}

      <div className={classes.amountSlot}>
        {amountSlot}

        {badgeSlot && <Box mt={{ xs: 2, lg: 1 }}>{badgeSlot}</Box>}
      </div>

      <div className={classes.buttonsSlot}>
        {buttonsSlot}

        {isLgUp && menuSlot}
      </div>
    </Paper>
  );
};
