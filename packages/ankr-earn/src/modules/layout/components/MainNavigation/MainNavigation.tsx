import { Button, Popover } from '@material-ui/core';
import { ReactComponent as AngleDownIconSmall } from 'assets/img/angle-down-icon-small.svg';
import classNames from 'classnames';
import { Navigation } from 'modules/common/components/Navigation';
import { NavigationLink } from 'modules/common/components/NavigationLink';
import { t } from 'modules/i18n/utils/intl';
import { useNavigationItems } from 'modules/layout/hooks/useNavigationItems';
import { useMemo, useState } from 'react';
import { useMainNavigationStyles as useStyles } from './useMainNavigationStyles';

export const MainNavigation = () => {
  const { desktopItems, desktopMenuItems } = useNavigationItems();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopupClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

  const moreOptionsRenderedList = useMemo(
    () =>
      desktopMenuItems.map(option => (
        <NavigationLink
          key={option.label}
          href={option.href}
          label={option.label}
        />
      )),
    [desktopMenuItems],
  );

  return (
    <>
      <Navigation items={desktopItems} />

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
        {t('main-navigation.more')}
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
