import { Paper, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import PortfolioStartStaking from './assets/portfolio-start-staking.png';
import { usePlaceholderStyles } from './usePlaceholderStyles';

interface IPlaceholderProps {
  btnSlot?: ReactNode;
  title: string;
}

export const Placeholder = ({ title, btnSlot }: IPlaceholderProps) => {
  const classes = usePlaceholderStyles();

  return (
    <Paper className={classes.root}>
      <img src={PortfolioStartStaking} alt={title} />

      <Typography className={classes.title}>{title}</Typography>

      {btnSlot && <div className={classes.buttonWrap}>{btnSlot}</div>}
    </Paper>
  );
};
