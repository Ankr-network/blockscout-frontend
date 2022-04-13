import { Divider } from '@material-ui/core';
import { useStyles } from './GlobalMenuListDividerStyles';

export const GlobalMenuListDivider = ({ isMobile }: { isMobile?: boolean }) => {
  const classes = useStyles({ isMobile });

  return <Divider className={classes.divider} />;
};
