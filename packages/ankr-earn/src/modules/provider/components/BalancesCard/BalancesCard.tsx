import { Paper, Typography } from '@material-ui/core';
import { Children, isValidElement, ReactNode } from 'react';
import { uid } from 'react-uid';

import { useBalancesCardStyles } from './useBalancesCardStyles';

interface IBalancesCardProps {
  title: string;
  children: ReactNode;
}

export const BalancesCard = ({
  title,
  children,
}: IBalancesCardProps): JSX.Element => {
  const classes = useBalancesCardStyles();

  return (
    <Paper className={classes.root} variant="outlined">
      <div className={classes.header}>
        <Typography
          className={classes.title}
          color="textSecondary"
          variant="body2"
        >
          {title}
        </Typography>
      </div>

      <div className={classes.body}>
        {Children.map(
          children,
          (child, index) =>
            isValidElement(child) && (
              <div key={uid(index)} className={classes.item}>
                {child}
              </div>
            ),
        )}
      </div>
    </Paper>
  );
};
