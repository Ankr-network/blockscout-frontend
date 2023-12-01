import { makeStyles } from 'tss-react/mui';

export const useProjectStyles = makeStyles()(theme => ({
  root: {
    maxWidth: 1100,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
    gridTemplateAreas: `
      "banner banner"
      "header header"
      "requests whitelist"
      "endpoints endpoints"
      "footer footer"
    `,

    columnGap: theme.spacing(7.5),
    rowGap: theme.spacing(8),
  },
  banner: {
    gridArea: 'banner',
    marginBottom: theme.spacing(8),
  },
  header: {
    marginTop: theme.spacing(-8),
    gridArea: 'header',
  },
  requests: {
    gridArea: 'requests',
  },
  whitelist: {
    gridArea: 'whitelist',
  },
  endpoints: {
    gridArea: 'endpoints',
  },
  footer: {
    gridArea: 'footer',
  },
}));
