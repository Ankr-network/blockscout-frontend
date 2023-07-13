import { makeStyles } from 'tss-react/mui';
import {
  dashboardGridTemplateColumns,
  dashboardGridTemplateRows,
  dashboardGridTemplateRowsWideScreens,
} from '../AllChainsLayout/AllChainsLayoutStyles';

export const useChainLayoutStyles = makeStyles<boolean>()(
  (theme, hasSelectedProject) => ({
    root: {
      display: 'grid',

      gridTemplateColumns: dashboardGridTemplateColumns,
      gridTemplateRows: dashboardGridTemplateRows,
      gridGap: theme.spacing(3),
      gridTemplateAreas: hasSelectedProject
        ? `
      "requests    requests    requests  requests  methods methods"
      "locations locations locations locations methods methods"
    `
        : `
      "requests    requests    requests  requests  methods methods"
      "ip-requests ip-requests locations countries methods methods"
    `,

      /* for wide screens */
      '@media screen and (min-height: 900px)': {
        gridTemplateRows: dashboardGridTemplateRowsWideScreens,
      },

      [theme.breakpoints.down('xl')]: {
        gridTemplateColumns: 'minmax(max-content, 1fr) repeat(2, 200px)',
        gridTemplateRows: '282px 421px 289px',
        gridGap: theme.spacing(3),
        gridTemplateAreas: hasSelectedProject
          ? `
        "requests    requests  requests"
        "methods     methods   methods"
        "locations locations locations"
      `
          : `
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
      padding: theme.spacing(5),
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
  }),
);
