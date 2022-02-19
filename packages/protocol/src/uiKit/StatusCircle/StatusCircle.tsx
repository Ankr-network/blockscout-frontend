import { useStyles } from './StatusCircleStyles';
import classNames from 'classnames';
import { Box } from '@material-ui/core';
import { StatusCircleProps } from './StatusCircleProps';
import { BaseStatus } from 'uiKit/types/status';

export const StatusCircle = ({
  className,
  size = 'sm',
  status: _status = 'success',
  color,
  ...rest
}: StatusCircleProps) => {
  const status = BaseStatus[_status] as BaseStatus;
  const classes = useStyles({ size, status });

  return (
    <Box
      className={classNames(classes.root, className)}
      {...rest}
      style={{ ...rest.style, backgroundColor: color }}
    />
  );
};
