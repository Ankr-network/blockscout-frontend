import { makeStyles } from 'tss-react/mui';

import { AccountStatus } from 'domains/account/types';

export const useStyles = makeStyles<AccountStatus>()((theme, status) => {
  const colorsMap: Record<AccountStatus, string> = {
    [AccountStatus.GREEN]: theme.palette.success.main,
    [AccountStatus.RED]: theme.palette.error.main,
    [AccountStatus.GREY]: theme.palette.grey[400],
    [AccountStatus.YELLOW]: theme.palette.warning.main,
  };

  return {
    root: {
      flexShrink: 0,

      width: theme.spacing(3),
      height: theme.spacing(3),

      borderRadius: '50%',

      backgroundColor: colorsMap[status],
    },
  };
});
