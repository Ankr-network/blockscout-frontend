import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

const INPUT_WIDTH = 300;

export const useSearchEmailBindingsInputStyles = makeStyles()(
  (theme: Theme) => ({
    root: {
      marginRight: theme.spacing(4),
    },
    input: {
      '&&': {
        width: INPUT_WIDTH,
        '&, &:active, &:focus, &.Mui-focused': {
          backgroundColor: theme.palette.background.paper,
        },
      },
    },
    clientsList: {
      position: 'absolute',
      width: INPUT_WIDTH,
      padding: 0,
      zIndex: 99,
      maxHeight: 200,
      overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
      boxShadow:
        '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    },
    notFound: {
      padding: theme.spacing(2),
      color: theme.palette.text.primary,
    },
    error: {
      padding: theme.spacing(2),
      color: theme.palette.error.main,
    },
    clientItem: {
      listStyle: 'none',
    },
    clientButton: {
      textAlign: 'left',
      width: '100%',
      justifyContent: 'flex-start',
      textTransform: 'none',
      borderRadius: 0,

      display: 'inline-block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    tooltipWrapper: {
      whiteSpace: 'break-spaces',
    },
  }),
);
