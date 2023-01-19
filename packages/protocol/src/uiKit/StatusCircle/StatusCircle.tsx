import { useStyles } from './StatusCircleStyles';

import { Box } from '@mui/material';
import { StatusCircleProps } from './StatusCircleProps';

export const StatusCircle = ({
  className,
  size = 'sm',
  status = 'info',
  color,
  ...rest
}: StatusCircleProps) => {
  const { classes, cx } = useStyles({ size, status });

  return (
    <Box
      className={cx(classes.root, className)}
      {...rest}
      style={{ ...rest.style, backgroundColor: color }}
    />
  );
};
