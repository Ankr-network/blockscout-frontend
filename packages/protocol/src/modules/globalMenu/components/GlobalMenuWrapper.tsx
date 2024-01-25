import { Themes } from '@ankr.com/ui';
import GlobalMenu, { LogoType } from '@ankr.com/global-menu';

import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { useGlobalMenuStyles } from 'modules/globalMenu/components/useGlobalMenuStyles';

export const GlobalMenuWrapper = () => {
  const { classes: globalMenuClasses } = useGlobalMenuStyles();
  const { isLightTheme } = useThemes();

  return (
    <GlobalMenu
      theme={isLightTheme ? Themes.light : Themes.dark}
      classes={{
        root: globalMenuClasses.globalMenuRoot,
        logo: globalMenuClasses.globalMenuLogo,
      }}
      logoType={LogoType.RPC}
      hasSecondaryFont
      hasCloseButtonForMobile
    />
  );
};
