import { Typography } from '@material-ui/core';
import { Tooltip } from 'uiKit/Tooltip';
import { useStakeDescriptionValueStyles } from './useStakeDescriptionAmountStyles';

export interface IStakeDescriptionValueProps {
  children: string;
  symbol: string;
}

const ENTER_DELAY = 1_000;

export const StakeDescriptionAmount = ({
  children,
  symbol,
}: IStakeDescriptionValueProps) => {
  const classes = useStakeDescriptionValueStyles();

  return (
    <Typography classes={{ root: classes.root }} component="div" variant="h5">
      <Tooltip title={`${children} ${symbol}`} arrow enterDelay={ENTER_DELAY}>
        <div className={classes.title}>{children}</div>
      </Tooltip>
    </Typography>
  );
};
