import { makeStyles } from 'tss-react/mui';

export const useButtonsGroupStyles = makeStyles()(theme => ({
  buttonsGroupRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
  },
  connectedAddressLabel: {
    color: theme.palette.grey[900],
  },
}));
