import { Themes } from '@ankr.com/ui';
import { CrossNavigation, LogoType } from '@ankr.com/cross-navigation';

import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { useGlobalMenuStyles } from 'modules/globalMenu/components/useGlobalMenuStyles';

export const GlobalMenuWrapper = () => {
  const { classes: globalMenuClasses } = useGlobalMenuStyles();
  const { isLightTheme } = useThemes();

  return (
    <CrossNavigation
      theme={isLightTheme ? Themes.light : Themes.dark}
      classes={{
        root: globalMenuClasses.globalMenuRoot,
        logo: globalMenuClasses.globalMenuLogo,
      }}
      logoType={LogoType.Web3API}
      isNavMenuHidden
    />
  );
};
