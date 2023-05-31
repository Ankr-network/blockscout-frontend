import { makeStyles } from 'tss-react/mui';

export const useAllChainsLayoutStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',

    gridTemplateColumns: 'repeat(2, 1fr) repeat(4, 200px)',
    gridTemplateRows: 'repeat(2, 32vh)',
    gridGap: theme.spacing(4),
    gridTemplateAreas: `
      "requests    requests    requests  requests  calls   projects"
      "ip-requests ip-requests locations countries history history"
    `,

    [theme.breakpoints.down('xl')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: '282px 176px 289px',
      gridGap: theme.spacing(3),
      gridTemplateAreas: `
        "requests    requests"
        "calls       projects"
        "ip-requests locations"
        "countries   history"
      `,
    },

    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(3),
    },
  },
  requests: {
    gridArea: 'requests',
    padding: theme.spacing(6),

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
}));
