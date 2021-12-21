import { mainTheme } from 'ui/src/modules/themes/mainTheme';
import { Themes } from 'ui/src/modules/themes/types';

export const getTheme = (type: Themes) => {
  switch (type) {
    default:
      return mainTheme;
  }
};
