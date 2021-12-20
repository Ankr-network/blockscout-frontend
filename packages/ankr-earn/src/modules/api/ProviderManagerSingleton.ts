import { alpha, lighten } from '@material-ui/core';
import { mainTheme } from 'modules/themes/mainTheme';
import { ProviderManager } from 'provider';
import { ThemeColors } from 'web3modal';

const web3ModalTheme: ThemeColors = {
  background: mainTheme.palette.background.paper,
  main: mainTheme.palette.text.primary,
  secondary: alpha(mainTheme.palette.text.primary, 0.5),
  border: mainTheme.palette.background.default,
  hover: lighten(mainTheme.palette.background.default, 0.2),
};

export class ProviderManagerSingleton {
  private static instance: ProviderManager;

  public static getInstance() {
    if (ProviderManagerSingleton.instance) {
      return ProviderManagerSingleton.instance;
    }

    ProviderManagerSingleton.instance = new ProviderManager(web3ModalTheme);

    return ProviderManagerSingleton.instance;
  }
}
