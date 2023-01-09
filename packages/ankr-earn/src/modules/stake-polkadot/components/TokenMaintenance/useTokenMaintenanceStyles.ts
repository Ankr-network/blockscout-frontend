import { makeStyles } from '@material-ui/core';

export const useTokenMaintenanceStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    maxWidth: 700,
  },
  paper: {
    padding: spacing(4, 6, 5, 6),
    position: 'relative',
  },
  image: {
    width: spacing(7.5),
    height: spacing(7.5),
  },
  imageWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: spacing(3.5),
  },
  title: {
    fontWeight: 700,
    fontSize: 30,
    lineHeight: 1.2,
    textAlign: 'center',
    color: palette.text.primary,
    marginBottom: spacing(2),
  },
  description: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.3,
    textAlign: 'center',
    color: palette.text.primary,
    marginBottom: spacing(3),
  },
}));
