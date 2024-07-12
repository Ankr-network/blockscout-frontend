import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { premiumGradient } from 'uiKit/Theme/themeUtils';

import bg from '../assets/public-bg.png';

export const useUpgradePublicBannerStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: 0,
    minHeight: 120,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 30,
  },
  content: {
    height: '100%',
    position: 'relative',
    padding: theme.spacing(7.5),
    zIndex: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(15),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(7.5),
    },
  },
  textRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: theme.spacing(1),

    '& > span > span': {
      fontWeight: 700,
      fontStyle: 'normal',
      background: premiumGradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  image: {
    position: 'absolute',
    backgroundImage: `url(${bg})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%',
  },
  button: {
    minWidth: 132,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  buttonText: {
    fontWeight: 600,
    fontStyle: 'normal',
    background: premiumGradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));
