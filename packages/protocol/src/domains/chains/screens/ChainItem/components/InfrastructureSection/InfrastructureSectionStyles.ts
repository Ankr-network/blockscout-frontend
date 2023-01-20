import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useInfrastructureSectionStyles = makeStyles()((theme: Theme) => ({
  table: {
    marginTop: theme.spacing(2 * 3.5),
  },
}));
