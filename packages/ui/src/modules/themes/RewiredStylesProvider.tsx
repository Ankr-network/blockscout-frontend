import {
  createGenerateClassName,
  StylesProvider as StylesProviderBase,
} from '@material-ui/core';
import { StylesProviderProps } from '@material-ui/styles';

const generateClassName = createGenerateClassName({
  productionPrefix:
    typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap'
      ? 'snap'
      : 'jss',
});

export const RewiredStylesProvider = ({
  children,
  ...rest
}: StylesProviderProps) => (
  <StylesProviderBase generateClassName={generateClassName} {...rest}>
    {children}
  </StylesProviderBase>
);
