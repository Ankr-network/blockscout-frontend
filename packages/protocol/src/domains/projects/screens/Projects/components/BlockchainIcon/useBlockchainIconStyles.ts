import { makeStyles } from 'tss-react/mui';

import { ChainID } from 'modules/chains/types';

export const useBlockchainIconStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: theme.spacing(3.5),
  },
  noPaddingLeft: {
    paddingLeft: 0,
  },
  icon: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginLeft: theme.spacing(-2),
    borderRadius: '50%',
  },
  [ChainID.MULTICHAIN]: {
    backgroundColor: theme.palette.common.white,
  },
  more: {
    color: theme.palette.text.secondary,
    display: 'inline-flex',
    marginLeft: theme.spacing(2),
  },
}));
