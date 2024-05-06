import { makeStyles } from 'tss-react/mui';

export const useRevokeApprovalButtonsStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    gridTemplateAreas: `
      "revoke-button check-approval-button"
      "cancel-button  cancel-button"
    `,
    gridAutoColumns: '1fr 1fr',
    gap: theme.spacing(3, 2),
  },
  revokeButton: {
    gridArea: 'revoke-button',
  },
  checkApprovalButton: {
    gridArea: 'check-approval-button',
  },
  cancelButton: {
    gridArea: 'cancel-button',
  },
}));
