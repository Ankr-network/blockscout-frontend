import { makeStyles } from 'tss-react/mui';

export const useChainLayoutStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',

    gridTemplateColumns: 'repeat(2, 1fr) repeat(4, 200px)',
    gridTemplateRows: 'repeat(2, 32vh)',
    gridGap: theme.spacing(4),
    gridTemplateAreas: `
      "requests    requests    requests  requests  methods methods"
      "ip-requests ip-requests locations countries methods methods"
    `,

    [theme.breakpoints.down('xl')]: {
      gridTemplateColumns: 'minmax(max-content, 1fr) repeat(2, 200px)',
      gridTemplateRows: '282px 421px repeat(2, 289px)',
      gridGap: theme.spacing(3),
      gridTemplateAreas: `
        "requests    requests  requests"
        "methods     methods   methods"
        "ip-requests locations countries"
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

    backgroundColor: 'yellow',
  },
  methods: {
    gridArea: 'methods',
  },
}));
