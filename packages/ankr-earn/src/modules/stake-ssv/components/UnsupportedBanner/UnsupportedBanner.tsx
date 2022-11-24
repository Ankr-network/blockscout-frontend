import { t, tHTML } from '@ankr.com/common';
import { Paper, Typography } from '@material-ui/core';

import { Button } from 'uiKit/Button';
import { SSVStakingIcon } from 'uiKit/Icons/SSVStakingIcon';

import { useUnsupportedBannerStyles } from './useUnsupportedBannerStyles';

interface IUnsupportedBannerProps {
  currentWallet: string;
  onClick: () => void;
}

export const UnsupportedBanner = ({
  currentWallet,
  onClick,
}: IUnsupportedBannerProps): JSX.Element => {
  const classes = useUnsupportedBannerStyles();

  return (
    <Paper className={classes.paper}>
      <SSVStakingIcon className={classes.icon} />

      <Typography className={classes.title} variant="h3">
        {t('stake-ssv.unsupported.title')}
      </Typography>

      <Typography className={classes.desc}>
        {tHTML('stake-ssv.unsupported.description', {
          currentWallet,
        })}
      </Typography>

      <Button className={classes.button} variant="contained" onClick={onClick}>
        {t('connect.connect')}
      </Button>
    </Paper>
  );
};
