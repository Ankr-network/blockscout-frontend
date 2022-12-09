import { t } from '@ankr.com/common';
import { Grid, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { iconByTokenMap, TIconMap } from 'modules/common/icons';
import { Token } from 'modules/common/types/token';
import { getTokenName } from 'modules/common/utils/getTokenName';

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
  token: Token;
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
  const tokenName = getTokenName(token);

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item className={classes.iconContainer} xs="auto">
        <Icon className={classNames(classes.icon, iconRootClass)} />
      </Grid>

      <Grid item xs>
        <Typography className={classes.token}>{tokenName}</Typography>

        {(network || chainId) && (
          <Typography className={classes.network}>
            {network ?? t(`chain.${chainId}`)}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
