import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

interface IProps {
  isLightTheme: boolean;
  hasSmallFontSize: boolean;
}

export const useSampleCodeDialogStyles = makeStyles<IProps>()(
  (theme: Theme, { isLightTheme, hasSmallFontSize }: IProps) => ({
    paper: {
      width: '100%',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      fontSize: hasSmallFontSize ? 24 : 'auto',
    },
    codeArea: {
      position: 'relative',
      borderRadius: theme.spacing(2 * 3),
      width: '100%',

      backgroundColor: isLightTheme
        ? theme.palette.grey[800]
        : theme.palette.background.default,
    },
  }),
);
