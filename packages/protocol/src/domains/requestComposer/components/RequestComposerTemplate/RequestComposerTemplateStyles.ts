import { makeStyles } from 'tss-react/mui';

export interface StylesProps {
  hasRequestHistory: boolean;
  isExpanded: boolean;
}

export const useRequestComposerStyles = makeStyles<StylesProps>()(
  (theme, { hasRequestHistory, isExpanded }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',

      padding: theme.spacing(2 * 3.75),

      borderRadius: theme.spacing(2 * 3.75),

      backgroundColor: theme.palette.background.paper,
    },
    container: {
      display: 'flex',
      gap: theme.spacing(2 * 3.5),
    },
    right: {
      display: 'grid',
      gridTemplateRows: isExpanded ? '1fr 1fr' : '1fr',
      gap: theme.spacing(6),

      width: '60%',
      height: !hasRequestHistory || isExpanded ? 604 : undefined,
    },
  }),
);
