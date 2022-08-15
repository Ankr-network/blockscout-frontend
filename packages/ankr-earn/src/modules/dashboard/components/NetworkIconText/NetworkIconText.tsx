import { Grid, Typography } from '@material-ui/core';

import { EEthereumNetworkId } from '@ankr.com/provider';
import { t } from 'common';

import {
  iconByNetworkMap,
  iconByTokenMap,
  TIconMap,
} from 'modules/common/icons';
import { Token } from 'modules/common/types/token';

import { NetworkIconTextSkeleton } from './NetworkIconTextSkeleton';
import { useNetworkIconTextStyles } from './useNetworkIconTextStyles';

interface INetworkIconTextProps {
  chainId?: EEthereumNetworkId;
  isLoading?: boolean;
  /**
   * Please use chainId prop.
   * @deprecated
   */
  network?: string;
  token?: Token;
}

export const NetworkIconText = ({
  chainId,
  isLoading,
  network,
  token,
}: INetworkIconTextProps): JSX.Element => {
  const classes = useNetworkIconTextStyles();

  if (isLoading) {
    return <NetworkIconTextSkeleton />;
  }

  const Icon = iconByTokenMap[token as keyof TIconMap] ?? 'span';
  const NetworkIcon = chainId && iconByNetworkMap[chainId];

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item className={classes.iconContainer}>
        <Icon className={classes.icon} />

        {NetworkIcon ? <NetworkIcon className={classes.networkIcon} /> : null}
      </Grid>

      <Grid item>
        <Typography className={classes.token}>{token}</Typography>

        {(network || chainId) && (
          <Typography className={classes.network}>
            {network ?? t(`chain.${chainId}`)}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
