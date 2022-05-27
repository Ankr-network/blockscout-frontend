import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

import { useSnackbarProviderStyles } from './useSnackbarProviderStyles';

interface ICustomizedSnackbarProviderProps {
  children: ReactNode;
}

/**
 * Should be placed inside MuiThemeProvider
 *
 * [docs](https://github.com/iamhosseindhv/notistack#how-to-use)
 */
export const CustomizedSnackbarProvider = ({
  children,
}: ICustomizedSnackbarProviderProps): JSX.Element => {
  const classes = useSnackbarProviderStyles();

  return (
    <SnackbarProvider
      children={children}
      hideIconVariant
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      classes={{
        variantError: classes.error,
        variantSuccess: classes.success,
        variantWarning: classes.warning,
        variantInfo: classes.info,
        containerAnchorOriginTopCenter: classes.containerAnchorOriginTopCenter,
      }}
      maxSnack={3}
    />
  );
};
