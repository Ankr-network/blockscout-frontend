import { makeStyles } from 'tss-react/mui';

export const useConnectedWalletButtonStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    gridTemplateAreas: `
      "confirm-button another-address-button"
      "cancel-button  cancel-button"
    `,
    gridAutoColumns: '1fr 1fr',
    gap: theme.spacing(3, 1),
  },
  confirmButton: {
    gridArea: 'confirm-button',
  },
  anotherAddressButton: {
    gridArea: 'another-address-button',
  },
  cancelButton: {
    gridArea: 'cancel-button',
  },
}));
