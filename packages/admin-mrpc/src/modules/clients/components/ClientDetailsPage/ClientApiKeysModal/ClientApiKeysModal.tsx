import { Box, Button, Modal, Typography } from '@mui/material';

import { ReactComponent as IconCopy } from 'assets/img/copy.svg';
import { IApiChain, IApiChainURL } from 'modules/clients/utils/queryChains';
import { ChainSelect } from 'modules/common/components/ChainSelect/ChainSelect';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';
import { useClientApiKeys } from './useClientApiKeys';

export const ClientApiKeysModal = ({ token }: { token: string }) => {
  const { classes, cx } = useStyles();
  const {
    open,
    handleOpen,
    handleClose,
    blockchainsData,
    selectedChainId,
    handleSelectChain,
    selectedChain,
    isLoadingBlockchains,
  } = useClientApiKeys({ token });

  const mapUrls = (url: IApiChainURL) => {
    return (
      <Box key={url.rpc}>
        <CopyToClipIcon
          copyText="endpoint"
          text={url.rpc}
          message="copied successfully"
          key={url.rpc}
        />

        {url.ws && (
          <CopyToClipIcon
            copyText="websocket"
            text={url.ws}
            message="copied successfully"
            key={url.ws}
          />
        )}
      </Box>
    );
  };

  const mapChain = (chain?: IApiChain) => {
    if (!chain) {
      return null;
    }
    const hasChainUrls = chain.urls.length > 0;
    return (
      <Box sx={{ mt: 4 }} key={chain.id + chain.type}>
        {hasChainUrls && (
          <>
            <b>{chain.name}</b> <br />
            {chain.urls.map(mapUrls)}
          </>
        )}
        {chain.extenders?.map(mapChain)}
        {chain.extensions?.map(mapChain)}
        {chain.testnets?.map(mapChain)}
        {chain.devnets?.map(mapChain)}
      </Box>
    );
  };

  const body = (
    <Box
      sx={{ minWidth: 800 }}
      className={cx(classes.paper, classes.whiteBackground)}
    >
      <Typography variant="h5">API Keys</Typography>
      <br />
      <Box>
        <ChainSelect
          selectedChainId={selectedChainId}
          handleSelectChain={handleSelectChain}
          isLoadingBlockchains={isLoadingBlockchains}
          blockchainsData={blockchainsData}
        />
      </Box>

      {mapChain(selectedChain)}
    </Box>
  );

  return (
    <>
      <Button onClick={handleOpen} color="secondary" startIcon={<IconCopy />}>
        Copy API Keys
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="manage-client-balance-modal"
      >
        {body}
      </Modal>
    </>
  );
};