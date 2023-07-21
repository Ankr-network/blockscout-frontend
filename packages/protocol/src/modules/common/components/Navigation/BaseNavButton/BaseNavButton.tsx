import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import {
  getCommonButtonProps,
  getExternalButtonProps,
  getNotLinkButtonProps,
} from 'modules/layout/components/MainNavigation/utils/navigationUtils';
import { isExternalPath } from 'modules/common/utils/isExternalPath';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { NavigationItem } from './BaseNavButtonTypes';
import { SoonLabel } from '../../SoonLabel';
import { useBaseNavButtonStyles } from './useBaseNavButtonStyles';

interface IBaseNavButtonProps {
  item: NavigationItem;
  isMobileSiderBar?: boolean;
}

export const BaseNavButton = ({
  item,
  isMobileSiderBar = false,
}: IBaseNavButtonProps) => {
  const { isLightTheme } = useThemes();

  const { classes, cx } = useBaseNavButtonStyles({
    isLightTheme,
    isMobileSiderBar,
  });

  const {
    label,
    href,
    isComingSoon,
    isNew,
    StartIcon,
    ActiveIcon,
    isDisabled,
    isNotLinkItem,
  } = item;

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
        {isNew && (
          <SoonLabel className={classes.soon} label={t('common.new')} />
        )}
        {isComingSoon && <SoonLabel className={classes.soon} />}
      </Button>
    );
  }

  if (isNotLinkItem) {
    return (
      <Button
        {...getNotLinkButtonProps(item)}
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
      {isNew && <SoonLabel className={classes.soon} label={t('common.new')} />}
      {isComingSoon && <SoonLabel className={classes.soon} />}
    </Button>
  );
};
