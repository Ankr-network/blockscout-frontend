import { Box, ButtonBase } from '@material-ui/core';
import CopyToClipboard from 'react-copy-to-clipboard';

import { t } from 'common';

import { SupportedChainIDS } from 'modules/common/const';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { CopyIcon } from 'uiKit/Icons/CopyIcon';
import { OutLinkIcon } from 'uiKit/Icons/OutLinkIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useTransactionStyles } from './useTransactionStyles';

function getShortTxn(txnHash: string): string {
  return `${txnHash.slice(0, 8)}...${txnHash.slice(-8)}`;
}

export interface ITransactionProps {
  tx: string;
  chainId: SupportedChainIDS;
}

export const Transaction = ({
  tx,
  chainId,
}: ITransactionProps): JSX.Element => {
  const classes = useTransactionStyles();
  const txnLink = getTxLinkByNetwork(tx, chainId);
  const shortTxn = getShortTxn(tx);

  return (
    <Box className={classes.root}>
      <Box component="span" mr={1}>
        {shortTxn}
      </Box>

      <Tooltip arrow title={t('bridge.tx.copy-tooltip')}>
        <CopyToClipboard text={tx}>
          <ButtonBase>
            <CopyIcon className={classes.icon} />
          </ButtonBase>
        </CopyToClipboard>
      </Tooltip>

      <Tooltip arrow title={t('bridge.tx.explorer-tooltip')}>
        <ButtonBase
          component="a"
          href={txnLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <OutLinkIcon className={classes.icon} />
        </ButtonBase>
      </Tooltip>
    </Box>
  );
};
