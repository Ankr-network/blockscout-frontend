import { useCallback, useEffect, useState } from 'react';
import { Web3Address } from 'multirpc-sdk';

import { useModal } from 'modules/common/hooks/useModal';
import { useDeleteUserProjectMutation } from 'modules/projects/actions/deleteUserProject';
import { useSetAllowedUserProjectsCountMutation } from 'modules/projects/actions/setAllowedUserProjectsCount';

export const useProjectsView = (address: Web3Address) => {
  const [deleteUserProject, { isLoading: isLoadingDeleteUser }] =
    useDeleteUserProjectMutation();

  const { open, handleOpen, handleClose } = useModal();

  const [setAllowedProjectsCount, { isLoading: isLoadingJwtLimit, isSuccess }] =
    useSetAllowedUserProjectsCountMutation();

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

  const [jwtLimit, setJwtLimit] = useState('');

  const onInputJwtLimitChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setJwtLimit(event.target.value);
    },
    [],
  );

  const handleSetJwtLimit = useCallback(() => {
    if (!jwtLimit) {
      return;
    }

    setAllowedProjectsCount({ address, jwtLimit: Number(jwtLimit) });
  }, [address, jwtLimit, setAllowedProjectsCount]);

  const handleDeleteUserProject = useCallback(
    (index: number) => {
      deleteUserProject({ index, address });
    },
    [address, deleteUserProject],
  );

  return {
    onDeleteUserProject: handleDeleteUserProject,
    isLoadingDeleteUser,
    handleOpen,
    open,
    handleClose,
    onInputJwtLimitChange,
    jwtLimit,
    isLoadingJwtLimit,
    handleSetJwtLimit,
  };
};
