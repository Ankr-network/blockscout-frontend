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

export const commonLinear = `linear-gradient(to left, #013CD3, #6235D0, #AF34B1, #E85658, #FF7710)`;

export const premiumText = `linear-gradient(269.98deg, #2F62F1 0.02%, #8D30FF 49.89%, #FF7710 99.98%)`;
export const premiumColor = `linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)`;
export const premiumBackground = `linear-gradient(180deg, rgba(242, 245, 250, 0) 0%, #F2F5FA 100%), linear-gradient(270deg, #D0DCF9 0%, #E3DCFA 50%, #F4E7DE 100%)`;

export const enterpriseColor = `linear-gradient(269.98deg, rgb(47, 98, 241) 0.02%, rgb(141, 48, 255) 49.89%, rgb(255, 119, 16) 99.98%)`;

export const stepLineColor = `linear-gradient(270deg, #EEA941 0%, #356DF3 100%)`;
