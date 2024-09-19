import { makeStyles } from 'tss-react/mui';

// eslint-disable-next-line max-lines-per-function
export const useChainProjectsSectionStyles = makeStyles()(theme => ({
  chainProjectsRoot: {
    marginBottom: theme.spacing(6),
    padding: theme.spacing(8),
    backgroundImage: 'none',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5.5, 4),
    },
  },
  projectsSectionTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chainProjectsTimeframe: {},
  chainProjectsTimeframeTab: {
    height: 'auto',
  },

  projectsSpinner: {
    margin: '20px auto',
  },
  projectsTable: {
    borderSpacing: theme.spacing(0, 3),
    tableLayout: 'fixed',
  },
  projectRow: {
    cursor: 'pointer',
    '&:hover:not(:has(button:hover))': {
      '& a': {
        color: theme.palette.primary.main,
        '& > svg': {
          color: theme.palette.primary.main,
        },
      },
    },
  },
  projectsTableHeader: {},
  projectTableRow: {},
  projectsTableCell: {
    backgroundColor: 'transparent',
    borderBottom: 'none',
  },
  projectTableHeadCell: {
    paddingBottom: 0,
    fontWeight: 400,
  },
  projectsTableBodyCell: {
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),

    '&:first-of-type': {
      borderLeft: `1px solid ${theme.palette.divider}`,
      paddingLeft: theme.spacing(6),
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
    },
    '&:last-of-type': {
      borderRight: `1px solid ${theme.palette.divider}`,
      paddingRight: theme.spacing(6),
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
    },
  },
  projectTableHeadCellNameCell: {
    width: '30%',
    '&&': {
      paddingLeft: theme.spacing(6),
    },
  },
  projectTableHeadCellStatusCell: {
    width: '15%',
  },
  projectsTableRequestsCell: {
    width: '15%',
  },
  projectsTableButtonsCell: {
    width: '40%',
  },
  projectTableButtonsWrapper: {
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  projectTableButtonsSkeleton: {
    display: 'inline-block',
  },
  projectArrowIcon: {
    width: 6,
    height: 10,
    marginLeft: theme.spacing(2.5),
    strokeWidth: 1.5,
  },
  projectLink: {
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: 16,
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    width: '100%',

    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,

      '& > svg': {
        color: theme.palette.primary.main,
      },
    },
  },
  projectLinkName: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: '100%',
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(0.5),
      fontWeight: 700,
    },
  },
  copyEndpointBtn: {},
  chainCodeExampleButton: {
    padding: 0,
    height: 30,
    minHeight: 30,
    marginLeft: theme.spacing(2),
    whiteSpace: 'nowrap',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      marginLeft: 0,
    },
  },

  /*mobile*/
  projectMobileWrapper: {
    backgroundImage: 'none',
    border: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(2),
    padding: theme.spacing(5, 4),
  },
}));
