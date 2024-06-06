import { ProjectSelect, SelectMenuProps } from './ProjectSelect';
import { useProjectSelect } from './hooks/useProjectSelect';

export const ProjectSelectContainer = (props: SelectMenuProps) => {
  const { handleSetOption, options, selectedOption } = useProjectSelect();

  return (
    <ProjectSelect
      {...props}
      options={options}
      handleSetOption={handleSetOption}
      selectedOption={selectedOption}
    />
  );
};
