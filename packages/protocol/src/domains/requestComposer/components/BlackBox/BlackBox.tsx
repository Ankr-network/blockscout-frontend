import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useBlackBoxStyles } from './BlackBoxStyles';

export interface BlackBoxProps {
  children: ReactNode;
  className?: string;
  header: ReactNode;
}

export const BlackBox = ({ children, className, header }: BlackBoxProps) => {
  const { isLightTheme } = useThemes();

  const { classes, cx } = useBlackBoxStyles(isLightTheme);

  return (
    <Box className={cx(className, classes.root)}>
      {header}
      {children}
    </Box>
  );
};
