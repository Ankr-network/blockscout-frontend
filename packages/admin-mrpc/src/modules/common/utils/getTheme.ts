import { mainTheme } from '@ankr.com/ui';
import { configureTheme } from './configureTheme';

export const getTheme = () => {
  return configureTheme(mainTheme);
};
