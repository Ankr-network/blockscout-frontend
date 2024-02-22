import { Themes } from '@ankr.com/ui';
import { useCallback } from 'react';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useThemeSwitcher } from 'modules/layout/hooks/useThemeSwitcher';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useThemeBlockStyles } from './useThemeBlockStyles';
import { BaseSettingsBlock } from '../BaseSettingsBlock';

export const ThemeBlock = () => {
  const { classes } = useThemeBlockStyles();

  const { isLightTheme } = useThemes();

  const { handleThemeSwitcher } = useThemeSwitcher();

  const onThemeModeChange = useCallback(() => {
    handleThemeSwitcher(isLightTheme ? Themes.dark : Themes.light);
  }, [isLightTheme, handleThemeSwitcher]);

  return (
    <BaseSettingsBlock title={t('user-settings.theme-switcher.title')}>
      <div className={classes.bottom}>
        <FormControlLabel
          classes={{
            root: classes.switchRoot,
            label: classes.label,
          }}
          control={
            <Switch
              checked={!isLightTheme}
              classes={{
                checked: classes.switchChecked,
                track: classes.switchTrack,
              }}
              onChange={onThemeModeChange}
            />
          }
          label={t('user-settings.theme-switcher.label')}
          labelPlacement="start"
        />
      </div>
      <Typography variant="body3" color="textSecondary">
        {t('user-settings.theme-switcher.description')}
      </Typography>
    </BaseSettingsBlock>
  );
};
