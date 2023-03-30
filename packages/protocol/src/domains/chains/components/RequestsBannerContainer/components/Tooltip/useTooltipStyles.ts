import { makeStyles } from 'tss-react/mui';
import { commonShadow } from 'uiKit/Theme/themeUtils';

export const useTooltipStyles = makeStyles()(theme => ({
  root: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20.02px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    boxShadow: commonShadow,
    padding: theme.spacing(3, 8),
  },
  total: {
    color: theme.palette.text.primary,
    '& em': {
      color: theme.palette.text.primary,
      fontStyle: 'normal',
      fontWeight: 700,
    },
  },
  reject: {
    color: theme.palette.text.primary,
    '& em': {
      color: theme.palette.error.main,
      fontStyle: 'normal',
      fontWeight: 700,
    },
  },
  name: {
    color: theme.palette.grey[600],
    marginTop: theme.spacing(1),
  },
}));
