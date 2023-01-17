import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { AccountMarkerProps } from './types';
import { BalanceStatus } from 'domains/account/types';

type Props = Required<AccountMarkerProps>;

const colorsMap: Record<BalanceStatus, string> = {
  [BalanceStatus.GREEN]: '#3AC090',
  [BalanceStatus.YELLOW]: '#EEA941',
  [BalanceStatus.RED]: '#D22C54',
};

export const useStyles = makeStyles<Props>()((theme: Theme, props: Props) => ({
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
}));
