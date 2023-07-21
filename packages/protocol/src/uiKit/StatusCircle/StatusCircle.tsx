import { Box } from '@mui/material';

import { StatusCircleProps } from './StatusCircleProps';
import { useStyles } from './StatusCircleStyles';

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
