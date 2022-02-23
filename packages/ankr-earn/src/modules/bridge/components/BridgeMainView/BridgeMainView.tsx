import { TextField, Box, Typography, Input } from '@material-ui/core';
import { useState } from 'react';

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
import { Button } from 'uiKit/Button';
import { Checkbox } from 'uiKit/Checkbox';
import { SwapIcon } from 'uiKit/Icons/SwapIcon';

import { BridgeBlockchainPanel } from '../BridgeBlockchainPanel';

import { useBridgeMainViewStyles } from './useBridgeMainViewStyles';

export const BridgeMainView = (): JSX.Element => {
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
      <Typography classes={{ root: classes.title }} variant="h2">
        {t('bridge.main.title')}
      </Typography>

      <Box className={classes.tokenField}>
        <Box className={classes.tokenSelectWrapper}>
          <TokenSelect
            className={classes.tokenSelect}
            options={options}
            value={tokenValue}
            variant="filled"
            onChange={evt => {
              const currentValue = evt.target.value;
              setTokenValue(currentValue as AvailableTokens);
            }}
          />
        </Box>

        <Input className={classes.tokenInput} placeholder="0" type="number" />

        <Button className={classes.maxBtn} size="small" variant="outlined">
          {t('bridge.main.btn-max')}
        </Button>
      </Box>

      <Box className={classes.balance}>
        <span>
          {t('bridge.main.your-balance')}

          <span>20.33 aETHc</span>
        </span>
      </Box>

      <Box className={classes.swapFields}>
        <Box className={classes.swapField}>
          <BridgeBlockchainPanel
            direction="from"
            items={networkOptions}
            value={swapNetworkItem.from}
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
            direction="to"
            items={networkOptions}
            value={swapNetworkItem.to}
          />
        </Box>
      </Box>

      <Box className={classes.anotherCheckbox}>
        <Checkbox
          checked={isSendAnother}
          label="Send to another address"
          onChange={() => setIsSendAnother(!isSendAnother)}
        />

        {isSendAnother ? (
          <TextField className={classes.anotherAddress} />
        ) : null}
      </Box>

      <Button
        className={classes.submitBtn}
        color="primary"
        size="large"
        type="submit"
      >
        {t('bridge.main.connectBtn')}
      </Button>
    </div>
  );
};
