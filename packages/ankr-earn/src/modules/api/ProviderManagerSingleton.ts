import { alpha, lighten } from '@material-ui/core';
import { ThemeColors } from 'web3modal';

import { ProviderManager } from 'provider';
import { mainTheme } from 'ui';

export const web3ModalTheme: ThemeColors = {
  background: mainTheme.palette.background.paper,
  main: mainTheme.palette.text.primary,
  secondary: alpha(mainTheme.palette.text.primary, 0.5),
  border: mainTheme.palette.background.default,
  hover: lighten(mainTheme.palette.background.default, 0.2),
};

export class ProviderManagerSingleton {
  private static instance: ProviderManager;

  public static getInstance(): ProviderManager {
    if (ProviderManagerSingleton.instance) {
      return ProviderManagerSingleton.instance;
    }

    ProviderManagerSingleton.instance = new ProviderManager(web3ModalTheme);

    return ProviderManagerSingleton.instance;
  }
}
