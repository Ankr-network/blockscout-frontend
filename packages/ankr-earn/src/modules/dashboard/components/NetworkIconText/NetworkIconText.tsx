import { Grid, Typography } from '@material-ui/core';
import { EToken } from 'modules/dashboard/types';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { useNetworkIconTextStyles as useStyles } from './useNetworkIconTextStyles';

const iconByTokenMap = {
  [EToken.aMATICb]: AMATICBIcon,
};

interface INetworkIconTextProps {
  token: EToken;
  network: string;
}

export const NetworkIconText = ({ token, network }: INetworkIconTextProps) => {
  const classes = useStyles();
  const Icon = iconByTokenMap[token];

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Icon className={classes.icon} />
      </Grid>

      <Grid item>
        <Typography className={classes.token}>{token}</Typography>
        <Typography className={classes.network}>{network}</Typography>
      </Grid>
    </Grid>
  );
};
