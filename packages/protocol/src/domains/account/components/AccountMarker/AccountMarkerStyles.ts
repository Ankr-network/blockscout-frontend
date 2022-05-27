import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AccountMarkerProps } from './types';
import { AccountStatus } from 'multirpc-sdk';

type Props = Required<AccountMarkerProps>;

const colorsMap: Record<AccountStatus, string> = {
  [AccountStatus.ACTIVE]: '#3AC090',
  // [AccountStatus.YELLOW]: '#EEA941',
  [AccountStatus.INACTIVE]: '#D22C54',
};

export const useStyles = makeStyles<Theme, Props>(theme => ({
  accountMarkerRoot: {
    flexShrink: 0,

    width: theme.spacing(1.5),
    height: theme.spacing(1.5),

    borderRadius: '50%',

    backgroundColor: ({ status }) => colorsMap[status],

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(1.25),
      height: theme.spacing(1.25),
    },
  },
}));
