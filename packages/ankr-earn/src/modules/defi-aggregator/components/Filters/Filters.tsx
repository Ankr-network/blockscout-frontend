import { t } from '@ankr.com/common';
import { Box } from '@material-ui/core';
import { useCallback } from 'react';

import { MultiSelect } from 'modules/common/components/MultiSelect';

import { useStakingTypes, useTokenAssets, useTokenNetworks } from '../../hooks';

import { useFiltersStyles } from './useFiltersStyles';

interface IFiltersProps {
  networks: string[];
  assets: string[];
  types: string[];
  onChangeAsset: (assets: string[]) => void;
  onChangeNetwork: (networks: string[]) => void;
  onChangeType: (types: string[]) => void;
}

export const Filters = ({
  networks,
  assets,
  types,
  onChangeAsset,
  onChangeType,
  onChangeNetwork,
}: IFiltersProps): JSX.Element => {
  const tokenNetworks = useTokenNetworks();
  const tokenAssets = useTokenAssets();
  const stakingTypes = useStakingTypes();
  const styles = useFiltersStyles();

  const handleChangeNetwork = useCallback(
    (value: string[]) => {
      onChangeNetwork(value);
    },
    [onChangeNetwork],
  );

  const handleChangeAsset = useCallback(
    (value: string[]) => {
      onChangeAsset(value);
    },
    [onChangeAsset],
  );

  const handleChangeType = useCallback(
    (value: string[]) => {
      onChangeType(value);
    },
    [onChangeType],
  );

  return (
    <>
      <Box className={styles.root}>
        <Box className={styles.selectsWrapper}>
          <Box className={styles.selectWrapper}>
            <MultiSelect
              innerLabel={t('defi.networks')}
              name="networks"
              options={tokenNetworks}
              value={networks}
              onChange={handleChangeNetwork}
            />
          </Box>

          <Box className={styles.selectWrapper}>
            <MultiSelect
              innerLabel={t('defi.assets')}
              name="assets"
              options={tokenAssets}
              value={assets}
              onChange={handleChangeAsset}
            />
          </Box>

          <Box className={styles.selectWrapper}>
            <MultiSelect
              innerLabel={t('defi.types')}
              name="types"
              options={stakingTypes}
              value={types}
              onChange={handleChangeType}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
