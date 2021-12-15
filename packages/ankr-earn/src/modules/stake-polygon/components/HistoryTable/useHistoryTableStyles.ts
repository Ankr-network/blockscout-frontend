import { makeStyles, Theme } from '@material-ui/core/styles';

export const useHistoryTableStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},

  switcherArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '22px 0 22.5px 0',
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
  },

  switcherTitle: {
    color: theme.palette.text.secondary,
    fontSize: 20,
    fontWeight: 500,
    cursor: 'pointer',

    '&:first-child': {
      margin: theme.spacing(0, 6, 0, 0),
    },
  },
  switcherTitleActive: {
    color: theme.palette.text.primary,
    cursor: 'default',
  },

  tableHeadCellContent: {
    display: 'flex',
    alignItems: 'center',
  },
}));
