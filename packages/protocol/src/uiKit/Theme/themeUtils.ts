import { mainTheme as baseTheme } from '@ankr.com/ui';

export const TypographyTheme =
  baseTheme.components?.MuiTypography?.styleOverrides;

export const getTypographTheme = (theme: any) => {
  const result: Record<string, string> = {};
  const keys = Object.keys(theme);

  keys.forEach(key => {
    if (!key.startsWith('@media')) {
      result[key] = theme[key];
    }
  });

  return result;
};
