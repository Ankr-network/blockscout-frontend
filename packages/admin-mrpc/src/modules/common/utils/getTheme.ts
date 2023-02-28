import { getMainTheme, Themes } from '@ankr.com/ui';

export const getTheme = (themes = Themes.light) => {
  return getMainTheme(themes);
};
