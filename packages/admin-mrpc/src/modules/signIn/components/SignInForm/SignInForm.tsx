import { Button, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { ReactComponent as AnkrIcon } from '../../assets/ankr-logo.svg';
import { ReactComponent as GoogleIcon } from '../../assets/google.svg';
import { ReactComponent as GithubIcon } from '../../assets/github.svg';

const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 398,
    borderRadius: 12,
    padding: theme.spacing(10, 6),
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    marginBottom: theme.spacing(10),
  },
  title: {
    fontSize: 35,
    fontWeight: 600,
    marginBottom: theme.spacing(10),
    fontFamily: 'TT Firs Neue',
  },
  button: {
    width: '100%',
    color: theme.palette.text.primary,

    '&:first-of-type': {
      marginBottom: theme.spacing(3),
    },

    '&:last-of-type': {
      marginBottom: theme.spacing(10),
    },
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
  note: {
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center',

    '& > a': {
      color: theme.palette.primary.main,
    },
  },
}));

export const SignInForm = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <AnkrIcon className={classes.icon} />

      <Typography className={classes.title} variant="h5">
        Sign In
      </Typography>

      <Button
        className={classes.button}
        size="large"
        variant="outlined"
        startIcon={<GoogleIcon className={classes.buttonIcon} />}
      >
        Continue with Google
      </Button>

      <Button
        className={classes.button}
        size="large"
        variant="outlined"
        startIcon={<GithubIcon className={classes.buttonIcon} />}
      >
        Continue with GitHub
      </Button>

      <Typography className={classes.note}>
        By continuing you agree to our <a href="href">terms of service</a>
        <br />
        and <a href="href">privacy policy</a>.
      </Typography>
    </div>
  );
};
