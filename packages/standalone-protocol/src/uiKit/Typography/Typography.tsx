import React from 'react';
import {
  Typography as TypographyBase,
  TypographyProps,
} from '@material-ui/core';

export const Typography = ({ className, ...rest }: TypographyProps) => {
  return <TypographyBase {...rest} />;
};
