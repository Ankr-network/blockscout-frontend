import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useMemo } from 'react';

import { NavigationItem } from './BaseNavButtonTypes';
import { SoonLabel } from '../../SoonLabel';
import {
  getCommonButtonProps,
  getExternalButtonProps,
} from 'modules/layout/components/MainNavigation/utils/navigationUtils';
import { isExternalPath } from 'modules/common/utils/isExternalPath';
import { useBaseNavButtonStyles } from './useBaseNavButtonStyles';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

interface IBaseNavButtonProps {
  item: NavigationItem;
}

export const BaseNavButton = ({ item }: IBaseNavButtonProps) => {
  const { isLightTheme } = useThemes();

  const { classes, cx } = useBaseNavButtonStyles(isLightTheme);

  const { label, href, isComingSoon, StartIcon, ActiveIcon, isDisabled } = item;

  const isExternalHref = useMemo(() => href && isExternalPath(href), [href]);

  if (isExternalHref) {
    return (
      <Button
        {...getExternalButtonProps(item)}
        className={cx(
          classes.link,
          isComingSoon && classes.comingSoon,
          isDisabled && classes.disabled,
        )}
        endIcon={ActiveIcon ? <ActiveIcon /> : <StartIcon />}
        startIcon={<StartIcon />}
      >
        {label}
        {isComingSoon && <SoonLabel className={classes.soon} />}
      </Button>
    );
  }

  return (
    <Button
      {...getCommonButtonProps(item, classes.activeLink)}
      className={cx(
        classes.link,
        isComingSoon && classes.comingSoon,
        isDisabled && classes.disabled,
      )}
      component={NavLink}
      endIcon={ActiveIcon ? <ActiveIcon /> : <StartIcon />}
      startIcon={<StartIcon />}
    >
      {label}
      {isComingSoon && <SoonLabel className={classes.soon} />}
    </Button>
  );
};
