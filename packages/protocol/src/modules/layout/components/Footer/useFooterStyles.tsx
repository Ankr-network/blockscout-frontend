import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useFooterStyles = makeStyles()(theme => ({
  root: {
    height: 48,
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    margin: theme.spacing(0, 7.5, 0, 7.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',

    [theme.breakpoints.down('md')]: {
      alignItems: 'flex-start',
      margin: theme.spacing(0, 4, 0, 4),
      padding: theme.spacing(5, 0, 4, 0),
      height: 184,
    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  docs: {
    display: 'grid',
    gridTemplateColumns: '90px 220px 40px 130px 93px',
    gridTemplateRows: '1',
    gridTemplateAreas: `
      "logo copyRights divider terms privacy"
    `,

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '50px 25px 25px 50px',
      gridTemplateAreas: `
        "logo"
        "terms"
        "privacy"
        "copyRights"
      `,
    },
  },
  copyRightsLink: {
    gridArea: 'copyRights',
  },
  termsLink: {
    gridArea: 'terms',
  },
  privacyLink: {
    gridArea: 'privacy',
  },
  logo: {
    height: 24,
    width: 78,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(3),
    gridArea: 'logo',

    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(6),
    },
  },
  divider: {
    // color: theme.palette.text.secondary,
    borderColor: theme.palette.text.secondary,
    margin: theme.spacing(0, 5),
    borderWidth: 0.5,
    height: 12,
    gridArea: 'divider',

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'underline',
    textDecorationColor: alpha(theme.palette.link.main, 0.5),

    [theme.breakpoints.up('md')]: {
      '& + &': {
        marginLeft: theme.spacing(3),
      },
    },
  },
}));
