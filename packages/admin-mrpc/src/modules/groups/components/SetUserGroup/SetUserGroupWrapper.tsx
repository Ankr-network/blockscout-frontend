import { useSetUserGroup } from './useSetUserGroup';
import { SetUserGroupContent } from './SetUserGroupContent';

export const SetUserGroupWrapper = () => {
  const { handleSubmit, role, handleSelectRole, isLoading } = useSetUserGroup();

  return (
    <SetUserGroupContent
      handleSubmit={handleSubmit}
      role={role}
      handleSelectRole={handleSelectRole}
      isLoading={isLoading}
    />
  );
};
