import { Button, Popover } from '@material-ui/core';
import classNames from 'classnames';
import { useMemo, useState, MouseEvent as ReactMouseEvent } from 'react';

import { ReactComponent as AngleDownIconSmall } from 'assets/img/angle-down-icon-small.svg';
import { Navigation } from 'modules/common/components/Navigation';
import { NavigationLink } from 'modules/common/components/NavigationLink';
import { t } from 'modules/i18n/utils/intl';
import { useNavigationItems } from 'modules/layout/hooks/useNavigationItems';

import { useMainNavigationStyles as useStyles } from './useMainNavigationStyles';

export const MainNavigation = (): JSX.Element => {
  const { desktopItems, desktopMenuItems } = useNavigationItems();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useStyles();

  const handleMenuClick = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
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
        aria-describedby={id}
        className={classNames(
          classes.button,
          popoverOpen && classes.buttonActive,
        )}
        endIcon={<AngleDownIconSmall />}
        variant="text"
        onClick={handleMenuClick}
      >
        {t('main-navigation.more')}
      </Button>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className={classes.popover}
        id={id}
        open={popoverOpen}
        PaperProps={{
          elevation: 0,
          classes: {
            root: classes.menuPaper,
          },
        }}
        onClose={handlePopupClose}
      >
        {moreOptionsRenderedList}
      </Popover>
    </>
  );
};
