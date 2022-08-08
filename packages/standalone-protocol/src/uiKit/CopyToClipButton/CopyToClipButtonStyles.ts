import { makeStyles, Theme } from '@material-ui/core';

interface CopyToClipProps {
  isCopied: boolean;
}

export const useStyles = makeStyles<Theme, CopyToClipProps>(theme => ({
  container: {
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    padding: 0,
    marginTop: '0!important',

    '&.moonbeam': {
      border: `1px solid ${theme.palette.common.white}`,
      '& $content': {
        padding: 0,
        backgroundColor: 'transparent',
      },
    },

    '&.eth': {
      border: `1px solid ${theme.palette.common.black}`,
      borderRadius: 6,
      '& $content': {
        padding: 0,
      },
      '& $button': {
        color: theme.palette.common.white,
        borderRadius: '6px 0 0 6px',
      },
    },

    '&.harmony': {
      '& $content': {
        padding: 0,
        backgroundColor: theme.palette.text.secondary,
      },
      '& $button': {
        color: theme.palette.common.white,
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
      },
    },

    '&.near': {
      borderRadius: 36,
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.main,

      '& $content': {
        padding: 0,
        backgroundColor: theme.palette.background.paper,
      },
      '& $button': {
        borderRadius: 36,
      },

      '& $text': {
        color: theme.palette.text.primary,
        padding: '11px 16px 11px 32px',
      },
    },

    '&.arbitrum': {
      borderRadius: 0,
      boxShadow: `0 0 0 2px ${theme.palette.grey['200']}`,

      '& $content': {
        padding: 0,
        backgroundColor: theme.palette.background.paper,
      },

      '& $button': {
        borderRadius: 0,
      },

      '& $text': {
        color: theme.palette.text.primary,
        padding: '11px 16px 11px 32px',
      },
    },

    '&.iotex': {
      border: `1px solid ${theme.palette.grey['200']}`,

      '& $content': {
        padding: 0,
        backgroundColor: theme.palette.grey['100'],
      },
    },

    '&.avalanche': {
      '& $content': {
        padding: 0,
        backgroundColor: theme.palette.background.default,
      },

      '& $button': {
        backgroundColor: theme.palette.primary.dark,

        '&:hover': {
          backgroundColor: theme.palette.primary.main,
        },
      },

      '& $text': {
        color: theme.palette.text.primary,
        padding: '11px 16px 11px 32px',
      },
    },

    '&.nervos': {
      border: `1px solid ${theme.palette.common.white}`,

      '& $content': {
        padding: 0,
      },

      '& $text': {
        color: theme.palette.common.white,
        padding: '11px 16px 11px 32px',
      },
    },

    '&.gnosis': {
      borderRadius: 9,

      '& $content': {
        padding: 0,
        backgroundColor: theme.palette.common.white,
      },
      '& $button': {
        borderRadius: 9,
      },

      '& $text': {
        padding: '11px 16px 11px 32px',
      },
    },

    '&.syscoin': {
      '& $content': {
        padding: 0,
        border: '1px solid #33373B',
        borderRadius: 50,
        '& button': {
          borderRadius: 50,
        },
      },
      '& $button': {
        backgroundColor: '#1E41A5',
      },
    },
  },
  content: ({ isCopied }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    cursor: 'pointer',
    padding: 6,
    backgroundColor: isCopied
      ? theme.palette.background.paper
      : theme.palette.background.default,
    transition: 'background-color .3s',
    margin: 0,
    marginTop: '0!important',
    minHeight: 'auto',

    '&:hover': {
      backgroundColor: theme.palette.background.default,

      '& $button': {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.secondary,
      },
    },
  }),
  text: {
    color: theme.palette.text.primary,
    textAlign: 'left',
    padding: '11px 15px',
    width: '60%',
    fontSize: 24,

    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  button: {
    transition: 'color .3s, background-color .3s',
    width: '40%',
    height: '100%',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  copyIcon: {
    fontSize: 19,

    padding: '0 !important',
    borderRadius: '0 !important',
    backgroundColor: 'inherit !important',

    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
}));
