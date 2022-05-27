import { Box, BoxProps } from '@material-ui/core';
import classNames from 'classnames';

import { useQuoteStyles } from './useQuoteStyles';

interface IQuoteProps extends BoxProps {}

export const Quote = ({
  className,
  children,
  ...restProps
}: IQuoteProps): JSX.Element => {
  const classes = useQuoteStyles();

  return (
    <Box className={classNames(classes.root, className)} {...restProps}>
      {children}
    </Box>
  );
};
