import { makeStyles } from '@material-ui/core';

export const useApprovalSettingsDialogStyles = makeStyles(
  ({ spacing, palette }) => ({
    header: {
      fontWeight: 700,
      fontSize: '30px',
      lineHeight: 1.2,
      textAlign: 'center',
      color: palette.text.primary,
      marginBottom: spacing(3),
    },

    description: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.57,
      color: palette.text.primary,
      marginBottom: spacing(4),
    },

    optionLabel: {
      padding: spacing(0.5, 0, 0.5, 1),

      fontWeight: 500,
      fontSize: 14,
      lineHeight: 1,
      color: palette.text.secondary,
      cursor: 'pointer',
    },

    optionLabelActive: {
      color: palette.primary.main,
    },

    input: {
      margin: spacing(1, 0, 4),
      transition: '0.2s',
    },

    inputHidden: {
      visibility: 'hidden',
      opacity: 0,
    },

    close: {
      position: 'absolute',
      top: spacing(2),
      right: spacing(2),
      border: 'none',
    },
  }),
);
