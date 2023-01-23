import { Themes } from '@ankr.com/ui';
import { mainTheme } from 'uiKit/Theme/mainTheme';

export const getTheme = (type: Themes) => {
  switch (type) {
    default:
      return mainTheme;
  }
};
