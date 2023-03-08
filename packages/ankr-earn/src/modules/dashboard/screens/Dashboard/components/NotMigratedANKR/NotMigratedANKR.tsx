import { t } from '@ankr.com/common';
import { Box, Typography } from '@material-ui/core';

import { ETH_NETWORK_BY_ENV } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { DashboardCard } from 'modules/dashboard/components/DashboardCard';
import { NetworkIconText } from 'modules/dashboard/components/NetworkIconText';
import { RoutesConfig } from 'modules/stake-ankr/RoutesConfig';
import { InfoIcon } from 'uiKit/Icons/InfoIcon';
import { Menu } from 'uiKit/Menu';
import { NavLink } from 'uiKit/NavLink';

import { AnkrInfoDialog } from '../AnkrInfoDialog';

import { useNotMigratedANKRStyles } from './useNotMigratedANKRStyles';

export const NotMigratedANKR = (): JSX.Element => {
  const classes = useNotMigratedANKRStyles();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const renderedAmountSlot = (
    <Box alignItems="center" display="flex">
      <InfoIcon className={classes.infoIcon} />

      <div>
        <Typography className={classes.infoTitle} variant="body2">
          {t('dashboard.card.ankr-migration-title')}
        </Typography>

        <Typography
          className={classes.infoDescription}
          color="textSecondary"
          variant="body2"
        >
          {t('dashboard.card.ankr-migration-text')}
        </Typography>
      </div>
    </Box>
  );

  const renderedMenuSlot = (
    <Box component="span" display="flex">
      <Menu>
        <Menu.Item disabled={!onOpenInfo} onClick={onOpenInfo}>
          {t('dashboard.card.tokenInfo')}
        </Menu.Item>
      </Menu>
    </Box>
  );

  const renderedButtonsSlot = (
    <NavLink
      fullWidth
      className={classes.migrateButton}
      href={RoutesConfig.main.generatePath()}
      variant="outlined"
    >
      {t('dashboard.card.migrate')}
    </NavLink>
  );

  return (
    <>
      <DashboardCard
        amountSlot={renderedAmountSlot}
        buttonsSlot={renderedButtonsSlot}
        menuSlot={renderedMenuSlot}
        networkAndIconSlot={
          <NetworkIconText chainId={ETH_NETWORK_BY_ENV} token={Token.ANKR} />
        }
      />

      <AnkrInfoDialog isOpened={isOpenedInfo} onClose={onCloseInfo} />
    </>
  );
};
