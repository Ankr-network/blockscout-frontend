import { makeStyles } from 'tss-react/mui';

import bg from './assets/bg.png';

const name = 'UpgradeAccountDialog';

export const useUpgradeAccountDialogStyles = makeStyles({ name })(theme => ({
  upgradeAccountRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: 520,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  imageWrapper: {
    position: 'absolute',
    display: 'flex',
    height: 280,
    width: 600,
    top: -40,
    left: -40,
    overflow: 'hidden',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'auto',

    [theme.breakpoints.down('sm')]: {
      width: `calc(100% + 80px)`,
      height: 'auto',
    },

    [theme.breakpoints.down('xs')]: {
      width: `calc(100% + 60px)`,
    },
  },
  image: {
    height: 280,
    width: 280,
    margin: 'auto',
  },
  contentWrapper: {
    marginTop: theme.spacing(52),
    marginBottom: theme.spacing(6),
  },
  title: {
    fontSize: 28,
    marginBottom: theme.spacing(3),
  },
  description: {
    marginBottom: theme.spacing(3),
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: '140%',
    fontWeight: 400,
    marginBottom: theme.spacing(1),

    '& svg': {
      marginRight: theme.spacing(2),
      color: theme.palette.success.main,
    },
  },
  confirmButton: {
    marginBottom: theme.spacing(3),
  },
  closeButtonClassName: {
    border: `2px solid ${theme.palette.background.default}`,

    '& > svg': {
      color: theme.palette.primary.main,
    },
  },
  premiumDialogPaper: {
    borderRadius: 40,
  },
}));
