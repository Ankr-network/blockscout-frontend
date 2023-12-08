import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { useAuthData } from 'modules/signIn/components/SignInPage/useAuthData';

import { SignInForm } from '../SignInForm';
import bg from '../../assets/bg.png';

const useStyles = makeStyles<string>()((theme, image) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  image: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

export const SignInPage = () => {
  const { classes } = useStyles(bg);

  useAuthData();

  return (
    <Box className={classes.root}>
      <SignInForm />
    </Box>
  );
};
