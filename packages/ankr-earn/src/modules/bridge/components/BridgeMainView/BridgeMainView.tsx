import { TextField } from '@material-ui/core';
import { Box, Typography, Input } from '@material-ui/core';
import {
  AvailableNewtworks,
  useBlockchainPanelOptions,
} from 'modules/bridge/hooks/useBlockchainPanelOptions';
import {
  AvailableTokens,
  useTokenSelectOptions,
} from 'modules/bridge/hooks/useTokenSelectOptions';
import { t } from 'modules/i18n/utils/intl';
import { TokenSelect } from 'modules/trading-cockpit/components/TokenSelect';
import React from 'react';
import { useState } from 'react';
import { Button } from 'uiKit/Button';
import { Checkbox } from 'uiKit/Checkbox';
import { SwapIcon } from 'uiKit/Icons/SwapIcon';
import { BridgeBlockchainPanel } from '../BridgeBlockchainPanel';
import { useBridgeMainViewStyles } from './useBridgeMainViewStyles';

export const BridgeMainView = () => {
  const classes = useBridgeMainViewStyles();
  const options = useTokenSelectOptions();
  const networkOptions = useBlockchainPanelOptions();

  const [tokenValue, setTokenValue] = useState(AvailableTokens.aETHc);
  const [isSendAnother, setIsSendAnother] = useState(false);

  const [swapNetworkItem, setSwapNetworkItem] = useState({
    from: AvailableNewtworks.bsc,
    to: AvailableNewtworks.ethMain,
  });

  return (
    <div className={classes.root}>
      <Typography variant="h2" classes={{ root: classes.title }}>
        {t('bridge.main.title')}
      </Typography>

      <Box className={classes.tokenField}>
        <Box className={classes.tokenSelectWrapper}>
          <TokenSelect
            className={classes.tokenSelect}
            value={tokenValue}
            onChange={evt => {
              const currentValue = evt.target.value;
              setTokenValue(currentValue as AvailableTokens);
            }}
            options={options}
            variant="filled"
          />
        </Box>
        <Input
          className={classes.tokenInput}
          type={'number'}
          placeholder={'0'}
        />
        <Button className={classes.maxBtn} variant="outlined" size="small">
          {t('bridge.main.btn-max')}
        </Button>
      </Box>

      <Box className={classes.balance}>
        <span>
          {t('bridge.main.your-balance')} <span>20.33 aETHc</span>
        </span>
      </Box>

      <Box className={classes.swapFields}>
        <Box className={classes.swapField}>
          <BridgeBlockchainPanel
            value={swapNetworkItem.from}
            items={networkOptions}
            direction={'from'}
          />
        </Box>
        <Box>
          <SwapIcon
            className={classes.swapBtn}
            onClick={() => {
              setSwapNetworkItem({
                from: swapNetworkItem.to,
                to: swapNetworkItem.from,
              });
            }}
          />
        </Box>

        <Box className={classes.swapField}>
          <BridgeBlockchainPanel
            value={swapNetworkItem.to}
            items={networkOptions}
            direction={'to'}
          />
        </Box>
      </Box>

      <Box className={classes.anotherCheckbox}>
        <Checkbox
          checked={isSendAnother}
          onChange={() => setIsSendAnother(!isSendAnother)}
          label={'Send to another address'}
        />
        {isSendAnother ? (
          <TextField className={classes.anotherAddress} />
        ) : null}
      </Box>

      <Button
        color="primary"
        size="large"
        className={classes.submitBtn}
        type="submit"
      >
        {t('bridge.main.connectBtn')}
      </Button>
    </div>
  );
};
