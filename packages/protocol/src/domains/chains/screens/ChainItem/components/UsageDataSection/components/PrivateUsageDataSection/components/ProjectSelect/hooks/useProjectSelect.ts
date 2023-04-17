import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { setSelectedProject } from 'domains/jwtToken/store/jwtTokenManagerSlice';
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
          setSelectedProject({
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
  const { selectedProject: selectedOption } = useTokenManagerConfigSelector();

  useResetIfSelectedProjectWasDeleted(options, address, selectedOption);

  const handleSetOption = useCallback(
    (value: string) => {
      dispatch(
        setSelectedProject({
          address,
          selectedProject: value === ALL_PROJECTS_VALUE ? undefined : value,
        }),
      );
    },
    [dispatch, address],
  );

  return {
    options,
    handleSetOption,
    selectedOption: selectedOption || options[0].value,
  };
};
