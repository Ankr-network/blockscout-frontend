import { Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React from 'react';

import { t } from 'common';
import { AvailableWriteProviders } from 'provider';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { IETHNetwork } from 'modules/auth/eth/hooks/useETHNetworks';
import { DEFAULT_ROUNDING } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { NavLink } from 'uiKit/NavLink';
import { Spinner } from 'uiKit/Spinner';

import { useStakableAssetStyles as useStyles } from './useStakableAssetStyles';

interface IStakableAssetProps {
  icon: JSX.Element;
  balance: BigNumber;
  networks: IETHNetwork[];
  token: Token;
  href: string;
  apy: number;
  isStakeLoading?: boolean;
}

export const StakableAsset = ({
  icon,
  balance,
  networks,
  token,
  href,
  apy,
  isStakeLoading = false,
}: IStakableAssetProps): JSX.Element => {
  const classes = useStyles();
  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const onStakeClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'portfolio',
      tokenName: token,
    });
  };

  const networksDisplay =
    networks.length > 1 ? (
      <Typography className={classes.network}>
        {networks.map(
          network =>
            network?.icon &&
            React.cloneElement(network.icon, {
              className: classes.networkIcon,
            }),
        )}

        {t('dashboard.networks', { value: networks.length })}
      </Typography>
    ) : (
      <Typography className={classes.network}>
        {networks[0]?.title ?? t('dashboard.unknown-network')}
      </Typography>
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
              value: balance.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
              token,
            })}
          </Typography>

          {networksDisplay}
        </div>

        <NavLink
          className={classNames(classes.crossIcon, classes.mobileStakeLink)}
          href={href}
        />
      </div>

      <NavLink
        classes={{ label: classes.onHoverDisplayLabel }}
        className={classes.onHoverDisplay}
        href={isStakeLoading ? '#' : href}
        onClick={onStakeClick}
      >
        <Typography className={classes.apy}>
          {t('dashboard.stakable-asset-apy', { value: apy })}
        </Typography>

        <Typography className={classes.stake}>
          {isStakeLoading ? (
            <Spinner
              className={classes.loaderIcon}
              size={16}
              variant="circle"
            />
          ) : (
            <span className={classes.crossIcon} />
          )}

          {t('dashboard.stakable-asset-stake', { token })}
        </Typography>
      </NavLink>
    </Paper>
  );
};
