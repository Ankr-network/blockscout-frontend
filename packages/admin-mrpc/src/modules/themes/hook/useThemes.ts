import { useSelector } from 'react-redux';

import {
  selectIsLightTheme,
  selectTheme,
} from 'modules/layout/store/themeSlice';

export const useThemes = () => {
  const themes = useSelector(selectTheme);
  const isLightTheme = useSelector(selectIsLightTheme);

  return {
    themes,
    isLightTheme,
  };
};
