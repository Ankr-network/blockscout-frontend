import { Box, BoxProps } from '@mui/material';

import {
  OFFSET_Y_DESKTOP,
  OFFSET_Y_MOBILE,
  useSectionStyles,
} from './SectionStyles';

export interface ISectionProps extends BoxProps {
  stackUp?: boolean;
  stackDown?: boolean;
}

/**
 * You can use the same props as [Box](https://material-ui.com/components/Box/)
 */
export const Section = ({
  children,
  className,
  stackDown = false,
  stackUp = false,
  ...restProps
}: ISectionProps) => {
  const { classes, cx } = useSectionStyles();

  return (
    <Box
      className={cx(
        className,
        classes.section,
        stackUp && classes.stackUp,
        stackDown && classes.stackDown,
      )}
      py={{ xs: OFFSET_Y_MOBILE, md: OFFSET_Y_DESKTOP }}
      {...restProps}
      component="section"
    >
      {children}
    </Box>
  );
};
