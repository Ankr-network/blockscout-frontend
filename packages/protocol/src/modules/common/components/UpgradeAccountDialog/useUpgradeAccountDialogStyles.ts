import { makeStyles } from 'tss-react/mui';

import bg from './assets/bg.png';

export const useUpgradeAccountDialogStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 520,
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
  dialogPaper: {
    borderRadius: 40,
  },
}));
