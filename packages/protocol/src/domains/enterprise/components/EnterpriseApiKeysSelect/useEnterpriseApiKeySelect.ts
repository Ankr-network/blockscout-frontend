import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import {
  setSelectedProjectEndpointToken,
  setSelectedTokenIndex,
} from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useResetIfSelectedProjectWasDeleted } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';
import { EnterpriseClientJwtManagerItem } from 'domains/enterprise/store/selectors';

import { useEnterpriseSelectedToken } from '../../hooks/useEnterpriseSelectedToken';

export const useEnterpriseApiKeySelect = (
  apiKeys: EnterpriseClientJwtManagerItem[],
) => {
  const { selectedGroupAddress } = useSelectedUserGroup();
  const { address: currentUserAddress } = useAuth();
  const address = selectedGroupAddress || currentUserAddress;
  const dispatch = useDispatch();

  const apiKeyOptions = apiKeys.map(item => ({
    value: item.userEndpointToken,
    index: item.index,
    title: item.name || item.userEndpointToken,
  }));

  const options = apiKeyOptions;

  const { userEndpointToken: selectedProjectEndpointToken } =
    useEnterpriseSelectedToken();

  useResetIfSelectedProjectWasDeleted(
    options,
    address,
    selectedProjectEndpointToken,
  );

  const handleSetOption = useCallback(
    (value: string) => {
      const tokenIndex =
        apiKeyOptions.find(option => option.value === value)?.index || -1;

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
    [dispatch, address, apiKeyOptions],
  );

  const selectedOption = selectedProjectEndpointToken || options[0].value;

  const hasSelectedProject = Boolean(selectedOption);

  return {
    options,
    handleSetOption,
    selectedOption,
    hasSelectedProject,
  };
};
