import { Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'common';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeMaticEthRoutes } from 'modules/stake-matic/eth/Routes';
import { RoutesConfig as StakeMaticPolygonRoutes } from 'modules/stake-matic/polygon/Routes';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { NavLink } from 'uiKit/NavLink';

import { useNetworkChooser } from './hooks/useNetworkChooser';
import { useNetworkChooserStyles } from './useNetworkChooserStyles';

const HREF_CLOSE = DashboardRoutes.dashboard.generatePath();
const HREF_MATIC_ETH = StakeMaticEthRoutes.stake.generatePath();
const HREF_MATIC_POLYGON = StakeMaticPolygonRoutes.stake.generatePath();
const ICON_SIZE = 70;

export const NetworkChooser = (): JSX.Element => {
  const classes = useNetworkChooserStyles();

  const { ethBalance, polygonBalance } = useNetworkChooser();

  return (
    <DefaultLayout verticalAlign="center">
      <div className={classes.root}>
        <Paper className={classes.bodyArea}>
          <NavLink
            className={classes.closeBtn}
            href={HREF_CLOSE}
            variant="outlined"
          >
            <CloseIcon htmlColor="inherit" size="xxs" />
          </NavLink>

          <Typography className={classes.headerArea} variant="h3">
            {t('stake-matic-common.network-chooser.title')}
          </Typography>

          <div className={classes.chooseArea}>
            <NavLink
              className={classes.chooseItemArea}
              href={HREF_MATIC_ETH}
              variant="outlined"
            >
              <EthIcon className={classes.chooseItemIcon} size={ICON_SIZE} />

              <span className={classes.chooseItemTitle}>
                {t('stake-matic-common.network-chooser.ethereum-network')}
              </span>

              <span className={classes.chooseItemBalance}>
                {t('unit.matic-value', {
                  value: ethBalance.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
                })}
              </span>
            </NavLink>

            <NavLink
              className={classNames(
                classes.chooseItemArea,
                classes.chooseItemAreaSecond,
              )}
              href={HREF_MATIC_POLYGON}
              variant="outlined"
            >
              <MaticIcon className={classes.chooseItemIcon} size={ICON_SIZE} />

              <span className={classes.chooseItemTitle}>
                {t('stake-matic-common.network-chooser.polygon-network')}
              </span>

              <span className={classes.chooseItemBalance}>
                {t('unit.matic-value', {
                  value: polygonBalance
                    .decimalPlaces(DEFAULT_ROUNDING)
                    .toFormat(),
                })}
              </span>
            </NavLink>
          </div>
        </Paper>
      </div>
    </DefaultLayout>
  );
};
