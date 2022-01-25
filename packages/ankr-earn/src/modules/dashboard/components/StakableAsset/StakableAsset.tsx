import { Paper, Typography } from '@material-ui/core';
import { useStakableAssetStyles as useStyles } from './useStakableAssetStyles';
import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'uiKit/NavLink';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { Token } from 'modules/common/types/token';
import { EToken } from 'modules/dashboard/types';
import React from 'react';
import { INetwork } from 'modules/auth/components/GuardRoute/useNetworks';

interface IStakableAssetProps {
  icon: JSX.Element;
  balance: BigNumber;
  networks: Array<INetwork>;
  token: Token | EToken;
  href: string;
  apy: number;
}

export const StakableAsset = ({
  icon,
  balance,
  networks,
  token,
  href,
  apy,
}: IStakableAssetProps) => {
  const classes = useStyles();

  const networksDisplay =
    networks.length > 1 ? (
      <Typography className={classes.network}>
        {networks.map(
          network =>
            network.icon &&
            React.cloneElement(network.icon, {
              className: classes.networkIcon,
            }),
        )}
        {t('dashboard.networks', { value: networks.length })}
      </Typography>
    ) : (
      <Typography className={classes.network}>{networks[0].title}</Typography>
    );

  return (
    <Paper className={classes.root}>
      <div className={classes.defaultDisplay}>
        {React.cloneElement(icon, {
          className: classes.icon,
        })}
        <div className={classes.balanceNetworkWrapper}>
          <Typography className={classes.balance}>
            {t('dashboard.wallet-balance', {
              value: balance.toFormat(),
              token: token,
            })}
          </Typography>
          {networksDisplay}
        </div>
        <NavLink
          href={href}
          className={classNames(classes.crossIcon, classes.mobileStakeLink)}
        />
      </div>
      <NavLink
        href={href}
        className={classes.onHoverDisplay}
        classes={{ label: classes.onHoverDisplayLabel }}
      >
        <Typography className={classes.apy}>
          {t('dashboard.stakable-asset-apy', { value: apy })}
        </Typography>
        <Typography className={classes.stake}>
          <span className={classes.crossIcon} />
          {t('dashboard.stakable-asset-stake', { token: token })}
        </Typography>
      </NavLink>
    </Paper>
  );
};
