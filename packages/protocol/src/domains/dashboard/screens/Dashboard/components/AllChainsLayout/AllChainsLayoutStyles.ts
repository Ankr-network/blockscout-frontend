import { makeStyles } from 'tss-react/mui';

export const useAllChainsLayoutStyles = makeStyles<boolean>()(
  (theme, hasSelectedProject) => ({
    firstLine: {
      display: 'grid',

      gridTemplateColumns: 'repeat(2, 1fr) repeat(4, 200px)',
      gridTemplateRows: 'repeat(1, 32vh)',
      gridGap: theme.spacing(4),
      gridTemplateAreas: `
      "requests    requests    requests  requests  calls   projects"
    `,

      [theme.breakpoints.down('xl')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: '282px 190px',
        gridGap: theme.spacing(3),
        gridTemplateAreas: `
        "requests    requests"
        "calls       projects"
      `,
      },

      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(3),
      },
    },
    secondLine: {
      marginTop: theme.spacing(4),
      display: 'flex',
      alignItems: 'cetenr',
      gridGap: theme.spacing(3),
      height: theme.spacing(70),

      '& > div': {
        width: hasSelectedProject ? '50%' : '25%',
      },
    },
    requests: {
      gridArea: 'requests',
      padding: theme.spacing(5),

      [theme.breakpoints.down('sm')]: {
        maxHeight: 300,
      },
    },
    calls: {
      gridArea: 'calls',
    },
    projects: {
      gridArea: 'projects',
    },
    ipRequests: {
      gridArea: 'ip-requests',
    },
    locations: {
      gridArea: 'locations',
    },
    countries: {
      gridArea: 'countries',
    },
    history: {
      gridArea: 'history',
    },
    methods: {
      gridArea: 'methods',

      backgroundColor: 'silver',
    },
  }),
);
