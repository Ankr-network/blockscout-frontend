import { Tooltip } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles, withStyles } from 'tss-react/mui';

export const useTooltipWrapperStyles = makeStyles()((theme: Theme) => ({
  tooltipItem: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover $informationIcon': {
      color: 'black',
    },
  },
  informationIcon: {
    verticalAlign: 'middle',
    marginLeft: theme.spacing(2 * 1),
    color: theme.palette.grey[300],
    transition: 'color .3s',
    width: 20,
    height: 20,
    position: 'relative',
    top: -2,
  },
}));

export const TooltipElement = withStyles(Tooltip, (theme: Theme) => ({
  Tooltip: {
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
    color: 'rgb(31 34 38 / 52%)',
    boxShadow:
      '0px 0px 25px rgba(31, 34, 38, 0.1), 0px 5px 100px rgba(31, 34, 38, 0.15)',
    borderRadius: '21px',
    fontSize: 16,
    padding: theme.spacing(2 * 3),
  },
}));
