import { Themes } from '@ankr.com/ui';
import { useCallback } from 'react';
import { FormControlLabel, Paper, Switch, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useThemeSwitcher } from 'modules/layout/hooks/useThemeSwitcher';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useThemeBlockStyles } from './useThemeBlockStyles';

export const ThemeBlock = () => {
  const { classes } = useThemeBlockStyles();

  const { isLightTheme } = useThemes();

  const { handleThemeSwitcher } = useThemeSwitcher();

  const onThemeModeChange = useCallback(() => {
    handleThemeSwitcher(isLightTheme ? Themes.dark : Themes.light);
  }, [isLightTheme, handleThemeSwitcher]);

  return (
    <Paper className={classes.root}>
      <div className={classes.top}>
        <Typography className={classes.title}>
          {t('user-settings.theme-switcher.title')}
        </Typography>
      </div>

      <div className={classes.info}>
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
          />
        </div>
        <div className={classes.description}>
          <Typography variant="body3" color="textSecondary">
            {t('user-settings.theme-switcher.description')}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};
