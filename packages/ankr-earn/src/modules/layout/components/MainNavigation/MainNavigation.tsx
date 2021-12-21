import { Button, Popover } from '@material-ui/core';
import classNames from 'classnames';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { NavigationLink } from 'modules/common/components/NavigationLink';
import { RoutesConfig as FeaturesRoutes } from 'modules/features/Routes';
import { t } from 'modules/i18n/utils/intl';
import { useState } from 'react';
import { ReactComponent as AngleDownIconSmall } from '../../../../assets/img/angle-down-icon-small.svg';
import { Navigation } from '../../../common/components/Navigation';
import { useMainNavigationStyles as useStyles } from './useMainNavigationStyles';

export const MainNavigation = () => {
  const items = [
    {
      label: t('main-navigation.stake'),
      href: FeaturesRoutes.main.generatePath(), // TODO: add proper route
    },
    {
      label: t('main-navigation.dashboard'),
      href: '/dashboard', // TODO: add proper route
    },
    {
      label: t('main-navigation.parachain'),
      href: '/parachain', // TODO: add proper route
    },
    {
      label: t('main-navigation.boost'),
      href: BoostRoutes.tradingCockpit.generatePath(), // TODO: add proper route
    },
  ];

  const moreOptions = [
    {
      label: t('main-navigation.docs'),
      href: '/docs', // TODO: add proper route
    },
    {
      label: t('main-navigation.litepaper'),
      href: 'litepaper', // TODO: add proper route
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
