import { Typography } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { Tooltip } from 'uiKit/Tooltip';

import { useStakeDescriptionValueStyles } from './useStakeDescriptionAmountStyles';

export interface IStakeDescriptionValueProps {
  value: string;
  symbol: string;
}

const ENTER_DELAY = 1_000;

export const StakeDescriptionAmount = ({
  value,
  symbol,
}: IStakeDescriptionValueProps): JSX.Element => {
  const classes = useStakeDescriptionValueStyles();

  return (
    <Tooltip
      arrow
      enterDelay={ENTER_DELAY}
      title={t('unit.token-value', {
        token: symbol,
        value,
      })}
    >
      <Typography classes={{ root: classes.root }} component="div" variant="h5">
        <span className={classes.title}>{value}</span>

        {symbol}
      </Typography>
    </Tooltip>
  );
};
