import { mainTheme } from '../../../themes/mainTheme';
import { Themes } from '../../../themes/types';

export const getTheme = (type: Themes) => {
  switch (type) {
    default:
      return mainTheme;
  }
};
