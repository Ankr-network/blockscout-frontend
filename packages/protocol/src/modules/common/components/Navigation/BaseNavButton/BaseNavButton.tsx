import { Button, ButtonProps } from '@mui/material';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { useMemo } from 'react';

import { NavigationItem } from './BaseNavButtonTypes';
import { SoonLabel } from '../../SoonLabel';
import {
  getCommonButtonProps,
  getExternalButtonProps,
} from 'modules/layout/components/MainNavigation/utils/navigationUtils';
import { isExternalPath } from 'modules/common/utils/isExternalPath';
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
      {isComingSoon && <SoonLabel className={classes.soon} />}
    </Button>
  );
};
