import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { t } from '@ankr.com/common';

import { ChainType } from 'domains/chains/types';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';

import IndeterminateCheckbox from './IndeterminateCheckbox';
import { useTypeSelectorStyles } from './useTypeSelectorStyles';
import {
  ITypeSelectorProps,
  useAllChainsSelection,
} from './hooks/useAllChainsSelection';

const mapEndpoints = (endpoints: EndpointGroup[]) => {
  // JSON-RPC and REST Tendermint subchains have the same path,
  // so should we ignore JSON-RPC endpoints and show REST
  const filteredEndpoints = endpoints.filter(
    endpoint => endpoint.id !== ChainGroupID.SECRET_RPC,
  );

  return filteredEndpoints.map(endpoint => ({
    ...endpoint,
    label: endpoint.name,
    chainId: endpoint.chains[0].id,
  }));
};

export const TypeSelector = ({ chainTypes, endpoints }: ITypeSelectorProps) => {
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
          <Typography
            fontWeight={800}
            variant="body2"
            className={classes.label}
          >
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
            chainType={value as ChainType}
            key={value}
            parentLabel={label}
            nestedItems={nestedItems}
          />
        );
      })}
    </FormControl>
  );
};
