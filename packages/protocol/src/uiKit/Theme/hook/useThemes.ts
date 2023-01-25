import { useSelector } from 'react-redux';
import { selectIsSwitched, selectTheme } from 'modules/layout/store/themeSlice';
import { Themes } from '@ankr.com/ui';

export const useThemes = () => {
  const themes = useSelector(selectTheme);
  const isSwitched = useSelector(selectIsSwitched);

  const isLightTheme = themes === Themes.light;

  return {
    themes,
    isLightTheme,
    isSwitched,
  };
};
