import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { t } from '@ankr.com/common';

import { Chain, ChainType } from 'domains/chains/types';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import {
  ProjectChainType,
  ProjectChainTypeExtenders,
} from 'domains/projects/types';

import IndeterminateCheckbox from './IndeterminateCheckbox';
import {
  ITypeSelectorProps,
  useAllChainsSelection,
} from './hooks/useAllChainsSelection';
import { useTypeSelectorStyles } from './useTypeSelectorStyles';

const mapEndpoints = (endpoints: EndpointGroup[]) => {
  // JSON-RPC and REST Tendermint subchains have the same path,
  // so should we ignore JSON-RPC endpoints and show REST
  const filteredEndpoints = endpoints.filter(
    endpoint => endpoint.id !== ChainGroupID.TENDERMINT_RPC,
  );

  return filteredEndpoints.map(endpoint => ({
    ...endpoint,
    label: endpoint.name,
    chainId: endpoint.chains[0].id,
  }));
};

const mapChainToNestedItem = ({ id, name }: Chain) => ({
  chainId: id,
  label: name,
});

export const TypeSelector = ({
  chainTypes,
  endpoints,
  beaconsMainnet,
  beaconsTestnet,
  opnodesMainnet,
  opnodesTestnet,
}: ITypeSelectorProps) => {
  const { classes } = useTypeSelectorStyles();

  const { onChange, isChecked, isIndeterminate } = useAllChainsSelection({
    endpoints,
  });

  return (
    <FormControl className={classes.form}>
      <FormControlLabel
        className={classes.checkboxGroupRoot}
        classes={{
          root: classes.formControlLabel,
        }}
        label={
          <Typography variant="body2" className={classes.label}>
            {t('projects.new-project.chain-modal.select-all-label')}
          </Typography>
        }
        control={
          <Checkbox
            checked={isChecked}
            indeterminate={isIndeterminate}
            onChange={onChange}
          />
        }
      />

      {chainTypes.map(({ value, label }) => {
        const currentTypeEndpoints = endpoints[value as ChainType];

        const nestedItems = mapEndpoints(currentTypeEndpoints);

        return (
          <IndeterminateCheckbox
            chainType={value as ProjectChainType}
            key={value}
            parentLabel={label}
            nestedItems={nestedItems}
          />
        );
      })}

      {beaconsMainnet && (
        <IndeterminateCheckbox
          chainType={ProjectChainTypeExtenders.BeaconMainnet}
          parentLabel="Beacon mainnet"
          nestedItems={beaconsMainnet.map(mapChainToNestedItem)}
        />
      )}

      {beaconsTestnet && (
        <IndeterminateCheckbox
          chainType={ProjectChainTypeExtenders.BeaconTestnet}
          parentLabel="Beacon testnet"
          nestedItems={beaconsTestnet.map(mapChainToNestedItem)}
        />
      )}

      {opnodesMainnet && (
        <IndeterminateCheckbox
          chainType={ProjectChainTypeExtenders.OpnodeMainnet}
          parentLabel="Opnode mainnet"
          nestedItems={opnodesMainnet.map(mapChainToNestedItem)}
        />
      )}

      {opnodesTestnet && (
        <IndeterminateCheckbox
          chainType={ProjectChainTypeExtenders.OpnodeTestnet}
          parentLabel="Opnode testnet"
          nestedItems={opnodesTestnet.map(mapChainToNestedItem)}
        />
      )}
    </FormControl>
  );
};
