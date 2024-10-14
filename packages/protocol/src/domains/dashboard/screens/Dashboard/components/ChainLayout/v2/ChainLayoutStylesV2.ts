import { makeStyles } from 'tss-react/mui';

import {
  dashboardGridTemplateColumns,
  dashboardGridTemplateRows,
  dashboardGridTemplateRowsWideScreens,
} from '../../AllChainsLayout/v1/AllChainsLayoutStyles';

export const useChainLayoutStylesV2 = makeStyles<boolean>()(
  (theme, hasSelectedProject) => ({
    root: {
      display: 'grid',

      gridTemplateColumns: dashboardGridTemplateColumns,
      gridTemplateRows: dashboardGridTemplateRows,
      gridGap: theme.spacing(3),
      gridTemplateAreas: hasSelectedProject
        ? `
      "requests    requests    requests  requests  methods methods"
      "responses responses responses responses methods methods"
    `
        : `
      "requests    requests    requests  requests  methods methods"
      "ip-requests ip-requests responses countries methods methods"
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
        "responses responses responses"
      `
          : `
        "requests    requests  requests"
        "methods     methods   methods"
        "ip-requests responses countries"
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
    responses: {
      gridArea: 'responses',
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
