import { makeStyles } from '@material-ui/core/styles';

interface StylesProps {
  isCollapsed: boolean;
  isCollapsible: boolean;
}

export const useStyles = makeStyles<void, StylesProps>(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    cursor: ({ isCollapsible }) => (isCollapsible ? 'pointer' : 'default'),

    // to avoid blue highlighting on ios devices
    '-webkit-tap-highlight-color': 'transparent',
  },
  icon: {
    transform: ({ isCollapsed }) => (!isCollapsed ? 'rotate(180deg)' : 'none'),
    transformOrigin: '50% 50%',
  },
}));
