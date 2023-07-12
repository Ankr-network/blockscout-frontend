import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { setSelectedProjectEndpointToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import {
  ALL_PROJECTS_VALUE,
  useProjectSelectOptions,
} from './useProjectSelectOptions';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { SelectOption } from '../ProjectSelect';

const useResetIfSelectedProjectWasDeleted = (
  options: SelectOption[],
  address: string,
  selectedOption?: string,
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedOption !== undefined) {
      const hasOption = options.find(item => item.value === selectedOption);

      if (!hasOption) {
        dispatch(
          setSelectedProjectEndpointToken({
            address,
            selectedProject: undefined,
          }),
        );
      }
    }
  }, [dispatch, options, selectedOption, address]);
};

export const useProjectSelect = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();
  const { address: currentUserAddress, hasConnectWalletMessage } = useAuth();
  const address = selectedGroupAddress || currentUserAddress;
  const dispatch = useDispatch();

  const options = useProjectSelectOptions(hasConnectWalletMessage);
  const { selectedProjectEndpointToken } = useTokenManagerConfigSelector();

  useResetIfSelectedProjectWasDeleted(
    options,
    address,
    selectedProjectEndpointToken,
  );

  const handleSetOption = useCallback(
    (value: string) => {
      dispatch(
        setSelectedProjectEndpointToken({
          address,
          selectedProject: value === ALL_PROJECTS_VALUE ? undefined : value,
        }),
      );
    },
    [dispatch, address],
  );

  const selectedOption = selectedProjectEndpointToken || options[0].value;

  const hasSelectedProject = selectedOption !== ALL_PROJECTS_VALUE;

  return {
    options,
    handleSetOption,
    selectedOption,
    hasSelectedProject,
  };
};
