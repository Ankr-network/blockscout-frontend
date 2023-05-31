import { ProjectSelect, SelectMenuProps } from './ProjectSelect';
import { useProjectSelect } from './hooks/useProjectSelect';

export const ProjectSelectContainer = (props: SelectMenuProps) => {
  const { options, handleSetOption, selectedOption } = useProjectSelect();

  return (
    <ProjectSelect
      {...props}
      options={options}
      handleSetOption={handleSetOption}
      selectedOption={selectedOption}
    />
  );
};
