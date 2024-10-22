import { useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';

import { EnterpriseClientJWT } from 'domains/enterprise/store/selectors';
import { getAllProjectsItem } from 'modules/common/components/ProjectSelect/hooks/useProjectSelectOptions';
import {
  setSelectedProjectEndpointToken,
  setSelectedTokenIndex,
} from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useResetIfSelectedProjectWasDeleted } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { useEnterpriseSelectedToken } from '../../hooks/useEnterpriseSelectedToken';

export interface ProjectOption {
  id: string;
  value: string;
  index: number;
  title: string;
}

const apiKeyAllOption: ProjectOption = {
  id: '',
  index: -1,
  ...getAllProjectsItem(),
};

export const useEnterpriseApiKeySelect = (apiKeys: EnterpriseClientJWT[]) => {
  const { selectedGroupAddress } = useSelectedUserGroup();
  const { address: currentUserAddress } = useAuth();
  const address = selectedGroupAddress || currentUserAddress;
  const dispatch = useDispatch();

  const options = useMemo(() => {
    const apiKeyOptions: ProjectOption[] = apiKeys.map(item => ({
      id: item.id,
      value: item.userEndpointToken,
      index: item.index,
      title: item.name || item.userEndpointToken,
    }));

    return [apiKeyAllOption, ...apiKeyOptions];
  }, [apiKeys]);

  const { userEndpointToken: selectedProjectEndpointToken } =
    useEnterpriseSelectedToken();

  useResetIfSelectedProjectWasDeleted(
    options,
    address,
    selectedProjectEndpointToken,
  );

  const handleSetOption = useCallback(
    (value: string) => {
      const currentTokenData = options.find(option => option.value === value);

      const tokenIndex = currentTokenData
        ? currentTokenData.index
        : apiKeyAllOption.index;

      const selectedProject = value;

      dispatch(
        setSelectedProjectEndpointToken({
          address,
          selectedProject,
        }),
      );

      dispatch(
        setSelectedTokenIndex({
          address,
          tokenIndex,
        }),
      );
    },
    [options, dispatch, address],
  );

  const selectedOption = selectedProjectEndpointToken || options[0]?.value;

  const hasSelectedProject = Boolean(selectedOption);

  const selectedProjectId = apiKeys.find(
    item => item.userEndpointToken === selectedOption,
  )?.id;

  return {
    options,
    handleSetOption,
    selectedOption,
    hasSelectedProject,
    selectedProjectId,
  };
};
