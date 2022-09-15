import { Paper, Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import portfolioStartStaking from './assets/portfolio-start-staking.png';
import { usePlaceholderStyles } from './usePlaceholderStyles';

interface IPlaceholderProps {
  btnSlot?: ReactNode;
  title: string;
  src?: string;
}

export const Placeholder = ({
  title,
  btnSlot,
  src = '',
}: IPlaceholderProps): JSX.Element => {
  const classes = usePlaceholderStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.imgArea}>
        <img
          alt={title}
          className={classes.img}
          src={src || portfolioStartStaking}
        />
      </div>

      <Typography className={classes.titleArea} variant="h3">
        {title}
      </Typography>

      {btnSlot}
    </Paper>
  );
};
