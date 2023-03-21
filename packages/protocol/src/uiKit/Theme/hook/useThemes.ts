import { useSelector } from 'react-redux';

import {
  selectIsLightTheme,
  selectIsSwitched,
  selectTheme,
} from 'modules/layout/store/themeSlice';

export const useThemes = () => {
  const themes = useSelector(selectTheme);
  const isLightTheme = useSelector(selectIsLightTheme);
  const isSwitched = useSelector(selectIsSwitched);

  return {
    themes,
    isLightTheme,
    isSwitched,
  };
};
