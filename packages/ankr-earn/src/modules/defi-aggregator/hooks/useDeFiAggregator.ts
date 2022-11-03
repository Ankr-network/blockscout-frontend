import { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { useRouteMatch } from 'react-router-dom';

import { Seconds } from 'modules/common/types';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { TRouteConfig } from 'modules/router/utils/createRouteConfig';

import { IDeFiItem, useGetDeFiDataQuery } from '../actions/getDeFiData';

import { StakingType } from './useStakingTypes';
import { TokenAsset } from './useTokenAssets';
import { TokenNetwork } from './useTokenNetworks';

const CACHE_TIME: Seconds = 60;

interface UseDeFiAggregatorResult {
  data: IDeFiItem[];
  types: string[];
  assets: string[];
  error: unknown;
  isLoading: boolean;
  networks: string[];
  onChangeAssets: (assets: string[]) => void;
  onChangeNetworks: (networks: string[]) => void;
  onChangeTypes: (types: string[]) => void;
}

type RouteConfig = TRouteConfig<{
  defi: {
    useParams: () => Record<string, string[]>;
  };
}>;

export const useDeFiAggregator = (
  routesConfig: RouteConfig,
): UseDeFiAggregatorResult => {
  const { path } = useRouteMatch();
  const { replace } = useHistory();
  const query = useQueryParams();
  const params = routesConfig.defi.useParams();

  const [networks, setNetwork] = useState<string[]>(
    params?.networks?.length ? params.networks : [TokenNetwork.All],
  );
  const [assets, setAssets] = useState<string[]>(
    params?.assets?.length ? params.assets : [TokenAsset.All],
  );
  const [types, setTypes] = useState<string[]>(
    params?.types?.length ? params.types : [StakingType.All],
  );

  const {
    data,
    isFetching: isLoading,
    error,
  } = useGetDeFiDataQuery(undefined, {
    refetchOnMountOrArgChange: CACHE_TIME,
  });

  const filteredData = useMemo<IDeFiItem[]>(() => {
    let result = data ?? [];

    if (!types.includes(TokenAsset.All)) {
      result = types.reduce((acc: IDeFiItem[], type) => {
        acc.push(
          ...result.filter(item => {
            return item.type.toUpperCase().includes(type.toUpperCase());
          }),
        );
        return acc;
      }, []);
    }

    if (!assets.includes(TokenAsset.All)) {
      result = assets.reduce((acc: IDeFiItem[], asset) => {
        acc.push(
          ...result.filter(item => {
            return item.assets.toUpperCase().includes(asset.toUpperCase());
          }),
        );
        return acc;
      }, []);
    }

    if (!networks.includes(TokenNetwork.All)) {
      result = networks.reduce((acc: IDeFiItem[], network) => {
        acc.push(
          ...result.filter(
            item => item.network.toUpperCase() === network.toUpperCase(),
          ),
        );
        return acc;
      }, []);
    }

    return result;
  }, [assets, data, networks, types]);

  const handleChangeNetworks = useCallback(
    (value: string[]) => {
      setNetwork(value);
      query.delete('networks');

      value.forEach(v => {
        if (v !== TokenNetwork.All) {
          query.append('networks', v);
        }
      });

      replace(`${path}?${query.toString()}`);
    },
    [query, replace, path],
  );

  const handleChangeTypes = useCallback(
    (value: string[]) => {
      setTypes(value);
      query.delete('types');

      value.forEach(v => {
        if (v !== TokenNetwork.All) {
          query.append('types', v);
        }
      });
      replace(`${path}?${query.toString()}`);
    },
    [query, replace, path],
  );

  const handleChangeAssets = useCallback(
    (value: string[]) => {
      setAssets(value);
      query.delete('assets');

      value.forEach(v => {
        if (v !== TokenAsset.All) {
          query.append('assets', v);
        }
      });

      replace(`${path}?${query.toString()}`);
    },
    [query, replace, path],
  );

  return {
    data: filteredData,
    assets,
    error,
    isLoading,
    networks,
    types,
    onChangeAssets: handleChangeAssets,
    onChangeNetworks: handleChangeNetworks,
    onChangeTypes: handleChangeTypes,
  };
};
