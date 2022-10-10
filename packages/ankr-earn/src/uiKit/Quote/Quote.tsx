import { Box, BoxProps } from '@material-ui/core';
import classNames from 'classnames';

import { useQuoteStyles } from './useQuoteStyles';

type TQuoteVariant = 'info' | 'warning' | 'error' | 'success';

interface IQuoteProps extends BoxProps {
  variant?: TQuoteVariant;
}

export const Quote = ({
  className,
  children,
  variant = 'info',
  ...restProps
}: IQuoteProps): JSX.Element => {
  const classes = useQuoteStyles();

  return (
    <Box
      className={classNames(classes.root, className, {
        [classes.info]: variant === 'info',
        [classes.warning]: variant === 'warning',
        [classes.success]: variant === 'success',
        [classes.error]: variant === 'error',
      })}
      {...restProps}
    >
      {children}
    </Box>
  );
};
