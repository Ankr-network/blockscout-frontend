import { Typography } from '@mui/material';

import { CommonCell, ICommonCellProps } from '../CommonCell';
import { useBodyCellStyles } from './useBodyCellStyles';

export interface IBodyCellProps extends ICommonCellProps {}

export const BodyCell = ({ children, className, ...props }: IBodyCellProps) => {
  const { classes, cx } = useBodyCellStyles();

  return (
    <CommonCell className={cx(classes.root, className)} {...props}>
      <Typography variant="body3">{children}</Typography>
    </CommonCell>
  );
};
