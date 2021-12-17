import {
  Typography,
  TypographyProps as MUITypographyProps,
} from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import * as React from 'react';

type TypographyProps = MUITypographyProps & {
  component?: string | React.ComponentType;
};

const elementFactory = (element: Variant) =>
  React.forwardRef<HTMLElement, TypographyProps>((props, ref) => (
    <Typography ref={ref} variant={element} {...props} />
  ));

export const Headline1 = elementFactory('h1');

export const Headline2 = elementFactory('h2');

export const Headline3 = elementFactory('h3');

export const Headline4 = elementFactory('h4');

export const Headline5 = elementFactory('h5');

export const SubTitle = elementFactory('subtitle1');

export const SmallTitle = elementFactory('subtitle2');

export const Body1 = elementFactory('body1');

export const Body2 = elementFactory('body2');
