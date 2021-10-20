import { makeStyles, Theme } from '@material-ui/core/styles';

import { mainTheme } from 'modules/themes/mainTheme';
import { SIDEBAR_WIDTH } from '../SideBar';
import { HEADER_HEIGHT } from '../Header';
import { MOBILE_HEADER_HEIGHT } from '../MobileHeader';

const MOBILE_LAYOUT_PADDING = 30;

interface StyleProps {
  isDesktop: boolean;
  isLayoutDefaultColor: boolean;
}

export const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  root: {
    display: 'flex',
    minWidth: 375,
    background: theme.palette.background.default,
  },
  darkTheme: {},
  body: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: props =>
      props.isLayoutDefaultColor
        ? mainTheme.palette.background.default
        : mainTheme.palette.background.paper,
    paddingLeft: props => (props.isDesktop ? `${SIDEBAR_WIDTH}px` : 0),
  },
  main: {
    flexGrow: 1,
    paddingBottom: theme.spacing(6),
    position: 'relative',
    paddingTop: props =>
      `${
        props.isDesktop
          ? HEADER_HEIGHT
          : MOBILE_HEADER_HEIGHT + MOBILE_LAYOUT_PADDING
      }px`,
  },
}));
