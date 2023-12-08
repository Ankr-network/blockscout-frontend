import { Button, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useCallback } from 'react';
import { Spinner } from 'ui';
import { AuthProviderEnum } from 'multirpc-sdk';

import { useLazyFetchAuthLinkQuery } from 'modules/signIn/actions/fetchAuthLink';

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

const SPINNER_SIZE = 24;

const IS_GITHUB_AUTH_ENABLED = false;

export const SignInForm = () => {
  const { classes } = useStyles();
  const [fetchAuthLink, { originalArgs, isFetching }] =
    useLazyFetchAuthLinkQuery();

  const redirectToUAuth = useCallback((url = '') => {
    // TODO: update react-router to v6 to use useNavigation
    // then we could change it to navigate(url, {replace: true});
    window.location.replace(url);
  }, []);

  const onGoogleButtonClick = useCallback(async () => {
    const { data: uAuthUrl } = await fetchAuthLink(
      AuthProviderEnum.AUTH_PROVIDER_GOOGLE,
    );

    redirectToUAuth(uAuthUrl);
  }, [fetchAuthLink, redirectToUAuth]);

  const onGithubButtonClick = useCallback(async () => {
    const { data: uAuthUrl } = await fetchAuthLink(
      AuthProviderEnum.AUTH_PROVIDER_GITHUB,
    );

    redirectToUAuth(uAuthUrl);
  }, [fetchAuthLink, redirectToUAuth]);

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
        disabled={isFetching}
        onClick={onGoogleButtonClick}
        startIcon={<GoogleIcon className={classes.buttonIcon} />}
        endIcon={
          isFetching &&
          originalArgs === AuthProviderEnum.AUTH_PROVIDER_GOOGLE && (
            <Spinner size={SPINNER_SIZE} centered={false} />
          )
        }
      >
        Continue with Google
      </Button>

      {IS_GITHUB_AUTH_ENABLED && (
        <Button
          className={classes.button}
          size="large"
          variant="outlined"
          disabled={isFetching}
          onClick={onGithubButtonClick}
          startIcon={<GithubIcon className={classes.buttonIcon} />}
          endIcon={
            isFetching &&
            originalArgs === AuthProviderEnum.AUTH_PROVIDER_GITHUB && (
              <Spinner size={SPINNER_SIZE} centered={false} />
            )
          }
        >
          Continue with GitHub
        </Button>
      )}

      <Typography className={classes.note}>
        By continuing you agree to our <a href="href">terms of service</a>
        <br />
        and <a href="href">privacy policy</a>.
      </Typography>
    </div>
  );
};
