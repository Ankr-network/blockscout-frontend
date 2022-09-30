import { mainTheme, Themes } from 'ui';

export const getTheme = (type: Themes) => {
  switch (type) {
    default:
      return mainTheme;
  }
};
