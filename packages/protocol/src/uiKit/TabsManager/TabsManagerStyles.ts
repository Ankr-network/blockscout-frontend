import { Orientation } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

type Props = {
  orientation: Orientation;
};

export const useStyles = makeStyles<Theme, Props>(theme => ({
  tabs: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tab: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(0),
    },
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: ({ orientation }) =>
      orientation === 'vertical' ? 'column' : 'row',
  },
}));
