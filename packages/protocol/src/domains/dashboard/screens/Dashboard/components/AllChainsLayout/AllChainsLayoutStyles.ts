import { makeStyles } from 'tss-react/mui';

export const dashboardGridTemplateColumns = 'repeat(2, 1fr) repeat(4, 200px)';
export const dashboardGridTemplateRows = 'repeat(2, calc(50vh - 88px))';

export const useAllChainsLayoutStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',

    gridTemplateColumns: dashboardGridTemplateColumns,
    gridTemplateRows: dashboardGridTemplateRows,
    gridGap: theme.spacing(3),
    gridTemplateAreas: `
      "requests    requests    requests  requests  calls   projects"
      "ip-requests ip-requests locations countries history history"
    `,

    [theme.breakpoints.down('xl')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: '282px 190px repeat(2, 289px)',
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
    padding: theme.spacing(5),
    gap: theme.spacing(3),

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
  },
}));
