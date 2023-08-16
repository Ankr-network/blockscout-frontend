import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { IApiChain } from 'modules/clients/utils/queryChains';

interface ChainSelectProps {
  selectedChainId: string;
  handleSelectChain: (event: SelectChangeEvent<string>) => void;
  isLoadingBlockchains: boolean;
  blockchainsData?: IApiChain[];
}

export const ChainSelect = ({
  selectedChainId,
  handleSelectChain,
  isLoadingBlockchains,
  blockchainsData,
}: ChainSelectProps) => {
  return (
    <FormControl fullWidth>
      <Select
        sx={theme => ({
          mb: 2,
          backgroundColor: theme.palette.background.default,
        })}
        id="chain-select"
        value={selectedChainId}
        label="Chain"
        onChange={handleSelectChain}
        disabled={isLoadingBlockchains}
      >
        {blockchainsData?.map(chain => {
          return (
            <MenuItem key={chain.id} value={chain.id}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  style={{ marginRight: 5 }}
                  width={20}
                  height={20}
                  src={chain.icon}
                  alt={chain.id}
                />
                {chain.id}
              </Box>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
