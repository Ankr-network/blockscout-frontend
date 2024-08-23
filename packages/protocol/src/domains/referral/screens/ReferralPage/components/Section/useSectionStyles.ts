import { makeStyles } from 'tss-react/mui';

const name = 'Section';

export interface IUseSectionStylesProps {
  hasActions: boolean;
}

export const useSectionStyles = makeStyles<IUseSectionStylesProps>({ name })(
  (theme, { hasActions }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(5),

      [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(hasActions ? 3 : 4),
      },
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: theme.spacing(4),
      },
    },
    title: {
      letterSpacing: '-0.03em',

      color: theme.palette.text.primary,

      [theme.breakpoints.down('sm')]: {
        letterSpacing: '-0.01em',

        fontSize: 24,
        lineHeight: 1.15,
      },
    },
    actions: {},
    content: {},
  }),
);
