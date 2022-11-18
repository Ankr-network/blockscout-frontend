import { t } from '@ankr.com/common';
import { Box } from '@material-ui/core';
import classNames from 'classnames';
import { useCallback } from 'react';
import { uid } from 'react-uid';

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
      onChangeNetwork(value as string[]);
    },
    [onChangeNetwork],
  );

  const handleChangeAsset = useCallback(
    (value: string[]) => {
      onChangeAsset(value as string[]);
    },
    [onChangeAsset],
  );

  const handleChangeTab = useCallback(
    (type: string) => {
      let nextOptions = types.includes(type)
        ? types.filter(item => item !== type)
        : [...types, type];
      const separate = stakingTypes.find(item => item.separate);

      if (separate) {
        if (type === separate?.value || nextOptions.length === 0) {
          nextOptions = [separate.value];
        } else if (
          nextOptions.length > 1 &&
          nextOptions.includes(separate.value)
        ) {
          nextOptions = nextOptions.filter(option => option !== separate.value);
        }
      }

      onChangeType(nextOptions);
    },
    [onChangeType, stakingTypes, types],
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
        </Box>

        <div className={styles.tabs}>
          {stakingTypes.map(type => (
            <Box
              key={uid(type)}
              className={classNames(styles.tab, {
                [styles.tabActive]: types.some(value => value === type.value),
              })}
              onClick={() => handleChangeTab(type.value)}
            >
              {type.label}
            </Box>
          ))}
        </div>
      </Box>
    </>
  );
};
