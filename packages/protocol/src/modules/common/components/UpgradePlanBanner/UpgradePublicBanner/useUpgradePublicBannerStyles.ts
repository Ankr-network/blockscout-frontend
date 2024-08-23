import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { darken } from '@mui/material';

import { isLightTheme, premiumGradient } from 'uiKit/Theme/themeUtils';
import { CONTENT_WIDTH } from 'modules/layout/components/DefautLayout';

import bg from '../assets/public-bg.png';

export const useUpgradePublicBannerStyles = makeStyles()((theme: Theme) => ({
  upgradeBannerRoot: {
    padding: 0,
    minHeight: 120,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 30,
    maxWidth: CONTENT_WIDTH,
    margin: 'auto',
  },
  upgradeBannerContent: {
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

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5.5, 4),
    },
  },
  textRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: theme.spacing(1),
    color: '#356DF3',

    '& > span > span': {
      fontWeight: 700,
      fontStyle: 'normal',
      background: premiumGradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  typography: {
    color: '#1F2226',
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
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: isLightTheme(theme)
        ? theme.palette.grey[100]
        : darken(theme.palette.common.white, 0.1),
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
