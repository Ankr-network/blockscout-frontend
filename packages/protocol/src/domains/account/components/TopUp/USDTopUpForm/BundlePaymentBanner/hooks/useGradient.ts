import { useTheme } from '@mui/material';

import { enterpriseColor, isLightTheme } from 'uiKit/Theme/themeUtils';

export const useGradient = () => {
  const theme = useTheme();
  const isLightMode = isLightTheme(theme);

  return isLightMode ? enterpriseColor : theme.palette.common.white;
};
