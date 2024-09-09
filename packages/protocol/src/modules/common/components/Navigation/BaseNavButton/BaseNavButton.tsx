import { Button, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { isExternalPath } from 'modules/common/utils/isExternalPath';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';

import { NavigationItem } from './types';
import { SoonLabel } from '../../SoonLabel';
import { getCommonButtonProps } from './utils/getCommonButtonProps';
import { getExternalButtonProps } from './utils/getExternalButtonProps';
import { getNotLinkButtonProps } from './utils/getNotLinkButtonProps';
import { useBaseNavButtonStyles } from './useBaseNavButtonStyles';

interface IBaseNavButtonProps {
  item: NavigationItem;
  isMobileSideBar?: boolean;
}

export const BaseNavButton = ({
  isMobileSideBar = false,
  item,
}: IBaseNavButtonProps) => {
  const { isLightTheme } = useThemes();

  const {
    StartIcon,
    blockName,
    href,
    isComingSoon,
    isDisabled,
    isNew,
    isNotLinkItem,
    label,
  } = item;

  const hasAccess = useGuardUserGroup({
    blockName,
  });

  const { classes, cx } = useBaseNavButtonStyles({
    isLightTheme,
    isMobileSideBar,
  });

  const isExternalHref = useMemo(() => href && isExternalPath(href), [href]);

  if (isExternalHref) {
    return (
      <Button
        {...getExternalButtonProps(item)}
        className={cx(
          classes.navBarLink,
          isComingSoon && classes.comingSoon,
          isDisabled && classes.disabled,
          isNew && classes.newLinkWrapper,
        )}
        startIcon={<StartIcon />}
      >
        {label}
        {isNew && (
          <Paper className={classes.newLabelWrapper}>
            <SoonLabel className={classes.soon} label={t('common.new')} />
          </Paper>
        )}
        {isComingSoon && <SoonLabel className={classes.soon} />}
      </Button>
    );
  }

  if (isNotLinkItem || !hasAccess) {
    return (
      <Button
        {...getNotLinkButtonProps(item, hasAccess)}
        className={cx(
          classes.navBarLink,
          isComingSoon && classes.comingSoon,
          isDisabled && classes.disabled,
        )}
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
        classes.navBarLink,
        isComingSoon && classes.comingSoon,
        isDisabled && classes.disabled,
        isNew && classes.newLinkWrapper,
      )}
      component={NavLink}
      startIcon={<StartIcon />}
    >
      {label}
      {isNew && (
        <Paper className={classes.newLabelWrapper}>
          <SoonLabel className={classes.soon} label={t('common.new')} />
        </Paper>
      )}
      {isComingSoon && <SoonLabel className={classes.soon} />}
    </Button>
  );
};
