import { useQuery } from '@redux-requests/react';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useRouteMatch } from 'react-router-dom';

import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { TRouteConfig } from 'modules/router/utils/createRouteConfig';

import { getDeFiData, IDeFiItem } from '../actions/getDeFiData';

import { StakingType } from './useStakingTypes';
import { TokenAsset } from './useTokenAssets';
import { TokenNetwork } from './useTokenNetworks';

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
  const dispatch = useDispatch();
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
  const [types, setTypes] = useState<string[]>([StakingType.All]);
  const { data, loading: isLoading, error } = useQuery({ type: getDeFiData });

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

  const handleChangeNetworks = (value: string[]) => {
    setNetwork(value);
    query.delete('networks');

    value.forEach(v => {
      if (v !== TokenNetwork.All) {
        query.append('networks', v);
      }
    });

    replace(`${path}?${query.toString()}`);
  };

  const handleChangeAssets = (value: string[]) => {
    setAssets(value);
    query.delete('assets');

    value.forEach(v => {
      if (v !== TokenAsset.All) {
        query.append('assets', v);
      }
    });

    replace(`${path}?${query.toString()}`);
  };

  useInitEffect(() => {
    dispatch(getDeFiData());
  });

  return {
    data: filteredData,
    assets,
    error,
    isLoading,
    networks,
    types,
    onChangeAssets: handleChangeAssets,
    onChangeNetworks: handleChangeNetworks,
    onChangeTypes: setTypes,
  };
};
