import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { useBlackBoxStyles } from './BlackBoxStyles';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

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
