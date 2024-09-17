import { makeStyles } from 'tss-react/mui';

export const usePlansStyles = makeStyles<void>()(theme => ({
  root: {
    width: '100%',
    maxWidth: 1028,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(2, auto)',
    gridTemplateAreas: `
      "free payg deal"
      "enterprise enterprise enterprise"
    `,
    gap: theme.spacing(5),
    margin: `${theme.spacing(30)} auto`,

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(4, auto)',
      gridTemplateAreas: `
      "free"
      "payg"
      "deal"
      "enterprise"
    `,
      margin: `${theme.spacing(20)} auto`,
    },

    [theme.breakpoints.down('sm')]: {
      margin: `${theme.spacing(10)} auto`,
    },
  },
  wrapper: {
    position: 'relative',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 0,
  },
}));
