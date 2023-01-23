import React from 'react';
import { Typography as TypographyBase, TypographyProps } from '@mui/material';

export const Typography = ({ className, ...rest }: TypographyProps) => {
  return <TypographyBase {...rest} />;
};
