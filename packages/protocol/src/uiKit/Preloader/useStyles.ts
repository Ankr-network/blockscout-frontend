import { keyframes, Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { mainTheme } from 'uiKit/Theme/mainTheme';

interface SpinnerStyleProps {
  size: number;
}

const color = keyframes`
  0% {
    background-color: ${mainTheme.palette.primary.main}
  },
  100% {
    background-color: ${mainTheme.palette.action.disabledBackground}
  },
`;

export const useStyles = makeStyles<SpinnerStyleProps>()(
  (theme: Theme, props: SpinnerStyleProps) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    circle: {
      width: props.size,
      height: props.size,
      borderRadius: '50%',
      margin: theme.spacing(2 * 0.325),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      animation: `${color} 1.5s infinite ease-out`,
      backgroundColor: theme.palette.action.disabledBackground,
    },
    circle2: {
      animationDelay: '0.5s',
    },
    circle3: {
      animationDelay: '1s',
    },
    centered: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  }),
);
