import { Grid, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { EEthereumNetworkId, t } from 'common';

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
  iconRootClass?: string;
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
  iconRootClass,
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
      <Grid item className={classes.iconContainer} xs="auto">
        <Icon className={classNames(classes.icon, iconRootClass)} />

        {NetworkIcon ? <NetworkIcon className={classes.networkIcon} /> : null}
      </Grid>

      <Grid item xs>
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
