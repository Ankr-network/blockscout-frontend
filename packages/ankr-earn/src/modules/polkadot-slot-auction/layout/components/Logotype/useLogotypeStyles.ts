import { alpha, makeStyles } from '@material-ui/core/styles';

export const useLogotypeStyles = makeStyles(theme => ({
  component: {
    display: 'grid',
    margin: 0,
    marginRight: 'auto',
    gridTemplateColumns: 'auto auto auto',
    gridTemplateAreas: '"link divider company"',
    gridColumnGap: theme.spacing(2.5),
    alignItems: 'center',

    '&::before': {
      gridArea: 'divider',
      content: `''`,
      display: 'block',
      height: 38,
      width: 1,
      background: alpha(theme.palette.common.white, 0.1),
    },
  },
  link: {
    gridArea: 'link',
    width: 103,
    cursor: 'pointer',

    '& svg': {
      width: '100%',
      height: 'auto',
    },
  },
  active: {
    pointerEvents: 'none',
  },

  company: {
    gridArea: 'company',
    fontSize: 16,
  },
}));
