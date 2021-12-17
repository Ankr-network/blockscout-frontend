import { Button, Popover } from '@material-ui/core';
import classNames from 'classnames';
import { NavigationLink } from 'modules/common/components/NavigationLink';
import { EParachainPolkadotNetwork } from 'modules/common/types';
import { t } from 'modules/i18n/utils/intl';
import { RoutesConfig as TradingCockpitRoutes } from 'modules/trading-cockpit/Routes';
import { RoutesConfig as PolkadotSlotAuctionRoutes } from 'modules/polkadot-slot-auction/Routes';
import { useState } from 'react';
import { ReactComponent as AngleDownIconSmall } from '../../../../assets/img/angle-down-icon-small.svg';
import { Navigation } from '../../../common/components/Navigation';
import { isMainnet } from '../../../common/const';
import { useMainNavigationStyles as useStyles } from './useMainNavigationStyles';

export const MainNavigation = () => {
  const items = [
    {
      label: t('main-navigation.stake'),
      href: '1', // TODO: add proper route
    },
    {
      label: t('main-navigation.dashboard'),
      href: '2', // TODO: add proper route
    },
    {
      label: t('main-navigation.parachain'),
      href: PolkadotSlotAuctionRoutes.crowdloans.generatePath(
        isMainnet
          ? EParachainPolkadotNetwork.DOT.toLowerCase()
          : EParachainPolkadotNetwork.WND.toLowerCase(),
      ),
    },
    {
      label: t('main-navigation.boost'),
      href: TradingCockpitRoutes.dashboard.generatePath(), // TODO: add proper route
    },
  ];

  const moreOptions = [
    {
      label: t('main-navigation.docs'),
      href: '6', // TODO: add proper route
    },
    {
      label: t('main-navigation.litepaper'),
      href: '7', // TODO: add proper route
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const moreOptionsRenderedList = moreOptions.map(option => (
    <NavigationLink
      key={option.label}
      href={option.href}
      label={option.label}
    />
  ));

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopupClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

  return (
    <>
      <Navigation items={items} />
      <Button
        className={classNames(
          classes.button,
          popoverOpen && classes.buttonActive,
        )}
        aria-describedby={id}
        variant="text"
        onClick={handleMenuClick}
        endIcon={<AngleDownIconSmall />}
      >
        {t('main-navigation.menu')}
      </Button>
      <Popover
        id={id}
        open={popoverOpen}
        anchorEl={anchorEl}
        className={classes.popover}
        onClose={handlePopupClose}
        PaperProps={{
          elevation: 0,
          classes: {
            root: classes.menuPaper,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {moreOptionsRenderedList}
      </Popover>
    </>
  );
};
