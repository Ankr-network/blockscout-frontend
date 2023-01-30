import { Themes } from '@ankr.com/ui';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

const LOGO_WIDTH = 50;
const LOGO_MARGIN = 15;

export const useStyles = makeStyles<{
  isHighlighted: boolean;
  themes: Themes;
}>()((theme: Theme, props: { isHighlighted: boolean; themes: Themes }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: LOGO_WIDTH,
    marginRight: LOGO_MARGIN,
  },
  title: {
    fontSize: 18,
    marginBottom: theme.spacing(2 * 0.25),

    transition: 'color 0.2s',

    color: props.isHighlighted ? theme.palette.primary.main : undefined,
  },
  hasLabel: {
    maxWidth: 'calc(100% - 71px)',

    [theme.breakpoints.between('sm', 850)]: {
      maxWidth: '100%',
    },
  },
  right: {
    flex: 1,
    maxWidth: `calc(100% - ${LOGO_WIDTH}px - ${LOGO_MARGIN}px)`,
    position: 'relative',
  },
  req: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2 * 1),
    color:
      props.themes === Themes.light
        ? theme.palette.grey[800]
        : theme.palette.grey[500],
  },
  skeleton: {
    width: '100%',
    maxWidth: 140,
    marginTop: theme.spacing(2 * 0.5),
    height: 21,
    transform: 'none',
  },
}));
