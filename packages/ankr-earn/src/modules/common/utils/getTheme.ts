import { mainTheme, Themes } from 'ui';

export const getTheme = (type: Themes): typeof mainTheme => {
  switch (type) {
    default:
      return mainTheme;
  }
};
