import { makeStyles } from 'tss-react/mui';
import { premiumColor } from 'uiKit/Theme/themeUtils';

import { chainDialogIntl, ChainDialogTitle } from './ChainDialogUtils';

export const CHAINS_DIALOG_BREAKDOWN = 840;

const Y_SCALE_BREAKDOWN = 770;
const scaleMedia = `@media (max-height: ${Y_SCALE_BREAKDOWN}px)`;

interface ChainsItemDialogStylesProps {
  windowHeight: number;
}

export const useChainsItemDialogStyles = makeStyles<
  ChainsItemDialogStylesProps,
  'content' | 'intro' | 'wrapperV2' | 'button'
>()((theme, { windowHeight }, classes) => ({
  paperRoot: {
    margin: 0,
    padding: theme.spacing(2 * 4.75, 2 * 4.75, 2 * 5.25, 2 * 4.75),
    borderRadius: theme.spacing(2 * 5),
    width: 1160,

    [theme.breakpoints.up(CHAINS_DIALOG_BREAKDOWN)]: {
      [scaleMedia]: {
        transform: `scale(${windowHeight / Y_SCALE_BREAKDOWN})`,
        transformOrigin: 'center top',
      },
    },
  },
  dialogContainer: {
    [theme.breakpoints.up(CHAINS_DIALOG_BREAKDOWN)]: {
      [scaleMedia]: {
        height: 'unset',
        minHeight: '100%',
      },
    },
  },
  root: {
    marginTop: theme.spacing(2 * 5),
    margin: '0 auto',

    [theme.breakpoints.down('sm')]: {
      width: 'unset',
    },
  },
  dialogTitle: {
    textAlign: 'center',
    margin: theme.spacing(0, 0, 2 * 5.75, 0),
    fontSize: 35,
  },
  wrapperV2: {
    background: 'transparent',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: theme.spacing(2 * 3.5),
    rowGap: theme.spacing(2 * 3.5),
    minHeight: 470,

    [theme.breakpoints.down(CHAINS_DIALOG_BREAKDOWN)]: {
      gridAutoFlow: 'row',
      gridTemplateColumns: 'auto',
    },
    [`& .${chainDialogIntl}-${ChainDialogTitle.free}.${classes.wrapperV2}`]: {
      [`& .${classes.content}`]: {
        borderColor: theme.palette.primary.main,
      },
    },
    [`& .${chainDialogIntl}-${ChainDialogTitle.premium}`]: {
      borderRadius: theme.spacing(2 * 5.5),
      padding: 4,
      background: premiumColor,
      overflow: 'overlay',
      border: 'none',
      [`& .${classes.content}`]: {
        border: 'none',
      },
      [`& .${classes.intro}`]: {
        display: 'block',
      },
      [`&.${classes.wrapperV2}`]: {
        background: theme.palette.background.paper,
        border: `4px solid ${theme.palette.divider}`,
        [`.${classes.button}`]: {
          '&:hover': {
            color: theme.palette.primary.main,
          },
        },
      },
    },
  },
  content: {
    padding: theme.spacing(2 * 3.5),
    border: `4px solid ${theme.palette.divider}`,
    borderRadius: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    marginBottom: 14,
  },
  intro: {
    fontSize: 14,
    fontWeight: 400,
    display: 'none',
    marginBottom: theme.spacing(2 * 2),
    color: theme.palette.grey[900],
    lineHeight: '22.82px',
    '& em': {
      fontStyle: 'normal',
      fontSize: 16,
      fontWeight: 700,
    },
  },
  description: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20.02px',
  },
  list: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '22.82px',
    marginTop: theme.spacing(2 * 2),
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: theme.palette.grey[900],
    '&:before': {
      content: '" "',
      width: 5,
      height: 5,
      borderRadius: '50%',
      backgroundColor: theme.palette.grey[900],
      margin: theme.spacing(0, 2, 0, 1),
    },
  },
  button: {
    marginTop: theme.spacing(2 * 2),
    '&:hover': {
      color: theme.palette.background.paper,
    },
    [`&.${ChainDialogTitle.enterprise}:hover`]: {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.grey[100],
    },
  },
  link: {
    '&:hover': {
      color: theme.palette.background.default,
    },
  },
}));
