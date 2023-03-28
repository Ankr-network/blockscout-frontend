import { makeStyles } from 'tss-react/mui';

import { AccountMarkerProps } from './types';
import { BalanceStatus } from 'domains/account/types';

type Props = Required<AccountMarkerProps>;

export const useStyles = makeStyles<Props>()((theme, props) => {
  const colorsMap: Record<BalanceStatus, string> = {
    [BalanceStatus.GREEN]: theme.palette.success.main,
    [BalanceStatus.GREY]: theme.palette.grey[400],
    [BalanceStatus.YELLOW]: theme.palette.warning.main,
    [BalanceStatus.RED]: theme.palette.error.main,
  };

  return {
    accountMarkerRoot: {
      flexShrink: 0,

      width: theme.spacing(2 * 1.5),
      height: theme.spacing(2 * 1.5),

      borderRadius: '50%',

      backgroundColor: colorsMap[props.status],

      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(2 * 1.25),
        height: theme.spacing(2 * 1.25),
      },
    },
  };
});
