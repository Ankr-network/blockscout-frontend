import { makeStyles } from 'tss-react/mui';

export const useProjectConnectionSnippetStyles = makeStyles()(theme => ({
  snippetPlaceholderWrapper: {
    padding: '30px 10px',
    margin: '40px 100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  noItemsIcon: {
    color: theme.palette.text.secondary,
  },
}));
