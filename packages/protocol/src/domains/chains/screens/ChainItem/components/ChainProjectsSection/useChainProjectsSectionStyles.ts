import { makeStyles } from 'tss-react/mui';

export const useChainProjectsSectionStyles = makeStyles()(theme => ({
  chainProjectsRoot: {
    marginBottom: theme.spacing(6),
    padding: theme.spacing(8),
    backgroundImage: 'none',
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
  },
}));
