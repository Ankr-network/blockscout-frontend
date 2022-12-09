import { makeStyles } from '@material-ui/core/styles';

export const useStakeTokenInfoStyles = makeStyles(({ spacing }) => ({
  root: {
    display: 'flex',
    minHeight: spacing(11),
    borderRadius: '12px',
    border: '2px solid #F2F5FA',
    padding: spacing(1.5, 2.5, 1.5, 1.5),
    margin: spacing(3, 0, 4, 0),
  },
  icon: {
    flex: `0 0 ${spacing(7.5)}px`,
    width: spacing(7.5),
    height: spacing(7.5),
    marginRight: spacing(2),
  },
  description: {
    fontSize: 14,
    lineHeight: '20px',
    color: '#030202',
  },
}));
