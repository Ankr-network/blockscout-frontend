import { Orientation } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

type Props = {
  orientation: Orientation;
};

export const useStyles = makeStyles<Props>()((theme: Theme, props: Props) => ({
  tabs: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tab: {
    whiteSpace: 'nowrap',
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
    flexDirection: props.orientation === 'vertical' ? 'column' : 'row',
  },
}));