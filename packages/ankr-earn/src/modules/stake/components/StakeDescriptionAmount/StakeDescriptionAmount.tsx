import { Typography } from '@material-ui/core';

import { Tooltip } from 'uiKit/Tooltip';

import { useStakeDescriptionValueStyles } from './useStakeDescriptionAmountStyles';

export interface IStakeDescriptionValueProps {
  children: string;
  symbol: string;
}

const ENTER_DELAY = 1_000;

export const StakeDescriptionAmount = ({
  symbol,
  children,
}: IStakeDescriptionValueProps): JSX.Element => {
  const classes = useStakeDescriptionValueStyles();

  return (
    <Typography classes={{ root: classes.root }} component="div" variant="h5">
      <Tooltip arrow enterDelay={ENTER_DELAY} title={`${children} ${symbol}`}>
        <div className={classes.title}>{children}</div>
      </Tooltip>
    </Typography>
  );
};
