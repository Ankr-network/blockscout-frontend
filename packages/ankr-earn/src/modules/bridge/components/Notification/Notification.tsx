import { Box, BoxProps, Paper } from '@material-ui/core';

import { Quote } from 'uiKit/Quote';

interface INotificationProps extends Omit<BoxProps, 'component'> {}

export const Notification = ({
  children,
  ...restProps
}: INotificationProps): JSX.Element => {
  return (
    <Box component={Paper} p={2.5} {...restProps}>
      <Quote>{children}</Quote>
    </Box>
  );
};
