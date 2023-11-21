import { makeStyles } from 'tss-react/mui';

export const useTreeStyles = makeStyles()(theme => {
  return {
    /* tree css for list items start */
    treeWrapper: {
      '--spacing': theme.spacing(4),
      '--radius': theme.spacing(2.5),
      paddingLeft: 'var(--radius)',
      marginLeft: 'calc(var(--radius) - var(--spacing))',
    },
    treeItem: {
      paddingLeft: theme.spacing(5),
      borderLeft: `2px solid ${theme.palette.grey[300]}`,
      position: 'relative',

      '&:last-child': {
        borderColor: 'transparent',
      },

      '&:before': {
        content: "''",
        display: 'block',
        position: 'absolute',
        top: 'calc(var(--spacing) / -10)',
        left: '-1.2px',
        width: 'calc(var(--spacing) + 2px)',
        height: 'calc(var(--spacing) + 2px)',
        border: `solid ${theme.palette.grey[300]}`,
        borderWidth: '0 0 2px 2px',

        '@media (-webkit-min-device-pixel-ratio: 1)': {
          left: '-2px',
        },
      },
    },
    /* tree css for list items finish */
  };
});
