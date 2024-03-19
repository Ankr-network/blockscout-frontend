import { Themes } from '@ankr.com/ui';

import { getMainTheme } from 'modules/themes/mainTheme';

export const getTheme = (themes = Themes.light) => {
  return getMainTheme(themes);
};
