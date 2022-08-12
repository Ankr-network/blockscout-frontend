import { Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { t } from 'common';

import { ZERO } from 'modules/common/const';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { NavLink } from 'uiKit/NavLink';

import { useNetworkChooserStyles } from './useNetworkChooserStyles';

const CLOSE_HREF = DashboardRoutes.dashboard.generatePath();
const ICON_SIZE = 70;

/**
 *  TODO It's a raw version of the component (MATIC on Polygon)
 */
export const NetworkChooser = (): JSX.Element => {
  const classes = useNetworkChooserStyles();

  const ethBalance = ZERO;
  const polygonBalance = new BigNumber(500.58);

  const isDisabledEthLink = ethBalance.isZero();
  const isDisabledPolygonLink = polygonBalance.isZero();

  return (
    <DefaultLayout verticalAlign="center">
      <div className={classes.root}>
        <Paper className={classes.bodyArea}>
          <NavLink
            className={classes.closeBtn}
            href={CLOSE_HREF}
            variant="outlined"
          >
            <CloseIcon htmlColor="inherit" size="xxs" />
          </NavLink>

          <Typography className={classes.headerArea} variant="h3">
            {t('stake-matic-common.network-chooser.title')}
          </Typography>

          <div className={classes.chooseArea}>
            <div
              className={classNames(
                classes.chooseItemArea,
                isDisabledEthLink && classes.chooseItemAreaDisabled,
              )}
            >
              <EthIcon className={classes.chooseItemIcon} size={ICON_SIZE} />

              <div className={classes.chooseItemTitle}>
                {t('stake-matic-common.network-chooser.ethereum-network')}
              </div>

              <div className={classes.chooseItemBalance}>
                {t('unit.matic-value', {
                  value: ethBalance,
                })}
              </div>
            </div>

            <div
              className={classNames(
                classes.chooseItemArea,
                classes.chooseItemAreaSecond,
                isDisabledPolygonLink && classes.chooseItemAreaDisabled,
              )}
            >
              <MaticIcon className={classes.chooseItemIcon} size={ICON_SIZE} />

              <div className={classes.chooseItemTitle}>
                {t('stake-matic-common.network-chooser.polygon-network')}
              </div>

              <div className={classes.chooseItemBalance}>
                {t('unit.matic-value', {
                  value: polygonBalance,
                })}
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </DefaultLayout>
  );
};
