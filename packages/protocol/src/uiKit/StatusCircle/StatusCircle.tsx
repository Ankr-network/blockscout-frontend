import { useStyles } from './StatusCircleStyles';
import classNames from 'classnames';
import { Box } from '@material-ui/core';
import { StatusCircleProps } from './StatusCircleProps';

export const StatusCircle = ({
  className,
  size = 'sm',
  status = 'info',
  color,
  ...rest
}: StatusCircleProps) => {
  const classes = useStyles({ size, status });

  return (
    <Box
      className={classNames(classes.root, className)}
      {...rest}
      style={{ ...rest.style, backgroundColor: color }}
    />
  );
};
