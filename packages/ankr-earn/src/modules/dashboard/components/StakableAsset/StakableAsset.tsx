import { Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { INetwork } from 'modules/auth/components/GuardRoute/useNetworks';
import { DEFAULT_ROUNDING } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { NavLink } from 'uiKit/NavLink';
import { Spinner } from 'uiKit/Spinner';
import { useStakableAssetStyles as useStyles } from './useStakableAssetStyles';

interface IStakableAssetProps {
  icon: JSX.Element;
  balance: BigNumber;
  networks: (INetwork | undefined)[];
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
}: IStakableAssetProps) => {
  const classes = useStyles();

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
        href={isStakeLoading ? '#' : href}
        className={classes.onHoverDisplay}
        classes={{ label: classes.onHoverDisplayLabel }}
      >
        <Typography className={classes.apy}>
          {t('dashboard.stakable-asset-apy', { value: apy })}
        </Typography>

        <Typography className={classes.stake}>
          {isStakeLoading ? (
            <Spinner
              variant="circle"
              size={16}
              className={classes.loaderIcon}
            />
          ) : (
            <span className={classes.crossIcon} />
          )}

          {t('dashboard.stakable-asset-stake', { token: token })}
        </Typography>
      </NavLink>
    </Paper>
  );
};
