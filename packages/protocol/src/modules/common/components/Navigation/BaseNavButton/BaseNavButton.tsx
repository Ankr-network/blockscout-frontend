import { t } from '@ankr.com/common';
import { Button, ButtonProps } from '@mui/material';
import { isExternalPath } from 'modules/common/utils/isExternalPath';
import {
  getCommonButtonProps,
  getExternalButtonProps,
} from 'modules/layout/components/MainNavigation/utils/navigationUtils';
import { useMemo } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { NavigationItem } from './BaseNavButtonTypes';
import { useBaseNavButtonStyles } from './useBaseNavButtonStyles';

interface IBaseNavButtonProps {
  item: NavigationItem;
}

export const BaseNavButton = ({ item }: IBaseNavButtonProps) => {
  const { classes, cx } = useBaseNavButtonStyles();

  const { label, href, isComingSoon, StartIcon, ActiveIcon } = item;

  const isExternalHref = useMemo(() => href && isExternalPath(href), [href]);

  const props: ButtonProps | NavLinkProps | any = useMemo(
    () =>
      isExternalHref
        ? getExternalButtonProps(item)
        : getCommonButtonProps(item),
    [item, isExternalHref],
  );

  return (
    <Button
      {...props}
      className={cx(classes.link, isComingSoon && classes.comingSoon)}
      startIcon={<StartIcon />}
      endIcon={ActiveIcon && <ActiveIcon className={classes.activeLink} />}
      LinkComponent={isExternalHref ? 'a' : NavLink}
      activeClassName={classes.activeLink}
    >
      {label}
      {isComingSoon && (
        <b className={classes.soon}>{t('main-navigation.soon')}</b>
      )}
    </Button>
  );
};
