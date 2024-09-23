import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { t } from '@ankr.com/common';
import { Chain, ChainID, ChainType } from '@ankr.com/chains-list';

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

const mapEndpoints = (
  endpoints: EndpointGroup[],
  chainId: ChainID,
  chainType: ChainType,
) => {
  // JSON-RPC and REST Tendermint subchains have the same path,
  // so should we ignore JSON-RPC endpoints and show REST
  const filteredEndpoints = endpoints.filter(
    endpoint =>
      endpoint.id !== ChainGroupID.TENDERMINT_RPC &&
      endpoint.id !== ChainGroupID.KAVA_TENDERMINT_RPC,
  );

  const isFlareTestnet =
    chainId === ChainID.FLARE && chainType === ChainType.Testnet;

  return filteredEndpoints.map(endpoint => ({
    ...endpoint,
    label: isFlareTestnet ? endpoint.chainName : endpoint.name,
    chainId: endpoint.chains[0].id,
  }));
};

const mapChainToNestedItem = ({ id, name }: Chain) => ({
  chainId: id,
  label: name,
});

export const TypeSelector = ({
  beaconsMainnet,
  beaconsTestnet,
  chainId,
  chainTypes,
  endpoints,
  opnodesMainnet,
  opnodesTestnet,
}: ITypeSelectorProps) => {
  const { classes } = useTypeSelectorStyles();

  const { isChecked, isIndeterminate, onChange } = useAllChainsSelection({
    chainId,
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

      {chainTypes.map(({ label, value }) => {
        const chainType = value as ChainType;
        const currentTypeEndpoints = endpoints[chainType];

        const nestedItems = mapEndpoints(
          currentTypeEndpoints,
          chainId,
          chainType,
        );

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
