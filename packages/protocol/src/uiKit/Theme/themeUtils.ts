import { mainTheme as baseTheme, Themes } from '@ankr.com/ui';
import { Theme } from '@mui/material';

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

export const premiumText = `linear-gradient(269.98deg, #5F87F4 0.02%, #A963FF 49.89%, #FF862A 99.98%)`;
export const premiumTextStyles = {
  display: 'inline',
  width: 'fit-content',
  backgroundImage: premiumText,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export const premiumColor = `linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)`;
export const premiumDarkThemeColor = `linear-gradient(269.98deg, #5F87F4 0.02%, #A963FF 49.89%, #FF862A 99.98%)`;

export const premiumBackground = `linear-gradient(180deg, rgba(242, 245, 250, 0) 0%, #F2F5FA 100%), linear-gradient(270deg, #D0DCF9 0%, #E3DCFA 50%, #F4E7DE 100%)`;

export const enterpriseColor = `linear-gradient(269.98deg, rgb(47, 98, 241) 0.02%, rgb(141, 48, 255) 49.89%, rgb(255, 119, 16) 99.98%)`;
export const bannerGradientLight = `linear-gradient(104.36deg, #FFFFFF 0.75%, rgba(255, 255, 255, 0) 48.23%), linear-gradient(97.61deg, #F4E7DE 6.28%, #E3DCFA 55.65%, #D0DCF9 105.02%, #DBE5F9 105.02%), #D9D9D9`;
export const bannerGradientDark = `linear-gradient(97.61deg, #5A87F2 6.28%, #301E49 55.65%, #9378FF 105.02%)`;
export const enterpriseLabel =
  'radial-gradient(88.61% 82.14% at 50.00% 100.00%, rgba(242, 245, 250, 0.20) 0%, rgba(31, 34, 38, 0.20) 100%), linear-gradient(0deg, #1F2226 0%, #1F2226 100%), linear-gradient(90deg, #1F2226 0%, #6A6B6C 53.23%, #1F2226 100%)';

export const stepLineColor = `linear-gradient(270deg, #EEA941 0%, #356DF3 100%)`;

export const plansPremiumColor = `linear-gradient(269.98deg, #2F62F1 -188.21%, #8D30FF -44.43%, #FF7710 99.98%)`;

export const commonShadow =
  '0px 5px 25px rgba(31, 34, 38, 0.1), 0px 10px 50px rgba(31, 34, 38, 0.1)';

export const isLightTheme = (theme: Theme) => {
  return theme.palette.mode === Themes.light;
};

export const getPremiumColorGradientHover = (theme: Theme) => {
  return isLightTheme(theme) ? premiumDarkThemeColor : premiumColor;
};

export const getPremiumColorGradient = (theme: Theme) => {
  return isLightTheme(theme) ? premiumColor : premiumDarkThemeColor;
};
