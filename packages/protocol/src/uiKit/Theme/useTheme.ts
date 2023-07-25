import { useMediaQuery, useTheme } from '@mui/material';

export const useIsXSDown = () => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('xs'));
};

export const useIsSMDown = () => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('sm'));
};

export const useIsMDDown = () => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('md'));
};

export const useIsLGDown = () => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('lg'));
};

export const useIsSMUp = () => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.up('sm'));
};

export const useIsMDUp = () => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.up('md'));
};

export const useIsLGUp = () => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.up('lg'));
};

export const useIsXLUp = () => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.up('xl'));
};

export const useIsXLDown = () => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('xl'));
};

export const useHasBreakdown = (breakpoint: number) => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down(breakpoint));
};
