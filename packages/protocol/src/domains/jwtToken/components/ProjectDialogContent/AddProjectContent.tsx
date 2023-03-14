import { t } from '@ankr.com/common';
import { Form, FormRenderProps } from 'react-final-form';
import { NameField } from '../AddProjectDialog/NameField';
import { jwtTokenIntlRoot } from 'domains/jwtToken/utils/utils';
import { useProjectDialogContentStyles } from './useProjectDialogContentStyles';
import { LoadingButton } from '@ankr.com/ui';

interface IAddProjectContentProps {
  isLoading: boolean;
  projectName: string;
  handleCreate: () => void;
}

export const AddProjectContent = ({
  isLoading,
  projectName,
  handleCreate,
}: IAddProjectContentProps) => {
  const { classes } = useProjectDialogContentStyles();

  const renderForm = ({ handleSubmit }: FormRenderProps) => {
    return (
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={classes.content}
      >
        <NameField projectName={projectName} />
        <LoadingButton size="large" loading={isLoading} fullWidth type="submit">
          {t(`${jwtTokenIntlRoot}.create`)}
        </LoadingButton>
      </form>
    );
  };

  return <Form onSubmit={handleCreate} render={renderForm} />;
};
