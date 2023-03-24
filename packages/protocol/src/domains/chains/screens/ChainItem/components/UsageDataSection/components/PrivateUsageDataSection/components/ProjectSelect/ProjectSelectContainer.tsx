import { ProjectSelect } from './ProjectSelect';
import { useProjectSelect } from './hooks/useProjectSelect';

export const ProjectSelectContainer = () => {
  const { options, handleSetOption, selectedOption } = useProjectSelect();

  return (
    <ProjectSelect
      options={options}
      handleSetOption={handleSetOption}
      selectedOption={selectedOption}
    />
  );
};
