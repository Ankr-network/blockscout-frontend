import { t } from '@ankr.com/common';
import { Form, FormRenderProps } from 'react-final-form';
import { LoadingButton } from '@ankr.com/ui';

import { jwtTokenIntlRoot } from 'domains/jwtToken/utils/utils';

import { NameField } from '../AddProjectDialog/NameField';
import { useProjectDialogContentStyles } from './useProjectDialogContentStyles';

interface IAddProjectContentProps {
  isLoading: boolean;
  projectName: string;
  handleCreate: () => void;
}

export const AddProjectContent = ({
  handleCreate,
  isLoading,
  projectName,
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
