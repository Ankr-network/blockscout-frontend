import { t } from '@ankr.com/common';
import { Box, Paper } from '@material-ui/core';

import { AvailableBridgeTokens } from 'modules/bridge/types';
import { SupportedChainIDS } from 'modules/common/const';
import { Button } from 'uiKit/Button';
import { Quote } from 'uiKit/Quote';

import { Transaction } from '../Transaction';

import { useUnfinishedTxBannerStyles } from './useUnfinishedTxBannerStyles';

export interface IUnfinishedTxBannerProps {
  tx: string;
  token: AvailableBridgeTokens;
  from: SupportedChainIDS;
  to: SupportedChainIDS;
  onClickFinish: () => void;
}

export const UnfinishedTxBanner = ({
  tx,
  token,
  from,
  to,
  onClickFinish,
}: IUnfinishedTxBannerProps): JSX.Element => {
  const classes = useUnfinishedTxBannerStyles();

  return (
    <Box component={Paper} p={2.5}>
      <Box className={classes.content}>
        <Quote>
          <Box className={classes.contentList}>
            <Box className={classes.title}>{t('bridge.unfinished.title')}</Box>

            {t('bridge.unfinished.message', { token, from, to })}

            <Box className={classes.txText}>
              {t('bridge.unfinished.tx-text', { tx })}

              <Transaction chainId={97} tx={tx} />
            </Box>
          </Box>
        </Quote>

        <Button fullWidth color="primary" size="large" onClick={onClickFinish}>
          {t('bridge.unfinished.finish-btn')}
        </Button>
      </Box>
    </Box>
  );
};
