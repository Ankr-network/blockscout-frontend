import { makeStyles } from '@material-ui/core';

export const useFlashUnstakeStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(1.5),
    width: '100%',
  },
  unstakeTypeBtn: {
    cursor: 'pointer',
    padding: spacing(2, 2.5),
    width: '100%',
    height: spacing(11),
    background: palette.common.white,
    border: `1px solid ${palette.grey['400']}`,
    borderRadius: 12,
  },
  unstakeTagList: {
    display: 'flex',
    gap: spacing(1),
  },
  unstakeTag: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: palette.text.secondary,

    '&:after': {
      marginLeft: spacing(1),
      content: '""',
      display: 'block',
      height: spacing(2.25),
      width: spacing(0.25),
      background: palette.action.disabledBackground,
    },

    '&:last-child': {
      '&:after': {
        display: 'none',
      },
    },
  },
  unstakeTitle: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '100%',
    textAlign: 'center',
    color: palette.text.secondary,
    marginLeft: spacing(1),
  },
  unstakeTitleActive: {
    color: palette.primary.main,
  },
  unstakeTopRow: {
    marginBottom: spacing(1.5),
  },
  instantIcon: {
    marginRight: spacing(0.75),
  },
}));
