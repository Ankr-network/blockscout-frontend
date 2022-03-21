import {
  createGenerateClassName,
  jssPreset,
  StylesProvider as StylesProviderBase,
} from '@material-ui/core';
import { StylesProviderProps } from '@material-ui/styles';

// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'jss';

const generateClassName = createGenerateClassName({
  productionPrefix: navigator.userAgent === 'ReactSnap' ? 'snap' : 'jss',
});

const jss = create({ ...jssPreset() });

export const RewiredStylesProvider = ({
  children,
  ...rest
}: StylesProviderProps) => (
  <StylesProviderBase jss={jss} generateClassName={generateClassName} {...rest}>
    {children}
  </StylesProviderBase>
);
